const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const generateToken = require('../utils/generateToken');

const cadastrar = async (req, res) => {
  try {
    const { nome, email, senha, tipo, cpf } = req.body;

    const emailExistente = await Usuario.findOne({ where: { email } });
    if (emailExistente) return res.status(400).json({ error: 'Email já cadastrado.' });

    const hash = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.create({ nome, email, senha: hash, tipo, cpf });

    res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cadastrar', detalhe: err.message });
  }
};

const login = async (req, res) => {
  try {
    console.log('REQ.BODY:', req.body);
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    console.log('USUÁRIO:', usuario);

    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    console.log('Senha válida?', senhaValida);

    if (!senhaValida) return res.status(401).json({ error: 'Senha incorreta' });

    const token = generateToken(usuario.id);
    res.status(200).json({ token, usuario: { id: usuario.id, nome: usuario.nome, tipo: usuario.tipo } });
  } catch (err) {
    console.error('ERRO LOGIN:', err);
    res.status(500).json({ error: 'Erro ao fazer login', detalhe: err.message });
  }
};

module.exports = { cadastrar, login };
