const LogAdmin = require('../models/LogAdmin');
const Usuario = require('../models/Usuario');
const Veiculo = require('../models/Veiculo');
const RegistroAcesso = require('../models/RegistroAcesso');

const listarLogs = async (req, res) => {
  try {
    const registros = await RegistroAcesso.findAll({
      include: [
        {
          model: Veiculo,
          as: 'veiculo',
          include: [{ model: Usuario, as: 'usuario' }]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const logs = registros.map((r) => ({
      id: r.id,
      placa: r.veiculo?.placa,
      modelo: r.veiculo?.modelo,
      cor: r.veiculo?.cor,
      dono: r.veiculo?.usuario?.nome,
      status: r.status,
      entrada: r.data_hora_entrada,
      saida: r.data_hora_saida
    }));

    res.status(200).json(logs);
  } catch (err) {
    console.error('Erro ao listar logs:', err);
    res.status(500).json({ error: 'Erro ao listar logs', detalhe: err.message });
  }
};

module.exports = {
  listarLogs
};
