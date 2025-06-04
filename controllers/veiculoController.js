const Veiculo = require('../models/Veiculo');

const cadastrar = async (req, res) => {
  try {
    const { modelo, placa, cor } = req.body;
    const usuario_id = req.usuarioId;

    const placaExistente = await Veiculo.findOne({ where: { placa } });
    if (placaExistente) return res.status(400).json({ error: 'Veículo com esta placa já cadastrado.' });

    const novoVeiculo = await Veiculo.create({ modelo, placa, cor, usuario_id });
    res.status(201).json(novoVeiculo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cadastrar veículo', detalhe: err.message });
  }
};

const listar = async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll({ where: { usuario_id: req.usuarioId } });
    res.status(200).json(veiculos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar veículos', detalhe: err.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const veiculo = await Veiculo.findOne({ where: { id, usuario_id: req.usuarioId } });
    if (!veiculo) return res.status(404).json({ error: 'Veículo não encontrado' });

    await veiculo.update(req.body);
    res.status(200).json(veiculo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar veículo', detalhe: err.message });
  }
};

const excluir = async (req, res) => {
  try {
    const { id } = req.params;
    const veiculo = await Veiculo.findOne({ where: { id, usuario_id: req.usuarioId } });
    if (!veiculo) return res.status(404).json({ error: 'Veículo não encontrado' });

    await veiculo.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir veículo', detalhe: err.message });
  }
};

module.exports = { cadastrar, listar, atualizar, excluir };
