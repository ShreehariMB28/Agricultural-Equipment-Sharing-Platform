import { useState, useEffect } from 'react';
import { GlobalStyles, C } from './styles';
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
    const [insuranceApps, setInsuranceApps] = useState(() => {
        const saved = localStorage.getItem('insuranceApps');
        return saved ? JSON.parse(saved) : [];
    });
    const [claims, setClaims] = useState(() => {
        const saved = localStorage.getItem('claims');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('insuranceApps', JSON.stringify(insuranceApps));
    }, [insuranceApps]);

    useEffect(() => {
        localStorage.setItem('claims', JSON.stringify(claims));
    }, [claims]);

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
            {page === 'Equipment' && <EquipmentPage setPage={setPage} setSelectedEquip={setSelectedEquip} addToast={addToast} equipmentData={equipmentData} user={user} bookings={bookings} />}
            {page === 'Booking' && <BookingPage selectedEquip={selectedEquip} setPage={setPage} addToast={addToast} bookings={bookings} setBookings={setBookings} user={user} />}
            {page === 'Insurance' && <InsurancePage user={user} addToast={addToast} insuranceApps={insuranceApps} setInsuranceApps={setInsuranceApps} />}
            {page === 'Dashboard' && <FarmerDashboard bookings={bookings} setBookings={setBookings} addToast={addToast} equipmentData={equipmentData} setEquipmentData={setEquipmentData} user={user} setPage={setPage} claims={claims} setClaims={setClaims} />}
            {page === 'Admin Dashboard' && <AdminDashboard bookings={bookings} setBookings={setBookings} addToast={addToast} equipmentData={equipmentData} setEquipmentData={setEquipmentData} user={user} insuranceApps={insuranceApps} setInsuranceApps={setInsuranceApps} claims={claims} setClaims={setClaims} />}
            {page === 'Login' && <LoginPage setPage={setPage} setUser={setUser} addToast={addToast} />}
            {page === 'AdminLogin' && <AdminLoginPage setPage={setPage} setUser={setUser} addToast={addToast} />}
        </div>
    );
}
