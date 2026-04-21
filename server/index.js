import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import paymentRoutes from './routes/payment.js';

// ─── Startup env checks ───────────────────────────────────────────────────────
// FIX: fail fast if critical env vars are missing instead of using hardcoded fallbacks
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
// FIX: was app.use(cors()) — accepted requests from ANY origin
// Allowed origins — covers both www and non-www, plus local dev
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://thepridetime.com,https://www.thepridetime.com')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server requests (no origin) and listed origins
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
app.use('/api/payment', paymentRoutes);

// ─── MongoDB ──────────────────────────────────────────────────────────────────
// FIX: URI was hardcoded with plain-text credentials in source
// Now reads from MONGODB_URI env var — rotate your Atlas password immediately
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
    // FIX: only store what Razorpay gives back post-verification
    // (last4, brand) — never store raw card numbers, expiry, or CVV
    cardLast4:  { type: String, default: null },
    cardBrand:  { type: String, default: null },
    razorpayPaymentId: { type: String, default: null }
  }
});

const User = mongoose.model('User', userSchema);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas — database: pridetimes');
  })
  .catch(err => {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1); // FIX: don't silently continue without a DB connection
  });

// ─── Auth middleware ──────────────────────────────────────────────────────────
// FIX: was entirely missing — subscription endpoint had no authentication at all
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    // FIX: JWT_SECRET now comes from env, not hardcoded string
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// ─── Input validation helpers ─────────────────────────────────────────────────
// FIX: no server-side validation existed on any endpoint before
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email?.trim());
const isValidName  = (name)  => /^[A-Za-z\s'\-]{2,}$/.test(name?.trim());

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/test', (req, res) => {
  res.json({ message: 'Pride Times API is running!' });
});

// ─── Register ─────────────────────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // FIX: validate all fields before hitting the database
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

    const hashedPassword = await bcrypt.hash(password, 12); // FIX: 10 → 12 rounds

    const user = new User({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      name: name.trim()
    });
    await user.save();

    // FIX: JWT secret from env, not hardcoded string
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (error) {
    // FIX: don't leak error.message (stack traces, DB errors) to the client
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// ─── Login ────────────────────────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // FIX: validate inputs before DB query
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
      // FIX: don't reveal whether email exists — use same message for both cases
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // FIX: JWT secret from env
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: { id: user._id, email: user.email, name: user.name }
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
// FIX: was completely unauthenticated — anyone could POST any userId to grant themselves a subscription
// FIX: was accepting raw card data from the client (PCI-DSS violation)
// Now: requires valid JWT; userId comes from token, not request body
app.post('/api/subscriptions/create', authMiddleware, async (req, res) => {
  try {
    const { plan, name, email, company } = req.body;

    // FIX: use userId from the verified token, NOT from req.body
    const userId = req.user.userId;

    // FIX: validate plan value
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

    // FIX: removed paymentDetails.cardNumber from here entirely
    // Card metadata (last4, brand) must come from Razorpay's verify endpoint
    // Raw card data must NEVER travel to your server

    await user.save();
    console.log(`Subscription saved — user: ${user.email}, plan: ${plan}, trial ends: ${trialEndsAt}`);

    // FIX: JWT secret from env
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

// ─── Razorpay: Create order ───────────────────────────────────────────────────
// FIX: added auth middleware — was unprotected
app.post('/api/payment/create-order', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;

    const validAmounts = [900, 1900, 4900];
    if (!amount || !validAmounts.includes(Number(amount))) {
      return res.status(400).json({ error: 'Invalid amount.' });
    }

    // Dynamically import Razorpay (install: npm install razorpay)
    const Razorpay = (await import('razorpay')).default;
    const razorpay = new Razorpay({
      // FIX: keys from env, not hardcoded
      key_id:     process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    });

    res.json({ success: true, order });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create payment order.' });
  }
});

// ─── Razorpay: Verify payment ─────────────────────────────────────────────────
// FIX: added auth middleware — was unprotected
app.post('/api/payment/verify', authMiddleware, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan
    } = req.body;

    // FIX: userId comes from verified JWT, not from client body
    const userId = req.user.userId;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !plan) {
      return res.status(400).json({ error: 'Missing required payment fields.' });
    }

    const validPlans = ['digital', 'premium', 'enterprise'];
    if (!validPlans.includes(plan.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid plan.' });
    }

    // Verify HMAC signature — proves the payment actually came from Razorpay
    const crypto = await import('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.warn(`Signature mismatch for user ${userId} — possible tampered request`);
      return res.status(400).json({ error: 'Payment verification failed.' });
    }

    // Fetch payment details from Razorpay to get card metadata safely
    const Razorpay = (await import('razorpay')).default;
    const razorpay = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

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
      status: 'active',
      startDate: new Date(),
      trialEndsAt
    };

    // FIX: card metadata comes from Razorpay's API response, not from client
    user.paymentMethod = {
      cardLast4:  payment.card?.last4   || null,
      cardBrand:  payment.card?.network || null,
      razorpayPaymentId: razorpay_payment_id
    };

    await user.save();
    console.log(`Payment verified — user: ${user.email}, plan: ${plan}, payment: ${razorpay_payment_id}`);

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
    console.error('Payment verify error:', error);
    res.status(500).json({ error: 'Payment verification failed. Please contact support.' });
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
      indices:    clean(indices),
      commodities: clean(commodities),
      forex:      clean(forex),
      crypto:     clean(crypto),
      topGainers: gainers,
      topLosers:  losers,
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