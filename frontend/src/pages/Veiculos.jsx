import { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [cor, setCor] = useState('');
  const navigate = useNavigate();

  const buscarVeiculos = async () => {
    try {
      const { data } = await api.get('/veiculos');
      setVeiculos(data);
    } catch (err) {
      console.error('Erro ao buscar veículos:', err);
    }
  };

  const cadastrarVeiculo = async (e) => {
    e.preventDefault();
    try {
      await api.post('/veiculos', { modelo, placa, cor });
      setModelo('');
      setPlaca('');
      setCor('');
      buscarVeiculos();
    } catch (err) {
      alert('Erro ao cadastrar veículo');
    }
  };

  const excluirVeiculo = async (id) => {
    try {
      await api.delete(`/veiculos/${id}`);
      buscarVeiculos();
    } catch (err) {
      alert('Erro ao excluir');
    }
  };

  useEffect(() => {
    buscarVeiculos();
  }, []);

  return (
    <div className="container">
      <h2>Meus Veículos</h2>

      <form onSubmit={cadastrarVeiculo}>
        <input
          type="text"
          placeholder="Modelo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Placa"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Cor"
          value={cor}
          onChange={(e) => setCor(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <ul>
        {veiculos.map((v) => (
          <li key={v.id}>
            {v.modelo} - {v.placa} - {v.cor}
            <button onClick={() => excluirVeiculo(v.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate('/dashboard')}>Voltar</button>
    </div>
  );
}
