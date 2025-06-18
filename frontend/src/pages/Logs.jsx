import { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await api.get('/logs');
        setLogs(data);
      } catch (err) {
        console.error('Erro ao buscar logs:', err);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="container">
      <h2>Logs Administrativos</h2>

      <div style={{
        maxHeight: '300px',
        overflowY: 'auto',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        background: '#f9f9f9'
      }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {logs.map((log) => (
            <li key={log.id} style={{ marginBottom: '1rem' }}>
              <strong>{log.status.toUpperCase()}</strong> | 
              Placa: {log.placa} | 
              Dono: {log.dono || 'Desconhecido'} | 
              Entrada: {log.entrada ? new Date(log.entrada).toLocaleString() : '—'} | 
              Saída: {log.saida ? new Date(log.saida).toLocaleString() : '—'}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => navigate('/dashboard')}>Voltar</button>
    </div>
  );
}