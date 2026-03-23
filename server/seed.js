const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const sequelize = require('./config/database');
const User = require('./models/User');
const Equipment = require('./models/Equipment');

dotenv.config();

async function seed() {
  try {
    // Create database if not exists
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'krishiyantra'}\`;`);
    await connection.end();

    // Sync models
    await sequelize.sync({ alter: true });

    // Seed admin user
    const existingAdmin = await User.findOne({ where: { email: 'admin@krishiyantra.in' } });
    if (existingAdmin) {
      console.log('Admin user already exists. Skipping admin seed.');
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await User.create({
        name: 'KrishiYantra Admin',
        email: 'admin@krishiyantra.in',
        phone: '1800000000',
        password: hashedPassword,
        role: 'admin',
        trustScore: 100,
      });
      console.log('✅ Admin user seeded successfully!');
      console.log('   Email: admin@krishiyantra.in');
      console.log('   Password: admin123');
    }

    // Seed equipment
    const eqCount = await Equipment.count();
    if (eqCount > 0) {
      console.log(`Equipment already exists (${eqCount} rows). Skipping equipment seed.`);
    } else {
      const equipmentData = [
        { name: 'Mahindra Tractor 575 DI', type: 'Tractor', brand: 'Mahindra', yearOfMfg: 2019, condition: 'Excellent', engineHours: 1200, lastServiced: '2026-01-15', fuelType: 'Diesel', hp: 45, attachments: ['Plough', 'Cultivator'], pricePerHour: 150, pricePerDay: 1200, location: 'Pune', village: 'Khed', taluka: 'Khed', district: 'Pune', state: 'Maharashtra', deliveryAvailable: true, rating: 4.2, available: true, adminStatus: 'Available', adminNote: '' },
        { name: 'John Deere 5310', type: 'Tractor', brand: 'John Deere', yearOfMfg: 2020, condition: 'Excellent', engineHours: 800, lastServiced: '2026-02-01', fuelType: 'Diesel', hp: 55, attachments: ['Plough', 'Trailer', 'Harrow'], pricePerHour: 200, pricePerDay: 1500, location: 'Nashik', village: 'Sinnar', taluka: 'Sinnar', district: 'Nashik', state: 'Maharashtra', deliveryAvailable: true, rating: 4.5, available: true, adminStatus: 'Available', adminNote: '' },
        { name: 'Kubota Harvester DC-93', type: 'Harvester', brand: 'Kubota', yearOfMfg: 2018, condition: 'Good', engineHours: 2400, lastServiced: '2025-12-10', fuelType: 'Diesel', hp: 93, attachments: [], pricePerHour: 350, pricePerDay: 2800, location: 'Aurangabad', village: 'Kannad', taluka: 'Kannad', district: 'Aurangabad', state: 'Maharashtra', deliveryAvailable: false, rating: 3.8, available: false, adminStatus: 'In Use', adminNote: 'Booked by Sunil Jadhav' },
        { name: 'Shaktiman Rotavator', type: 'Rotavator', brand: 'Shaktiman', yearOfMfg: 2021, condition: 'Excellent', engineHours: 600, lastServiced: '2026-02-15', fuelType: 'Diesel', hp: 0, attachments: ['Rotavator Blades'], pricePerHour: 100, pricePerDay: 800, location: 'Nagpur', village: 'Hingna', taluka: 'Hingna', district: 'Nagpur', state: 'Maharashtra', deliveryAvailable: true, rating: 4.7, available: true, adminStatus: 'Approved & Ready', adminNote: 'Inspected by Rajan Patil' },
        { name: 'Honda Power Tiller FJ500', type: 'Tiller', brand: 'Honda', yearOfMfg: 2022, condition: 'Good', engineHours: 350, lastServiced: '2026-01-20', fuelType: 'Petrol', hp: 9, attachments: ['Leveller'], pricePerHour: 80, pricePerDay: 600, location: 'Kolhapur', village: 'Panhala', taluka: 'Panhala', district: 'Kolhapur', state: 'Maharashtra', deliveryAvailable: true, rating: 4.0, available: true, adminStatus: 'Available', adminNote: '' },
        { name: 'Paddy Thresher PT-200', type: 'Thresher', brand: 'Local', yearOfMfg: 2020, condition: 'Fair', engineHours: 1800, lastServiced: '2025-11-30', fuelType: 'Diesel', hp: 15, attachments: [], pricePerHour: 110, pricePerDay: 900, location: 'Pune', village: 'Baramati', taluka: 'Baramati', district: 'Pune', state: 'Maharashtra', deliveryAvailable: false, rating: 4.3, available: true, adminStatus: 'Available', adminNote: '' },
      ];
      await Equipment.bulkCreate(equipmentData);
      console.log('✅ 6 equipment items seeded successfully!');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
