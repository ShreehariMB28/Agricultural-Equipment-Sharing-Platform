const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Equipment = sequelize.define('Equipment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('Tractor', 'Harvester', 'Rotavator', 'Seed Drill', 'Thresher', 'Tiller', 'Other'),
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  yearOfMfg: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  condition: {
    type: DataTypes.ENUM('Excellent', 'Good', 'Fair', 'Poor'),
    defaultValue: 'Good',
  },
  engineHours: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lastServiced: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  fuelType: {
    type: DataTypes.ENUM('Diesel', 'Petrol', 'Electric'),
    defaultValue: 'Diesel',
  },
  hp: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  attachments: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Array of attachment names',
  },
  pricePerHour: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  pricePerDay: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  village: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  taluka: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  district: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING(100),
    defaultValue: 'Maharashtra',
  },
  deliveryAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 4.0,
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  adminStatus: {
    type: DataTypes.STRING(60),
    defaultValue: 'Inspection Pending',
  },
  adminNote: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  photos: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Array of uploaded image file paths',
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'FK to users.id — the farmer who listed this equipment',
  },
}, {
  tableName: 'equipment',
  timestamps: true,
});

module.exports = Equipment;
