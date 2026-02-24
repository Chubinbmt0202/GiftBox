import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ClientLayout } from './layouts/ClientLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { Home } from './pages/Home';
import { BuildABox } from './pages/BuildABox';
import { Checkout } from './pages/Checkout';
import { ReadyToShip } from './pages/ReadyToShip';
import { ProductDetail } from './pages/ProductDetail';
import { Products } from './pages/Products';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminProducts } from './pages/admin/Products';
import { AdminCategories } from './pages/admin/Categories';
import { AdminOrders } from './pages/admin/Orders';
import { AdminCustomers } from './pages/admin/Customers';
import { AdminSettings } from './pages/admin/Settings';
import { Login } from './pages/Login';

const App = () => {
  return (
    <Router>
      <AuthProvider>
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
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;