import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoadingFallback } from './components/LoadingFallback';

// Eager load layout for seamless navigation skeleton
import { ClientLayout } from './layouts/ClientLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Lazy loading pages
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const BuildABox = lazy(() => import('./pages/BuildABox').then(module => ({ default: module.BuildABox })));
const Checkout = lazy(() => import('./pages/Checkout').then(module => ({ default: module.Checkout })));
const ReadyToShip = lazy(() => import('./pages/ReadyToShip').then(module => ({ default: module.ReadyToShip })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(module => ({ default: module.ProductDetail })));
const Products = lazy(() => import('./pages/Products').then(module => ({ default: module.Products })));
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));

// Admin Lazy Pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard').then(module => ({ default: module.AdminDashboard })));
const AdminProducts = lazy(() => import('./pages/admin/Products').then(module => ({ default: module.AdminProducts })));
const AdminCategories = lazy(() => import('./pages/admin/Categories').then(module => ({ default: module.AdminCategories })));
const AdminOrders = lazy(() => import('./pages/admin/Orders').then(module => ({ default: module.AdminOrders })));
const AdminOrderDetail = lazy(() => import('./pages/admin/OrderDetail').then(module => ({ default: module.AdminOrderDetail })));
const AdminCustomers = lazy(() => import('./pages/admin/Customers').then(module => ({ default: module.AdminCustomers })));
const AdminSettings = lazy(() => import('./pages/admin/Settings').then(module => ({ default: module.AdminSettings })));

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />

            <Route element={<ClientLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/ready-to-ship" element={<ReadyToShip />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/build-a-box" element={<BuildABox />} />
            </Route>

            {/* Protected Admin routes */}
            <Route element={<ProtectedRoute requireAdmin={true} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="orders/:id" element={<AdminOrderDetail />} />
                <Route path="customers" element={<AdminCustomers />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { fontFamily: 'Fredoka, sans-serif', fontWeight: 500, borderRadius: '12px' },
            success: { iconTheme: { primary: '#10B981', secondary: 'white' } },
            error: { iconTheme: { primary: '#EF4444', secondary: 'white' } },
          }}
        />
      </AuthProvider>
    </Router>
  );
};

export default App;