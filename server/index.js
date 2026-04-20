import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

//const PORT = 5000;
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection String
const MONGODB_URI = 'mongodb+srv://pridetimenews_db_user:VMPride%21%40%242026%23@cluster0.qbd029r.mongodb.net/pridetimes?retryWrites=true&w=majority';

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },

    subscription: {
        plan: { type: String, default: null },
        status: { type: String, default: null },
        startDate: { type: Date, default: null },
        trialEndsAt: { type: Date, default: null }
    },
    paymentMethod: {
        cardLast4: { type: String, default: null },
        cardBrand: { type: String, default: null },
        expiryDate: { type: String, default: null }
    }
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB  better error handling
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log(' Connected to MongoDB Atlas!');
        console.log(' Database: pridetimes');
    })
    .catch(err => {
        console.error(' MongoDB Connection Error:', err.message);
        console.log('\n  Trying to continue without MongoDB...');
    });

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Pride Times API is running!' });
});

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
    console.log('📝 Register request:', req.body.email);
    
    try {
        const { email, password, name } = req.body;
        
        // Check if mongoose is connected
        if (mongoose.connection.readyState !== 1) {
            console.log('  MongoDB not connected, using fallback');
            return res.status(503).json({ error: 'Database not connected. Please check MongoDB connection.' });
        }
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = new User({
            email,
            password: hashedPassword,
            name
        });
        
        await user.save();
        console.log(' User saved to MongoDB:', user._id);
        
        // Create token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            'pridetimes_secret_key_2024',
            { expiresIn: '7d' }
        );
        
        res.json({ 
            success: true, 
            token, 
            user: { id: user._id, email: user.email, name: user.name } 
        });
    } catch (error) {
        console.error(' Registration error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ error: 'Database not connected' });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            'pridetimes_secret_key_2024',
            { expiresIn: '7d' }
        );
        
        res.json({ 
            success: true, 
            token, 
            user: { id: user._id, email: user.email, name: user.name } 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Check status endpoint
app.get('/api/auth/check-status/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        res.json({ canLogin: !!user });
    } catch (error) {
        res.json({ canLogin: false });
    }
});
// Subscription create endpoint - Add this entire block
app.post('/api/subscriptions/create', async (req, res) => {
    console.log('📝 Subscription request:', req.body);
    
    try {
        const { userId, plan, name, email, company, paymentDetails } = req.body;
        
        // Check database connection
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ error: 'Database not connected' });
        }
        
        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Calculate trial end date
        const trialDays = plan === 'enterprise' ? 14 : 7;
        const trialEndsAt = new Date();
        trialEndsAt.setDate(trialEndsAt.getDate() + trialDays);
        
        // Save subscription details
        user.subscription = {
            plan: plan,
            status: 'trial',
            startDate: new Date(),
            trialEndsAt: trialEndsAt
        };
        
        // Save payment method (masked for security)
        if (paymentDetails && paymentDetails.cardNumber) {
            user.paymentMethod = {
                cardLast4: paymentDetails.cardNumber.slice(-4),
                cardBrand: paymentDetails.cardBrand || 'Unknown',
                expiryDate: paymentDetails.expiry || 'N/A'
            };
        }
        
        await user.save();
        console.log(' Subscription saved for user:', user.email);
        console.log('   Plan:', plan);
        console.log('   Trial ends:', trialEndsAt);
        console.log('   Card ending in:', user.paymentMethod.cardLast4);
        
        // Generate new token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            'pridetimes_secret_key_2024',
            { expiresIn: '7d' }
        );
        
        res.json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                subscription: user.subscription,
                paymentMethod: user.paymentMethod
            },
            token
        });
    } catch (error) {
        console.error(' Subscription error:', error);
        res.status(500).json({ error: error.message });
    }
});
app.get('/api/market/live', async (req, res) => {
  const KEY = process.env.FINNHUB_API_KEY;

  const symbols = {
    indices: [
      { symbol: 'OANDA:SPX500_USD', name: 'S&P 500' },
      { symbol: 'OANDA:NAS100_USD', name: 'NASDAQ' },
      { symbol: 'OANDA:UK100_GBP', name: 'FTSE 100' },
      { symbol: 'OANDA:JP225_USD', name: 'Nikkei 225' },
      { symbol: 'OANDA:DE30_EUR', name: 'DAX' },
      { symbol: 'OANDA:HK33_HKD', name: 'Hang Seng' },
    ],
    commodities: [
      { symbol: 'OANDA:XAU_USD', name: 'Gold' },
      { symbol: 'OANDA:XAG_USD', name: 'Silver' },
      { symbol: 'OANDA:BRENT_USD', name: 'Brent Oil' },
      { symbol: 'OANDA:NATGAS_USD', name: 'Natural Gas' },
    ],
    forex: [
      { symbol: 'OANDA:EUR_USD', name: 'EUR/USD' },
      { symbol: 'OANDA:GBP_USD', name: 'GBP/USD' },
      { symbol: 'OANDA:USD_JPY', name: 'USD/JPY' },
      { symbol: 'OANDA:USD_INR', name: 'USD/INR' },
      { symbol: 'OANDA:USD_SGD', name: 'USD/SGD' },
      { symbol: 'OANDA:AUD_USD', name: 'AUD/USD' },
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
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${KEY}`
      );
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
    const all = [
      ...clean(indices),
      ...clean(commodities),
      ...clean(forex),
      ...clean(crypto),
    ];

    const gainers = [...all]
      .sort((a, b) => parseFloat(b.changePercent) - parseFloat(a.changePercent))
      .slice(0, 5);
    const losers = [...all]
      .sort((a, b) => parseFloat(a.changePercent) - parseFloat(b.changePercent))
      .slice(0, 5);

    res.json({
      indices: clean(indices),
      commodities: clean(commodities),
      forex: clean(forex),
      crypto: clean(crypto),
      topGainers: gainers,
      topLosers: losers,
    });
  } catch (error) {
    console.error('Market error:', error);
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
});
app.listen(PORT, '0.0.0.0', () => {
    console.log(` Server running on http://localhost:${PORT}`);
});