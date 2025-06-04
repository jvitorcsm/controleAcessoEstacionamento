const LogAdmin = require('../models/LogAdmin');
const Usuario = require('../models/Usuario');

const listarLogs = async (req, res) => {
  try {
    const logs = await LogAdmin.findAll({
      include: [{ model: Usuario, as: 'autor', attributes: ['nome', 'email'] }],
      order: [['timestamp', 'DESC']]
    });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar logs', detalhe: err.message });
  }
};

module.exports = { listarLogs };
