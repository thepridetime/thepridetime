const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Ad = require('../models/Ad');

// Ensure upload directory exists
const uploadDir = './public/uploads/ads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ============ GET ROUTES ============

// Get all active ads for frontend (filtered by position)
router.get('/', async (req, res) => {
  try {
    const { position } = req.query;
    const query = { is_active: true };
    
    // Filter by date range
    query.start_date = { $lte: new Date() };
    query.end_date = { $gte: new Date() };
    
    if (position) {
      query.position = position;
    }
    
    const ads = await Ad.find(query).sort({ created_at: -1 });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all ads for admin panel
router.get('/admin/all', async (req, res) => {
  try {
    const ads = await Ad.find().sort({ created_at: -1 });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single ad by ID
router.get('/:id', async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    res.json(ad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ POST ROUTES ============

// Create new ad
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, link_url, position, start_date, end_date } = req.body;
    const image_url = req.file ? `/uploads/ads/${req.file.filename}` : null;
    
    if (!image_url) {
      return res.status(400).json({ error: 'Image is required' });
    }
    
    const ad = new Ad({
      title,
      image_url,
      link_url,
      position,
      start_date: start_date || null,
      end_date: end_date || null
    });
    
    await ad.save();
    res.json({ message: 'Ad created successfully', ad });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ PUT ROUTES ============

// Update ad
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, link_url, position, start_date, end_date, is_active } = req.body;
    const updateData = { title, link_url, position, start_date, end_date, is_active };
    
    if (req.file) {
      updateData.image_url = `/uploads/ads/${req.file.filename}`;
    }
    
    const ad = await Ad.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    
    res.json({ message: 'Ad updated successfully', ad });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ DELETE ROUTES ============

// Delete ad
router.delete('/:id', async (req, res) => {
  try {
    const ad = await Ad.findByIdAndDelete(req.params.id);
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    res.json({ message: 'Ad deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ TRACKING ROUTES ============

// Track impression
router.post('/:id/impression', async (req, res) => {
  try {
    await Ad.findByIdAndUpdate(req.params.id, { $inc: { impressions: 1 } });
    res.json({ message: 'Impression tracked' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Track click
router.post('/:id/click', async (req, res) => {
  try {
    await Ad.findByIdAndUpdate(req.params.id, { $inc: { clicks: 1 } });
    res.json({ message: 'Click tracked' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;