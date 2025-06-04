const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { cadastrar, listar, atualizar, excluir } = require('../controllers/veiculoController');
const registrarLog = require('../middlewares/logMiddleware');

router.use(auth); // todas as rotas abaixo requerem token

router.post('/', cadastrar);
router.get('/', listar);
router.put('/:id', atualizar);
router.delete('/:id', excluir);
router.delete('/:id', registrarLog('Exclusão de veículo'), excluir);

module.exports = router;
