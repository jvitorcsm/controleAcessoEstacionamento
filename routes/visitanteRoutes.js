const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { cadastrarVisitante, listarVisitantes } = require('../controllers/visitanteController');
const registrarLog = require('../middlewares/logMiddleware');

router.use(auth);

router.post('/', cadastrarVisitante);
router.get('/', listarVisitantes);
router.post('/', registrarLog('Cadastro de visitante'), cadastrarVisitante);

module.exports = router;
