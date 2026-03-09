const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('farmer', 'admin'),
    defaultValue: 'farmer',
  },
  landSize: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'Land size in acres',
  },
  district: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  farmerType: {
    type: DataTypes.ENUM('Borrower', 'Lender', 'Both'),
    allowNull: true,
  },
  trustScore: {
    type: DataTypes.INTEGER,
    defaultValue: 100,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
