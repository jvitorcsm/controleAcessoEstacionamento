const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./config/database');
const Usuario = require('./models/Usuario');

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const veiculoRoutes = require('./routes/veiculoRoutes');
app.use('/api/veiculos', veiculoRoutes);

const registroAcessoRoutes = require('./routes/registroAcessoRoutes');
app.use('/api/acessos', registroAcessoRoutes);

const visitanteRoutes = require('./routes/visitanteRoutes');
app.use('/api/visitantes', visitanteRoutes);

const logAdminRoutes = require('./routes/logAdminRoutes');
app.use('/api/logs', logAdminRoutes);

require('dotenv').config();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API do Estacionamento 🚗');
});

// Inicializar banco
sequelize.sync({ alter: true }).then(() => {
  console.log('Banco sincronizado com sucesso!');
}).catch(err => {
  console.error('Erro ao conectar ao banco:', err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
