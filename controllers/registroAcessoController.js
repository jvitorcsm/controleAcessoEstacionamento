const RegistroAcesso = require('../models/RegistroAcesso');
const Veiculo = require('../models/Veiculo');

const excluir = async (req, res) => {
  try {
    const veiculoId = req.params.id;
    const acessoAberto = await RegistroAcesso.findOne({
      where: {
        veiculo_id: veiculoId,
        status: 'entrada'
      }
    });
    if (acessoAberto) {
      return res.status(400).json({ error: 'Não é possível excluir veículo com acesso aberto' });
    };
    await Veiculo.destroy({ where: { id: veiculoId } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir registro', detalhe: err.message });
  }
};
const TOTAL_VAGAS = 50;

const consultarVagasDisponiveis = async (req, res) => {
  try {
    const ocupadas = await RegistroAcesso.count({
      where: {
        status: 'entrada'
      }
    });

    const vagasDisponiveis = TOTAL_VAGAS - ocupadas;

    res.json({ vagasDisponiveis, total: TOTAL_VAGAS, ocupadas });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao consultar vagas', detalhe: err.message });
  }
};

// Registra entrada
const registrarEntrada = async (req, res) => {
  try {
    const { placa } = req.body;

    const veiculo = await Veiculo.findOne({ where: { placa } });
    if (!veiculo) return res.status(404).json({ error: 'Veículo não encontrado' });

    const registro = await RegistroAcesso.create({
      veiculo_id: veiculo.id,
      data_hora_entrada: new Date(),
      status: 'entrada'
    });

    res.status(201).json(registro);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar entrada', detalhe: err.message });
  }
};

// Registra saída
const registrarSaida = async (req, res) => {
  try {
    const { placa } = req.body;

    const veiculo = await Veiculo.findOne({ where: { placa } });
    if (!veiculo) return res.status(404).json({ error: 'Veículo não encontrado' });

    const ultimoRegistro = await RegistroAcesso.findOne({
      where: {
        veiculo_id: veiculo.id,
        status: 'entrada'
      },
      order: [['createdAt', 'DESC']]
    });

    if (!ultimoRegistro) return res.status(404).json({ error: 'Nenhuma entrada registrada para esse veículo' });

    ultimoRegistro.data_hora_saida = new Date();
    ultimoRegistro.status = 'saida';
    await ultimoRegistro.save();

    res.status(200).json(ultimoRegistro);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar saída', detalhe: err.message });
  }
};

// Lista registros do usuário autenticado
const listarRegistros = async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll({ where: { usuario_id: req.usuarioId } });
    const veiculoIds = veiculos.map(v => v.id);

    const registros = await RegistroAcesso.findAll({
      where: { veiculo_id: veiculoIds },
      include: [{ model: Veiculo, as: 'veiculo' }]
    });

    res.status(200).json(registros);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar registros', detalhe: err.message });
  }
};

module.exports = { excluir ,registrarEntrada, registrarSaida, listarRegistros, consultarVagasDisponiveis };
