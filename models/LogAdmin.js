const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const LogAdmin = sequelize.define('LogAdmin', {
  acao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'logs_administrativos',
  timestamps: false
});

LogAdmin.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'autor'
});

module.exports = LogAdmin;
