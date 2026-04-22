import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import paymentRoutes from './routes/payment.js';

// ─── Startup env checks ───────────────────────────────────────────────────────
const REQUIRED_ENV = ['MONGODB_URI', 'JWT_SECRET', 'RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET'];
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(`FATAL: Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

const app = express();
const PORT = process.env.PORT || 5000;

// ─── CORS ─────────────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://thepridetime.com,https://www.thepridetime.com,http://localhost:5173')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error(`Origin ${origin} not allowed by CORS policy`));
    }
  },
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// ─── MongoDB ──────────────────────────────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI;

// ─── User Schema ──────────────────────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  name:     { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  subscription: {
    plan:        { type: String, default: null },
    status:      { type: String, default: null },
    startDate:   { type: Date,   default: null },
    trialEndsAt: { type: Date,   default: null }
  },
  paymentMethod: {
    cardLast4:         { type: String, default: null },
    cardBrand:         { type: String, default: null },
    razorpayPaymentId: { type: String, default: null }
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// ─── Auth middleware ──────────────────────────────────────────────────────────
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// ─── Input validation helpers ─────────────────────────────────────────────────
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email?.trim());
const isValidName  = (name)  => /^[A-Za-z\s'\-]{2,}$/.test(name?.trim());

// ─── Payment routes ───────────────────────────────────────────────────────────
app.use('/api/payment', paymentRoutes);

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/test', (req, res) => {
  res.json({ message: 'Pride Times API is running!' });
});

// ─── Register ─────────────────────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Enter a valid email address.' });
    }
    if (!isValidName(name)) {
      return res.status(400).json({ error: 'Name must contain only letters, spaces, hyphens, or apostrophes.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Service temporarily unavailable. Please try again.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // ── Auto-start 7-day trial on registration ────────────────────────────────
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 7);

    const user = new User({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      name: name.trim(),
      subscription: {
        plan: 'trial',
        status: 'trial',
        startDate: new Date(),
        trialEndsAt
      }
    });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        subscription: user.subscription
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// ─── Login ────────────────────────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Enter a valid email address.' });
    }
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Service temporarily unavailable. Please try again.' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // ── Auto-start trial if user has no subscription yet ──────────────────────
    if (!user.subscription?.status) {
      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 7);
      user.subscription = {
        plan: 'trial',
        status: 'trial',
        startDate: new Date(),
        trialEndsAt
      };
      await user.save();
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        subscription: user.subscription  // includes trialEndsAt for frontend
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// ─── Check status ─────────────────────────────────────────────────────────────
app.get('/api/auth/check-status/:email', async (req, res) => {
  try {
    const { email } = req.params;
    if (!isValidEmail(email)) {
      return res.json({ canLogin: false });
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    res.json({ canLogin: !!user });
  } catch (error) {
    console.error('Check-status error:', error);
    res.json({ canLogin: false });
  }
});

// ─── Subscription create ──────────────────────────────────────────────────────
app.post('/api/subscriptions/create', authMiddleware, async (req, res) => {
  try {
    const { plan } = req.body;
    const userId = req.user.userId;

    const validPlans = ['digital', 'premium', 'enterprise'];
    if (!plan || !validPlans.includes(plan.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid plan. Choose digital, premium, or enterprise.' });
    }
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Service temporarily unavailable.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const trialDays = plan.toLowerCase() === 'enterprise' ? 14 : 7;
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + trialDays);

    user.subscription = {
      plan: plan.toLowerCase(),
      status: 'trial',
      startDate: new Date(),
      trialEndsAt
    };
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        subscription: user.subscription
      },
      token
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Subscription creation failed. Please try again.' });
  }
});

// ─── Market data ──────────────────────────────────────────────────────────────
app.get('/api/market/live', async (req, res) => {
  const KEY = process.env.FINNHUB_API_KEY;
  if (!KEY) {
    return res.status(503).json({ error: 'Market data service not configured.' });
  }

  const symbols = {
    indices: [
      { symbol: 'BINANCE:BTCUSDT', name: 'Bitcoin' },
      { symbol: 'BINANCE:ETHUSDT', name: 'Ethereum' },
      { symbol: 'BINANCE:BNBUSDT', name: 'BNB' },
      { symbol: 'BINANCE:SOLUSDT', name: 'Solana' },
      { symbol: 'BINANCE:XRPUSDT', name: 'XRP' },
      { symbol: 'BINANCE:ADAUSDT', name: 'Cardano' },
    ],
    commodities: [
      { symbol: 'BINANCE:BTCUSDT', name: 'Bitcoin' },
      { symbol: 'BINANCE:ETHUSDT', name: 'Ethereum' },
    ],
    forex: [
      { symbol: 'BINANCE:BTCUSDT', name: 'BTC/USDT' },
      { symbol: 'BINANCE:ETHUSDT', name: 'ETH/USDT' },
      { symbol: 'BINANCE:BNBUSDT', name: 'BNB/USDT' },
      { symbol: 'BINANCE:SOLUSDT', name: 'SOL/USDT' },
    ],
    crypto: [
      { symbol: 'BINANCE:BTCUSDT', name: 'Bitcoin' },
      { symbol: 'BINANCE:ETHUSDT', name: 'Ethereum' },
      { symbol: 'BINANCE:BNBUSDT', name: 'BNB' },
      { symbol: 'BINANCE:SOLUSDT', name: 'Solana' },
      { symbol: 'BINANCE:XRPUSDT', name: 'XRP' },
      { symbol: 'BINANCE:ADAUSDT', name: 'Cardano' },
    ],
  };

  const fetchQuote = async ({ symbol, name }) => {
    try {
      const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (!data.c || data.c === 0) return null;
      const change = (data.c - data.pc).toFixed(2);
      const changePercent = data.pc
        ? (((data.c - data.pc) / data.pc) * 100).toFixed(2)
        : '0.00';
      return { symbol, name, value: data.c, change, changePercent, volume: '—' };
    } catch {
      return null;
    }
  };

  try {
    const [indices, commodities, forex, crypto] = await Promise.all([
      Promise.all(symbols.indices.map(fetchQuote)),
      Promise.all(symbols.commodities.map(fetchQuote)),
      Promise.all(symbols.forex.map(fetchQuote)),
      Promise.all(symbols.crypto.map(fetchQuote)),
    ]);

    const clean = (arr) => arr.filter(Boolean);
    const all = [...clean(crypto)];

    const gainers = [...all]
      .sort((a, b) => parseFloat(b.changePercent) - parseFloat(a.changePercent))
      .slice(0, 5);
    const losers = [...all]
      .sort((a, b) => parseFloat(a.changePercent) - parseFloat(b.changePercent))
      .slice(0, 5);

    res.json({
      indices:     clean(indices),
      commodities: clean(commodities),
      forex:       clean(forex),
      crypto:      clean(crypto),
      topGainers:  gainers,
      topLosers:   losers,
    });
  } catch (error) {
    console.error('Market data error:', error);
    res.status(500).json({ error: 'Failed to fetch market data.' });
  }
});

// ─── Start server ─────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});