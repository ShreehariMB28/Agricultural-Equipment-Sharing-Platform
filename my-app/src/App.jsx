import { useState, useEffect } from 'react';
import { GlobalStyles, C, API_URL } from './styles';
import { Toast } from './components/Utilities';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import AdminLoginPage from './components/AdminLoginPage';
import EquipmentPage from './components/EquipmentPage';
import BookingPage from './components/BookingPage';
import InsurancePage from './components/InsurancePage';
import FarmerDashboard from './components/FarmerDashboard';
import AdminDashboard from './components/AdminDashboard';
import { EQUIPMENT, initBookings } from './data';

export default function App() {
    const [page, setPage] = useState('Home');
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });
    const [selectedEquip, setSelectedEquip] = useState(null);
    const [bookings, setBookings] = useState(initBookings);
    const [equipmentData, setEquipmentData] = useState(EQUIPMENT);
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const res = await fetch(`${API_URL}/equipment`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setEquipmentData(data);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch equipment data from backend:', err);
            }
        };
        fetchEquipment();
    }, []);

    const addToast = (msg, type = 'success') => {
        const id = Date.now();
        setToasts(t => [...t, { id, msg, type }]);
        setTimeout(() => { setToasts(t => t.map(x => x.id === id ? { ...x, removing: true } : x)); setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 350); }, 3500);
    };
    const removeToast = (id) => { setToasts(t => t.map(x => x.id === id ? { ...x, removing: true } : x)); setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 350); };

    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [page]);

    // Access control
    useEffect(() => {
        if (!user && ['Dashboard', 'Booking', 'Insurance', 'Admin Dashboard'].includes(page)) {
            setPage('Login');
        }
        if (user?.role === 'admin' && page === 'Dashboard') {
            setPage('Admin Dashboard');
        }
    }, [page, user]);

    return (
        <div style={{ minHeight: '100vh', background: C.cream }}>
            <GlobalStyles />
            <Toast toasts={toasts} removeToast={removeToast} />
            <Navbar page={page} setPage={setPage} user={user} setUser={setUser} />
            {page === 'Home' && <HomePage setPage={setPage} addToast={addToast} />}
            {page === 'Equipment' && <EquipmentPage setPage={setPage} setSelectedEquip={setSelectedEquip} addToast={addToast} equipmentData={equipmentData} user={user} />}
            {page === 'Booking' && <BookingPage selectedEquip={selectedEquip} setPage={setPage} addToast={addToast} bookings={bookings} setBookings={setBookings} user={user} />}
            {page === 'Insurance' && <InsurancePage user={user} addToast={addToast} />}
            {page === 'Dashboard' && <FarmerDashboard bookings={bookings} setBookings={setBookings} addToast={addToast} equipmentData={equipmentData} setEquipmentData={setEquipmentData} user={user} setPage={setPage} />}
            {page === 'Admin Dashboard' && <AdminDashboard bookings={bookings} setBookings={setBookings} addToast={addToast} equipmentData={equipmentData} setEquipmentData={setEquipmentData} user={user} />}
            {page === 'Login' && <LoginPage setPage={setPage} setUser={setUser} addToast={addToast} />}
            {page === 'AdminLogin' && <AdminLoginPage setPage={setPage} setUser={setUser} addToast={addToast} />}
        </div>
    );
}
