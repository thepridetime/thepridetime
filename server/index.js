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

app.listen(PORT, '0.0.0.0', () => {
    console.log(` Server running on http://localhost:${PORT}`);
});