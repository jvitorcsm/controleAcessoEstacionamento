const LogAdmin = require('../models/LogAdmin');

const registrarLog = (acao) => {
  return async (req, res, next) => {
    try {
      await LogAdmin.create({
        acao,
        usuario_id: req.usuarioId
      });
    } catch (err) {
      console.warn('Erro ao registrar log:', err.message);
    }
    next();
  };
};

module.exports = registrarLog;
