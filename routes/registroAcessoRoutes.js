const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { registrarEntrada, registrarSaida, listarRegistros } = require('../controllers/registroAcessoController');
const registrarLog = require('../middlewares/logMiddleware');

router.use(auth);

router.post('/entrada', registrarEntrada);
router.post('/saida', registrarSaida);
router.get('/', listarRegistros);
router.post('/entrada', registrarLog('Registro de entrada'), registrarEntrada);
router.post('/saida', registrarLog('Registro de saída'), registrarSaida);

module.exports = router;
