const Visitante = require('../models/Visitante');
const Usuario = require('../models/Usuario');

const cadastrarVisitante = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId);
    if (!usuario || usuario.tipo !== 'guarita') {
      return res.status(403).json({ error: 'Acesso negado. Apenas a guarita pode cadastrar visitantes.' });
    }

    const visitante = await Visitante.create({
      ...req.body,
      usuario_guarita_id: req.usuarioId
    });

    res.status(201).json(visitante);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cadastrar visitante', detalhe: err.message });
  }
};

const listarVisitantes = async (req, res) => {
  try {
    const visitantes = await Visitante.findAll({
      include: [{ model: Usuario, as: 'guarita', attributes: ['nome', 'email'] }]
    });
    res.status(200).json(visitantes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar visitantes', detalhe: err.message });
  }
};

module.exports = { cadastrarVisitante, listarVisitantes };
