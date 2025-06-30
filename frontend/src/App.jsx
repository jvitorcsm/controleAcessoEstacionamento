import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Veiculos from './pages/Veiculos';
import PrivateRoute from './components/PrivateRoute';
import Visitantes from './pages/Visitantes';
import Registros from './pages/Registros';
import Logs from './pages/Logs';
import Layout from './components/Layout';
import { Navigate } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/veiculos" element={<PrivateRoute><Veiculos /></PrivateRoute>} />
        <Route path="/visitantes" element={<PrivateRoute><Visitantes /></PrivateRoute>} />
        <Route path="/acessos" element={<PrivateRoute><Registros /></PrivateRoute>} />
        <Route path="/logs" element={<PrivateRoute><Logs /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
        <Route path="/veiculos" element={<PrivateRoute><Layout><Veiculos /></Layout></PrivateRoute>} />
        <Route path="/visitantes" element={<PrivateRoute><Layout><Visitantes /></Layout></PrivateRoute>} />
        <Route path="/acessos" element={<PrivateRoute><Layout><Registros /></Layout></PrivateRoute>} />
        <Route path="/logs" element={<PrivateRoute><Layout><Logs /></Layout></PrivateRoute>} />
        <Route path="/" element={<Login />} />
        {/* Adicione outras rotas protegidas aqui */}
      </Routes>
    </Router>
  );
}
