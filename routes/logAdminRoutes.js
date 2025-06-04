const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { listarLogs } = require('../controllers/logAdminController');

router.use(auth);
router.get('/', listarLogs);

module.exports = router;
