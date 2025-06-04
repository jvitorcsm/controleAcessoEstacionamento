const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  senha: { type: DataTypes.STRING, allowNull: false },
  tipo: { type: DataTypes.ENUM('aluno', 'colaborador', 'guarita'), allowNull: false },
  cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
  celular: { type: DataTypes.STRING },
  nome_mae: { type: DataTypes.STRING },
  endereco: { type: DataTypes.STRING },
  cnh: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('ativo', 'bloqueado'), defaultValue: 'ativo' }
}, {
  tableName: 'usuarios',
  timestamps: true,
});

module.exports = Usuario;
