import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('usuario'));
    if (!userData) {
      navigate('/');
    } else {
      setUsuario(userData);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!usuario) return null;

  return (
    <div className="container">
      <h1>Bem-vindo, {usuario.nome}!</h1>
      <p>Tipo de usuário: {usuario.tipo}</p>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/veiculos')}>Meus Veículos</button>

        {usuario.tipo === 'guarita' && (
          <>
            <button onClick={() => navigate('/visitantes')}>Visitantes</button>
            <button onClick={() => navigate('/acessos')}>Registros</button>
            <button onClick={() => navigate('/logs')}>Logs</button>
          </>
        )}

        <button onClick={logout}>Sair</button>
      </div>
    </div>
  );
}
