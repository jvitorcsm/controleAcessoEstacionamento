const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Visitante = sequelize.define('Visitante', {
  nome: { type: DataTypes.STRING, allowNull: false },
  cpf: { type: DataTypes.STRING },
  modelo_veiculo: { type: DataTypes.STRING },
  placa: { type: DataTypes.STRING },
  cor: { type: DataTypes.STRING },
  motivo: { type: DataTypes.STRING },
  responsavel: { type: DataTypes.STRING },
  data_entrada: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'visitantes',
  timestamps: true,
});

Visitante.belongsTo(Usuario, {
  foreignKey: 'usuario_guarita_id',
  as: 'guarita'
});

module.exports = Visitante;
