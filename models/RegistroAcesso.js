const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Veiculo = require('./Veiculo');

const RegistroAcesso = sequelize.define('RegistroAcesso', {
  data_hora_entrada: {
    type: DataTypes.DATE,
    allowNull: true
  },
  data_hora_saida: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('entrada', 'saida'),
    allowNull: false
  }
}, {
  tableName: 'registros_acesso',
  timestamps: true
});

RegistroAcesso.belongsTo(Veiculo, {
  foreignKey: 'veiculo_id',
  as: 'veiculo'
});

module.exports = RegistroAcesso;
