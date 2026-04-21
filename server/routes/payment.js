import express from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/payment/create-order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    
    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };
    
    const order = await razorpay.orders.create(options);
    
    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
    });
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/payment/verify
router.post('/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      plan,
    } = req.body;
    
    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');
    
    if (expectedSignature === razorpay_signature) {
      // Update user subscription in your database
      res.json({ success: true, message: 'Payment verified' });
    } else {
      res.json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;