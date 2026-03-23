const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Equipment = require('../models/Equipment');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Configure multer storage
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype.split('/')[1]);
    cb(null, ext || mime);
  },
});

// GET /api/equipment — List all equipment (public)
router.get('/equipment', async (req, res) => {
  try {
    const equipment = await Equipment.findAll({ order: [['createdAt', 'DESC']] });
    res.json(equipment);
  } catch (err) {
    console.error('Fetch equipment error:', err);
    res.status(500).json({ error: 'Server error fetching equipment' });
  }
});

// GET /api/equipment/:id — Get single item (public)
router.get('/equipment/:id', async (req, res) => {
  try {
    const eq = await Equipment.findByPk(req.params.id);
    if (!eq) return res.status(404).json({ error: 'Equipment not found' });
    res.json(eq);
  } catch (err) {
    console.error('Fetch equipment error:', err);
    res.status(500).json({ error: 'Server error fetching equipment' });
  }
});

// POST /api/equipment — Add new equipment with image upload (auth required)
router.post('/equipment', authMiddleware, upload.array('photos', 10), async (req, res) => {
  try {
    const {
      name, type, brand, yearOfMfg, condition, engineHours,
      lastServiced, fuelType, hp, attachments,
      pricePerHour, pricePerDay, location, village, taluka,
      district, state, deliveryAvailable,
    } = req.body;

    if (!name || !pricePerDay) {
      return res.status(400).json({ error: 'Equipment name and price per day are required' });
    }

    // Build photo URLs from uploaded files
    const photos = (req.files || []).map(f => `/uploads/${f.filename}`);

    // Parse attachments — could be JSON string from FormData
    let parsedAttachments = [];
    if (attachments) {
      try { parsedAttachments = JSON.parse(attachments); } catch { parsedAttachments = []; }
    }

    const eq = await Equipment.create({
      name,
      type: type || 'Other',
      brand: brand || null,
      yearOfMfg: yearOfMfg ? Number(yearOfMfg) : null,
      condition: condition || 'Good',
      engineHours: engineHours ? Number(engineHours) : 0,
      lastServiced: lastServiced || null,
      fuelType: fuelType || 'Diesel',
      hp: hp ? Number(hp) : 0,
      attachments: parsedAttachments,
      pricePerHour: pricePerHour ? Number(pricePerHour) : null,
      pricePerDay: Number(pricePerDay),
      location: location || null,
      village: village || null,
      taluka: taluka || null,
      district: district || location || null,
      state: state || 'Maharashtra',
      deliveryAvailable: deliveryAvailable === 'true' || deliveryAvailable === true,
      rating: 4.0,
      available: false,
      adminStatus: 'Inspection Pending',
      adminNote: 'Awaiting admin approval',
      photos,
      ownerId: req.user.id,
    });

    res.status(201).json(eq);
  } catch (err) {
    console.error('Create equipment error:', err);
    res.status(500).json({ error: 'Server error creating equipment' });
  }
});

// PATCH /api/equipment/:id/status — Update admin status (admin only)
router.patch('/equipment/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { adminStatus, adminNote } = req.body;
    const eq = await Equipment.findByPk(req.params.id);
    if (!eq) return res.status(404).json({ error: 'Equipment not found' });

    if (adminStatus) eq.adminStatus = adminStatus;
    if (adminNote !== undefined) eq.adminNote = adminNote;
    eq.available = ['Available', 'Approved & Ready'].includes(adminStatus);

    await eq.save();
    res.json(eq);
  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({ error: 'Server error updating status' });
  }
});

// DELETE /api/equipment/:id — Delete equipment (admin only)
router.delete('/equipment/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const eq = await Equipment.findByPk(req.params.id);
    if (!eq) return res.status(404).json({ error: 'Equipment not found' });
    await eq.destroy();
    res.json({ message: 'Equipment deleted' });
  } catch (err) {
    console.error('Delete equipment error:', err);
    res.status(500).json({ error: 'Server error deleting equipment' });
  }
});

module.exports = router;
