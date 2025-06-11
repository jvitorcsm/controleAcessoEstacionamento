import { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Registros() {
  const [placa, setPlaca] = useState('');
  const [historico, setHistorico] = useState([]);
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    if (!usuario || usuario.tipo !== 'guarita') {
      alert('Acesso não autorizado');
      navigate('/');
    } else {
      buscarHistorico();
    }
  }, []);

  const registrar = async (tipo) => {
    if (!placa) return alert('Digite a placa do veículo');
    try {
      await api.post(`/acessos/${tipo}`, { placa });
      alert(`Registro de ${tipo} realizado com sucesso!`);
      setPlaca('');
      buscarHistorico();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Erro ao registrar acesso');
    }
  };

  const buscarHistorico = async () => {
    try {
      const { data } = await api.get('/acessos');
      setHistorico(data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Erro ao buscar histórico');
    }
  };

  return (
    <div className="container">
      <h2>Registrar Entrada / Saída</h2>
      <input
        type="text"
        placeholder="Placa do veículo"
        value={placa}
        onChange={(e) => setPlaca(e.target.value.toUpperCase())}
        style={{ padding: '0.5rem', marginRight: '0.5rem' }}
      />
      <button onClick={() => registrar('entrada')}>Registrar Entrada</button>
      <button onClick={() => registrar('saida')} style={{ marginLeft: '10px' }}>
        Registrar Saída
      </button>

      <h3 style={{ marginTop: '2rem' }}>Últimos Registros</h3>
      <div
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          padding: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          background: '#f9f9f9',
          marginBottom: '1rem'
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[...historico].reverse().map((item) => {
            const tipo = typeof item?.status === 'string' ? item.status.toUpperCase() : 'TIPO DESCONHECIDO';
            const placa = item?.veiculo?.placa || 'PLACA DESCONHECIDA';
            const data = item?.createdAt
              ? new Date(item.createdAt).toLocaleString()
              : 'DATA INVÁLIDA';

            return (
              <li key={item.id} style={{ marginBottom: '0.5rem' }}>
                <strong>{tipo}</strong> - {placa} - <em>{data}</em>
              </li>
            );
          })}
        </ul>
      </div>

      <button onClick={() => navigate('/dashboard')}>Voltar</button>
    </div>
  );
}