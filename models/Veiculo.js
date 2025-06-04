const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Veiculo = sequelize.define('Veiculo', {
  modelo: { type: DataTypes.STRING, allowNull: false },
  placa: { type: DataTypes.STRING, allowNull: false, unique: true },
  cor: { type: DataTypes.STRING },
}, {
  tableName: 'veiculos',
  timestamps: true,
});

Veiculo.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'proprietario'
});

module.exports = Veiculo;
