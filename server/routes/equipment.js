const express = require('express');
const Equipment = require('../models/Equipment');

const router = express.Router();

// GET /api/equipment
router.get('/', async (req, res) => {
  try {
    const filters = {};
    if (req.query.type && req.query.type !== 'All Types') filters.type = req.query.type;
    if (req.query.location && req.query.location !== 'All Locations') filters.district = req.query.location;

    const equipments = await Equipment.findAll({ where: filters });
    res.json(equipments);
  } catch (err) {
    console.error('Error fetching equipment:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/equipment/:id
router.get('/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    res.json(equipment);
  } catch (err) {
    console.error('Error fetching equipment:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/equipment
router.post('/', async (req, res) => {
  try {
    const equipment = await Equipment.create(req.body);
    res.status(201).json(equipment);
  } catch (err) {
    console.error('Error creating equipment:', err);
    res.status(500).json({ error: 'Server error while creating equipment' });
  }
});

// PUT /api/equipment/:id
router.put('/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    await equipment.update(req.body);
    res.json(equipment);
  } catch(err) {
    console.error('Error updating equipment:', err);
    res.status(500).json({ error: 'Server error while updating equipment' });
  }
});

// DELETE /api/equipment/:id
router.delete('/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (!equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    await equipment.destroy();
    res.json({ message: 'Equipment deleted' });
  } catch(err) {
    console.error('Error deleting equipment:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;