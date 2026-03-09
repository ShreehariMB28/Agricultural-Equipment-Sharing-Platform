import { C } from './styles';

/* ── IMAGE MAP ── */
const BASE = '/Agricultural-Equipment-Sharing-Platform';
export const EQUIP_NAME_IMAGES = {
    'Mahindra Tractor 575 DI': `${BASE}/mahindra-tractor.webp`,
    'John Deere 5310': `${BASE}/john-deere.jpg`,
    'Kubota Harvester DC-93': `${BASE}/kubota-harvester.jpg`,
    'Shaktiman Rotavator': `${BASE}/rotavator.jpg`,
    'Honda Power Tiller FJ500': `${BASE}/power-tiller.jpeg`,
    'Paddy Thresher PT-200': `${BASE}/thresher.jpg`,
};
const EQUIP_TYPE_IMAGES = {
    'Tractor': `${BASE}/mahindra-tractor.webp`,
    'Harvester': `${BASE}/kubota-harvester.jpg`,
    'Tiller': `${BASE}/rotavator.jpg`,
    'Thresher': `${BASE}/thresher.jpg`,
    'Rotavator': `${BASE}/rotavator.jpg`,
    'Seed Drill': `${BASE}/thresher.jpg`,
};
export const getEquipImage = (type, name) => {
    if (name && EQUIP_NAME_IMAGES[name]) return EQUIP_NAME_IMAGES[name];
    return EQUIP_TYPE_IMAGES[type] || `${BASE}/mahindra-tractor.webp`;
};

export const EQUIP_DESC = {
    'Mahindra Tractor 575 DI': 'A powerful 45 HP tractor ideal for ploughing, tilling, and hauling. Well-maintained with recent servicing. Perfect for medium-sized farms in Maharashtra.',
    'John Deere 5310': 'Premium 55 HP tractor with power steering and advanced hydraulics. Excellent fuel efficiency and low vibration for comfortable long-hour operation.',
    'Kubota Harvester DC-93': 'High-capacity combine harvester suitable for rice and wheat harvesting. Reduces harvest time by 60% compared to manual methods.',
    'Shaktiman Rotavator': 'Heavy-duty rotavator for soil preparation. 7-feet working width with 48 blades ensures fine tilth in a single pass.',
    'Honda Power Tiller FJ500': 'Compact and fuel-efficient power tiller for small and marginal farms. Easy to operate with low maintenance costs.',
    'Paddy Thresher PT-200': 'Efficient paddy thresher with 200 kg/hr capacity. Clean separation with minimal grain damage. Suitable for small-scale paddy farming.',
};

export const ADMIN_STATUSES = ['Available', 'Inspection Pending', 'Mechanic Dispatched', 'Approved & Ready', 'In Use', 'Return Inspection Pending', 'Mechanic Dispatched for Return Check', 'Returned & Cleared'];
export const LOCATIONS = ['All Locations', 'Pune', 'Nashik', 'Aurangabad', 'Nagpur', 'Kolhapur'];
export const TYPES = ['All Types', 'Tractor', 'Harvester', 'Rotavator', 'Seed Drill', 'Thresher', 'Tiller', 'Other'];
export const CROPS = ['Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Soybean', 'Jowar', 'Bajra', 'Groundnut'];
export const FUEL_TYPES = ['Diesel', 'Petrol', 'Electric'];
export const CONDITIONS = ['Excellent', 'Good', 'Fair', 'Poor'];
export const ATTACHMENTS = ['Plough', 'Cultivator', 'Harrow', 'Seed Drill', 'Sprayer', 'Trailer', 'Rotavator Blades', 'Leveller'];

export const EQUIPMENT = [
    { id: 1, name: 'Mahindra Tractor 575 DI', type: 'Tractor', brand: 'Mahindra', yearOfMfg: 2019, condition: 'Excellent', engineHours: 1200, lastServiced: '2026-01-15', fuelType: 'Diesel', hp: 45, attachments: ['Plough', 'Cultivator'], pricePerHour: 150, pricePerDay: 1200, location: 'Pune', village: 'Khed', taluka: 'Khed', district: 'Pune', state: 'Maharashtra', deliveryAvailable: true, rating: 4.2, available: true, icon: '\u{1F69C}', totalRentals: 34, adminStatus: 'Available', adminNote: '', bookedFrom: '', bookedTo: '', photos: [`${BASE}/mahindra-tractor.webp`] },
    { id: 2, name: 'John Deere 5310', type: 'Tractor', brand: 'John Deere', yearOfMfg: 2020, condition: 'Excellent', engineHours: 800, lastServiced: '2026-02-01', fuelType: 'Diesel', hp: 55, attachments: ['Plough', 'Trailer', 'Harrow'], pricePerHour: 200, pricePerDay: 1500, location: 'Nashik', village: 'Sinnar', taluka: 'Sinnar', district: 'Nashik', state: 'Maharashtra', deliveryAvailable: true, rating: 4.5, available: true, icon: '\u{1F69C}', totalRentals: 42, adminStatus: 'Available', adminNote: '', bookedFrom: '', bookedTo: '', photos: [`${BASE}/john-deere.jpg`] },
    { id: 3, name: 'Kubota Harvester DC-93', type: 'Harvester', brand: 'Kubota', yearOfMfg: 2018, condition: 'Good', engineHours: 2400, lastServiced: '2025-12-10', fuelType: 'Diesel', hp: 93, attachments: [], pricePerHour: 350, pricePerDay: 2800, location: 'Aurangabad', village: 'Kannad', taluka: 'Kannad', district: 'Aurangabad', state: 'Maharashtra', deliveryAvailable: false, rating: 3.8, available: false, icon: '\u{1F33E}', totalRentals: 19, adminStatus: 'In Use', adminNote: 'Booked by Sunil Jadhav', bookedFrom: 'Mar 10', bookedTo: 'Mar 12', photos: [`${BASE}/kubota-harvester.jpg`] },
    { id: 4, name: 'Shaktiman Rotavator', type: 'Rotavator', brand: 'Shaktiman', yearOfMfg: 2021, condition: 'Excellent', engineHours: 600, lastServiced: '2026-02-15', fuelType: 'Diesel', hp: 0, attachments: ['Rotavator Blades'], pricePerHour: 100, pricePerDay: 800, location: 'Nagpur', village: 'Hingna', taluka: 'Hingna', district: 'Nagpur', state: 'Maharashtra', deliveryAvailable: true, rating: 4.7, available: true, icon: '\u2699\uFE0F', totalRentals: 56, adminStatus: 'Approved & Ready', adminNote: 'Inspected by Rajan Patil', bookedFrom: '', bookedTo: '', photos: [`${BASE}/rotavator.jpg`] },
    { id: 5, name: 'Honda Power Tiller FJ500', type: 'Tiller', brand: 'Honda', yearOfMfg: 2022, condition: 'Good', engineHours: 350, lastServiced: '2026-01-20', fuelType: 'Petrol', hp: 9, attachments: ['Leveller'], pricePerHour: 80, pricePerDay: 600, location: 'Kolhapur', village: 'Panhala', taluka: 'Panhala', district: 'Kolhapur', state: 'Maharashtra', deliveryAvailable: true, rating: 4.0, available: true, icon: '\u{1F527}', totalRentals: 28, adminStatus: 'Available', adminNote: '', bookedFrom: '', bookedTo: '', photos: [`${BASE}/power-tiller.jpeg`] },
    { id: 6, name: 'Paddy Thresher PT-200', type: 'Thresher', brand: 'Local', yearOfMfg: 2020, condition: 'Fair', engineHours: 1800, lastServiced: '2025-11-30', fuelType: 'Diesel', hp: 15, attachments: [], pricePerHour: 110, pricePerDay: 900, location: 'Pune', village: 'Baramati', taluka: 'Baramati', district: 'Pune', state: 'Maharashtra', deliveryAvailable: false, rating: 4.3, available: true, icon: '\u{1F33F}', totalRentals: 15, adminStatus: 'Available', adminNote: '', bookedFrom: '', bookedTo: '', photos: [`${BASE}/thresher.jpg`] },
];

export const initBookings = [
    { id: 1, equipment: 'Mahindra Tractor 575 DI', farmer: 'Rajesh Patil', location: 'Pune', dates: 'Mar 5 \u2013 Mar 8', days: 3, total: 4158, status: 'Confirmed', crop: 'Wheat', landSize: 5 },
    { id: 2, equipment: 'Kubota Harvester DC-93', farmer: 'Sunil Jadhav', location: 'Aurangabad', dates: 'Mar 10 \u2013 Mar 12', days: 2, total: 6104, status: 'In Use', crop: 'Rice', landSize: 8 },
    { id: 3, equipment: 'Power Tiller FJ500', farmer: 'Anita Deshmukh', location: 'Kolhapur', dates: 'Feb 20 \u2013 Feb 22', days: 2, total: 1308, status: 'Completed', crop: 'Sugarcane', landSize: 3 },
    { id: 4, equipment: 'Paddy Thresher PT-200', farmer: 'Manoj Shinde', location: 'Pune', dates: 'Mar 15 \u2013 Mar 17', days: 2, total: 1962, status: 'Pending', crop: 'Jowar', landSize: 4 },
];

export const SAMPLE_USERS = [
    { id: 1, name: 'Rajesh Patil', email: 'rajesh@mail.com', phone: '9876543210', role: 'farmer', farmerType: 'Borrower', district: 'Pune', state: 'Maharashtra', landSize: 5, trustScore: 92, status: 'Active', joinDate: '2025-06-15', damageHistory: [] },
    { id: 2, name: 'Sunil Jadhav', email: 'sunil@mail.com', phone: '9876543211', role: 'farmer', farmerType: 'Both', district: 'Aurangabad', state: 'Maharashtra', landSize: 8, trustScore: 78, status: 'Active', joinDate: '2025-08-20', damageHistory: [{ date: '2026-01-10', type: 'Minor', equip: 'Rotavator', desc: 'Blade damage' }] },
    { id: 3, name: 'Anita Deshmukh', email: 'anita@mail.com', phone: '9876543212', role: 'farmer', farmerType: 'Borrower', district: 'Kolhapur', state: 'Maharashtra', landSize: 3, trustScore: 100, status: 'Active', joinDate: '2025-09-05', damageHistory: [] },
    { id: 4, name: 'Manoj Shinde', email: 'manoj@mail.com', phone: '9876543213', role: 'farmer', farmerType: 'Lender', district: 'Pune', state: 'Maharashtra', landSize: 12, trustScore: 45, status: 'Suspended', joinDate: '2025-03-12', damageHistory: [{ date: '2025-11-15', type: 'Major', equip: 'Tractor', desc: 'Engine failure due to misuse' }, { date: '2026-01-22', type: 'Minor', equip: 'Tiller', desc: 'Handle bent' }, { date: '2026-02-28', type: 'Major', equip: 'Harvester', desc: 'Cutting mechanism damaged' }] },
    { id: 5, name: 'Priya Kulkarni', email: 'priya@mail.com', phone: '9876543214', role: 'farmer', farmerType: 'Both', district: 'Nashik', state: 'Maharashtra', landSize: 6, trustScore: 65, status: 'Active', joinDate: '2025-07-18', damageHistory: [{ date: '2026-02-05', type: 'Minor', equip: 'Seed Drill', desc: 'Seed box crack' }] },
];

export const SAMPLE_CLAIMS = [
    { id: 1, claimant: 'Sunil Jadhav', equipment: 'Shaktiman Rotavator', date: '2026-01-10', type: 'Minor Damage', status: 'Approved', amount: 8500, desc: 'Blade damage during rocky soil operation', photos: 2 },
    { id: 2, claimant: 'Manoj Shinde', equipment: 'Mahindra Tractor 575 DI', date: '2025-11-15', type: 'Major Damage', status: 'Settled', amount: 45000, desc: 'Engine failure due to misuse', photos: 5 },
    { id: 3, claimant: 'Priya Kulkarni', equipment: 'Seed Drill SD-100', date: '2026-02-05', type: 'Minor Damage', status: 'Under Review', amount: 3200, desc: 'Seed box crack during transport', photos: 3 },
    { id: 4, claimant: 'Manoj Shinde', equipment: 'Honda Power Tiller FJ500', date: '2026-01-22', type: 'Minor Damage', status: 'Pending', amount: 5000, desc: 'Handle bent during field work', photos: 2 },
];
