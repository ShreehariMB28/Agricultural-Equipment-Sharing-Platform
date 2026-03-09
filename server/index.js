const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'KrishiYantra API is running' });
});

const PORT = process.env.PORT || 5000;

// Create database if not exists, then sync Sequelize and start
async function start() {
  try {
    // Create database if it doesn't exist
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'krishiyantra'}\`;`);
    await connection.end();

    // Sync Sequelize models
    await sequelize.sync({ alter: true });
    console.log('✅ Database connected & synced');

    app.listen(PORT, () => {
      console.log(`🚀 KrishiYantra API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
