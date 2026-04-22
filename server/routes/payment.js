import express from 'express';
import jwt from 'jsonwebtoken';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import mongoose from 'mongoose';

const router = express.Router();

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

// ─── User model (reuse existing connection) ───────────────────────────────────
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

// Use existing model if already compiled, otherwise create it
const User = mongoose.models.User || mongoose.model('User', userSchema);

// ─── POST /api/payment/create-order ──────────────────────────────────────────
router.post('/create-order', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;

    const validAmounts = [900, 1900, 4900];
    if (!amount || !validAmounts.includes(Number(amount))) {
      return res.status(400).json({ error: 'Invalid amount.' });
    }

    const razorpay = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100, // convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    });

    res.json({
      success: true,
      order: {
        id:       order.id,
        amount:   order.amount,
        currency: order.currency
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create payment order.' });
  }
});

// ─── POST /api/payment/verify ─────────────────────────────────────────────────
router.post('/verify', authMiddleware, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan
    } = req.body;

    const userId = req.user.userId;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !plan) {
      return res.status(400).json({ error: 'Missing required payment fields.' });
    }

    const validPlans = ['digital', 'premium', 'enterprise'];
    if (!validPlans.includes(plan.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid plan.' });
    }

    // Verify HMAC signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.warn(`Signature mismatch for user ${userId}`);
      return res.status(400).json({ error: 'Payment verification failed.' });
    }

    // Fetch card metadata from Razorpay
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
      plan:        plan.toLowerCase(),
      status:      'active',
      startDate:   new Date(),
      trialEndsAt
    };

    user.paymentMethod = {
      cardLast4:         payment.card?.last4   || null,
      cardBrand:         payment.card?.network || null,
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
        id:           user._id,
        email:        user.email,
        name:         user.name,
        subscription: user.subscription
      },
      token
    });
  } catch (error) {
    console.error('Payment verify error:', error);
    res.status(500).json({ error: 'Payment verification failed. Please contact support.' });
  }
});

export default router;