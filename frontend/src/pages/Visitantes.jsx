import { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Visitantes() {
  const [visitantes, setVisitantes] = useState([]);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [motivo, setMotivo] = useState('');
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    if (!usuario || usuario.tipo !== 'guarita') {
      alert('Acesso não autorizado');
      navigate('/');
    } else {
      buscarVisitantes();
    }
  }, []);

  const buscarVisitantes = async () => {
    try {
      const { data } = await api.get('/visitantes');
      setVisitantes(data);
    } catch (err) {
      alert('Erro ao buscar visitantes');
    }
  };

  const cadastrarVisitante = async (e) => {
    e.preventDefault();
    try {
      await api.post('/visitantes', { nome, cpf, motivo });
      setNome('');
      setCpf('');
      setMotivo('');
      buscarVisitantes();
    } catch (err) {
      alert('Erro ao cadastrar visitante');
    }
  };

  return (
    <div className="container">
      <h2>Cadastro de Visitantes</h2>

      <form onSubmit={cadastrarVisitante}>
        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
        <input type="text" placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} required />
        <input type="text" placeholder="Motivo" value={motivo} onChange={e => setMotivo(e.target.value)} required />
        <button type="submit">Cadastrar Visitante</button>
      </form>

      <h3>Visitantes Registrados</h3>
      <ul>
        {visitantes.map(v => (
          <li key={v.id}>{v.nome} - CPF: {v.cpf} - Motivo: {v.motivo}</li>
        ))}
      </ul>

      <button onClick={() => navigate('/dashboard')}>Voltar</button>
    </div>
  );
}
