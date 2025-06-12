import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [vagas, setVagas] = useState({ vagasDisponiveis: 0, ocupadas: 0, total: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('usuario'));
    if (!userData) {
      navigate('/');
    } else {
      setUsuario(userData);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/acessos/vagas',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
        console.log('📦 Dados recebidos:', response.data);
        setVagas(response.data);
      } catch (err) {
        console.error('Erro ao buscar vagas:', err);
      }
    };

    fetchVagas();
    const interval = setInterval(fetchVagas, 10000); // atualiza a cada 10s
    return () => clearInterval(interval); // limpa intervalo ao sair da página
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

      {/* 👇 Seção de VAGAS 👇 */}
      {usuario.tipo === 'guarita' || usuario.tipo === 'admin' ? (
        <div style={{
          background: '#f5f5f5',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem',
          boxShadow: '0 0 5px rgba(0,0,0,0.1)'
        }}>
          <h2>📊 Vagas do Estacionamento</h2>
          <p>Total de vagas: <strong>{vagas.total}</strong></p>
          <p>Ocupadas: <strong>{vagas.ocupadas}</strong></p>
          <p>Disponíveis: <strong>{vagas.vagasDisponiveis}</strong></p>
        </div>
      ) : null}

      {/* Botões */}
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
// Estilos inline para os botões
const buttonStyle = {
  margin: '0 10px',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};
// Adicionando hover effect
const buttonHoverStyle = {
  ...buttonStyle,
  backgroundColor: '#0056b3'
};
// Aplicando estilos aos botões
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.style.margin = buttonStyle.margin;
  button.style.padding = buttonStyle.padding;
  button.style.backgroundColor = buttonStyle.backgroundColor;
  button.style.color = buttonStyle.color;
  button.style.border = buttonStyle.border;
  button.style.borderRadius = buttonStyle.borderRadius;
  button.style.cursor = buttonStyle.cursor;

  button.addEventListener('mouseover', () => {
    button.style.backgroundColor = buttonHoverStyle.backgroundColor;
  });

  button.addEventListener('mouseout', () => {
    button.style.backgroundColor = buttonStyle.backgroundColor;
  });
});
// Fim do código