const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const sequelize = require('./config/database');
const User = require('./models/User');

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

    // Check if admin already exists
    const existing = await User.findOne({ where: { email: 'admin@krishiyantra.in' } });
    if (existing) {
      console.log('Admin user already exists. Skipping seed.');
      process.exit(0);
    }

    // Create admin
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
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
