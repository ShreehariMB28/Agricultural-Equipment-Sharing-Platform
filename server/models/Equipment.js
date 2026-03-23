const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

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
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING(100),
  },
  yearOfMfg: {
    type: DataTypes.INTEGER,
  },
  condition: {
    type: DataTypes.STRING(50),
  },
  engineHours: {
    type: DataTypes.INTEGER,
  },
  lastServiced: {
    type: DataTypes.DATEONLY,
  },
  fuelType: {
    type: DataTypes.STRING(50),
  },
  hp: {
    type: DataTypes.INTEGER,
  },
  attachments: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  pricePerHour: {
    type: DataTypes.FLOAT,
  },
  pricePerDay: {
    type: DataTypes.FLOAT,
  },
  location: {
    type: DataTypes.STRING(150),
  },
  village: {
    type: DataTypes.STRING(100),
  },
  taluka: {
    type: DataTypes.STRING(100),
  },
  district: {
    type: DataTypes.STRING(100),
  },
  state: {
    type: DataTypes.STRING(100),
  },
  deliveryAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  icon: {
    type: DataTypes.STRING(10),
  },
  totalRentals: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  adminStatus: {
    type: DataTypes.STRING(100),
    defaultValue: 'Available',
  },
  adminNote: {
    type: DataTypes.TEXT,
  },
  bookedFrom: {
    type: DataTypes.STRING(50),
  },
  bookedTo: {
    type: DataTypes.STRING(50),
  },
  photos: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    }
  }
}, {
  tableName: 'equipments',
  timestamps: true,
});

// Define relations
Equipment.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
User.hasMany(Equipment, { foreignKey: 'ownerId', as: 'equipments' });

module.exports = Equipment;
