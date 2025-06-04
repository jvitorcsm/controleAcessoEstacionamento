import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const location = useLocation();
  const rotaAtiva = (path) => location.pathname === path ? 'ativo' : '';

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  return (
    <aside className="sidebar">
      <h2>Estacione+</h2>
      <nav>
        <Link to="/dashboard" className={rotaAtiva('/dashboard')}>Dashboard</Link>
        <Link to="/veiculos" className={rotaAtiva('/veiculos')}>Veículos</Link>

        {usuario?.tipo === 'guarita' && (
          <>
            <Link to="/visitantes" className={rotaAtiva('/visitantes')}>Visitantes</Link>
            <Link to="/acessos" className={rotaAtiva('/acessos')}>Entradas/Saídas</Link>
            <Link to="/logs" className={rotaAtiva('/logs')}>Logs</Link>
          </>
        )}
      </nav>
    </aside>
  );
}
