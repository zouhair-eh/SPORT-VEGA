import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requirePatron = false }) {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login, saving the location they tried to access
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requirePatron && user?.role !== 'patron') {
        // If user tries to access admin but is not patron, redirect to shop
        return <Navigate to="/shop" replace />;
    }

    return children;
}
