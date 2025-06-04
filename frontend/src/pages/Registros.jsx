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
      await api.post('/acessos', { placa, tipo });
      alert(`Registro de ${tipo} realizado com sucesso!`);
      setPlaca('');
      buscarHistorico();
    } catch (err) {
      alert('Erro ao registrar acesso');
    }
  };

  const buscarHistorico = async () => {
    try {
      const { data } = await api.get('/acessos');
      setHistorico(data);
    } catch (err) {
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
        onChange={(e) => setPlaca(e.target.value)}
      />
      <button onClick={() => registrar('entrada')}>Registrar Entrada</button>
      <button onClick={() => registrar('saida')}>Registrar Saída</button>

      <h3>Últimos Registros</h3>
      <ul>
      {historico.map((item) => {
        const tipo = item?.tipo?.toUpperCase?.() || 'TIPO DESCONHECIDO';
        const placa = item?.placa || 'PLACA DESCONHECIDA';
        const data = item?.createdAt
          ? new Date(item.createdAt).toLocaleString()
          : 'DATA INVÁLIDA';
      
        return (
          <li key={item.id}>
            {tipo} - {placa} - {data}
          </li>
        );
      })}
    </ul>

      <button onClick={() => navigate('/dashboard')}>Voltar</button>
    </div>
  );
}
