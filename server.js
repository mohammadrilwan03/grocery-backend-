const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Product = require('./models/Product');
const User = require('./models/User');
const Contact = require('./models/Contact');
const Order = require('./models/Order');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_123';

// Middleware
app.use(cors());
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// MongoDB Connection
const MONGO_URI =`mongodb+srv://mohammadrilwan230_db_user:OlhiNrzLEfhux2Je@cluster0.iar7zay.mongodb.net/freshmarket`
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/freshmarket';
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB (Compass)'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- AUTH ROUTES ---
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- CONTACT ROUTE ---
app.post('/api/contact', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ message: "Message sent! We will get back to you soon." });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- ORDER ROUTES ---
app.post('/api/orders', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!", order: savedOrder });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/orders/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- PRODUCT ROUTES ---
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/products', async (req, res) => {
    const product = new Product(req.body);
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('FreshMarket Backend with Orders, Auth and Contact is running...');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
});
