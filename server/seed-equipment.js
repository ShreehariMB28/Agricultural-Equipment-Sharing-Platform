const sequelize = require('./config/database');
const Equipment = require('./models/Equipment');

const RAW_EQUIPMENT = [
    { name: 'Mahindra Tractor 575 DI', type: 'Tractor', brand: 'Mahindra', yearOfMfg: 2019, condition: 'Excellent', engineHours: 1200, lastServiced: '2026-01-15', fuelType: 'Diesel', hp: 45, attachments: ['Plough', 'Cultivator'], pricePerHour: 150, pricePerDay: 1200, location: 'Pune', village: 'Khed', taluka: 'Khed', district: 'Pune', state: 'Maharashtra', deliveryAvailable: true, rating: 4.2, available: true, icon: '🚜', totalRentals: 34, adminStatus: 'Available', photos: ['/Agricultural-Equipment-Sharing-Platform/mahindra-tractor.webp'] },
    { name: 'John Deere 5310', type: 'Tractor', brand: 'John Deere', yearOfMfg: 2020, condition: 'Excellent', engineHours: 800, lastServiced: '2026-02-01', fuelType: 'Diesel', hp: 55, attachments: ['Plough', 'Trailer', 'Harrow'], pricePerHour: 200, pricePerDay: 1500, location: 'Nashik', village: 'Sinnar', taluka: 'Sinnar', district: 'Nashik', state: 'Maharashtra', deliveryAvailable: true, rating: 4.5, available: true, icon: '🚜', totalRentals: 42, adminStatus: 'Available', photos: ['/Agricultural-Equipment-Sharing-Platform/john-deere.jpg'] },
    { name: 'Kubota Harvester DC-93', type: 'Harvester', brand: 'Kubota', yearOfMfg: 2018, condition: 'Good', engineHours: 2400, lastServiced: '2025-12-10', fuelType: 'Diesel', hp: 93, attachments: [], pricePerHour: 350, pricePerDay: 2800, location: 'Aurangabad', village: 'Kannad', taluka: 'Kannad', district: 'Aurangabad', state: 'Maharashtra', deliveryAvailable: false, rating: 3.8, available: false, icon: '🌾', totalRentals: 19, adminStatus: 'In Use', bookedFrom: 'Mar 10', bookedTo: 'Mar 12', photos: ['/Agricultural-Equipment-Sharing-Platform/kubota-harvester.jpg'] },
    { name: 'Shaktiman Rotavator', type: 'Rotavator', brand: 'Shaktiman', yearOfMfg: 2021, condition: 'Excellent', engineHours: 600, lastServiced: '2026-02-15', fuelType: 'Diesel', hp: 0, attachments: ['Rotavator Blades'], pricePerHour: 100, pricePerDay: 800, location: 'Nagpur', village: 'Hingna', taluka: 'Hingna', district: 'Nagpur', state: 'Maharashtra', deliveryAvailable: true, rating: 4.7, available: true, icon: '⚙️', totalRentals: 56, adminStatus: 'Approved & Ready', photos: ['/Agricultural-Equipment-Sharing-Platform/rotavator.jpg'] },
    { name: 'Honda Power Tiller FJ500', type: 'Tiller', brand: 'Honda', yearOfMfg: 2022, condition: 'Good', engineHours: 350, lastServiced: '2026-01-20', fuelType: 'Petrol', hp: 9, attachments: ['Leveller'], pricePerHour: 80, pricePerDay: 600, location: 'Kolhapur', village: 'Panhala', taluka: 'Panhala', district: 'Kolhapur', state: 'Maharashtra', deliveryAvailable: true, rating: 4.0, available: true, icon: '🔧', totalRentals: 28, adminStatus: 'Available', photos: ['/Agricultural-Equipment-Sharing-Platform/power-tiller.jpeg'] },
    { name: 'Paddy Thresher PT-200', type: 'Thresher', brand: 'Local', yearOfMfg: 2020, condition: 'Fair', engineHours: 1800, lastServiced: '2025-11-30', fuelType: 'Diesel', hp: 15, attachments: [], pricePerHour: 110, pricePerDay: 900, location: 'Pune', village: 'Baramati', taluka: 'Baramati', district: 'Pune', state: 'Maharashtra', deliveryAvailable: false, rating: 4.3, available: true, icon: '🌿', totalRentals: 15, adminStatus: 'Available', photos: ['/Agricultural-Equipment-Sharing-Platform/thresher.jpg'] },
];

async function seedEquipment() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    
    const count = await Equipment.count();
    if (count === 0) {
      await Equipment.bulkCreate(RAW_EQUIPMENT);
      console.log('✅ Mock Equipment successfully seeded into MySQL database!');
    } else {
      console.log('⚠️ Equipment data already exists in MySQL. Skipping seed.');
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed equipment into MySQL:', err);
    process.exit(1);
  }
}

seedEquipment();
