import { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    if (!usuario || usuario.tipo !== 'guarita') {
      alert('Acesso não autorizado');
      navigate('/');
    } else {
      buscarLogs();
    }
  }, []);

  const buscarLogs = async () => {
    try {
      const { data } = await api.get('/logs');
      setLogs(data);
    } catch (err) {
      alert('Erro ao buscar logs');
    }
  };

  return (
    <div className="container">
      <h2>Logs Administrativos</h2>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            <strong>{log.usuario?.nome}</strong> - {log.acao} -{' '}
            {new Date(log.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>

      <button onClick={() => navigate('/dashboard')}>Voltar</button>
    </div>
  );
}
