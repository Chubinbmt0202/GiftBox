import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requireAdmin = false }) => {
    const { user, role, loading } = useAuth();

    if (loading) {
        return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        // If not logged in, redirect to login
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && role !== 'admin') {
        // If requires admin but user is not admin, redirect to home
        return <Navigate to="/" replace />;
    }

    // If all checks pass, render the child routes
    return <Outlet />;
};
