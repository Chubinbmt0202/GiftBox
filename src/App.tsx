import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClientLayout } from './layouts/ClientLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { Home } from './pages/Home';
import { BuildABox } from './pages/BuildABox';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/build-a-box" element={<BuildABox />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<div>Admin Dashboard Placeholder</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;