const Router = require('express');
const router = new Router();
const checkRole = require('../middleware/checkRoleMiddleware');
const typeController = require('../controllers/typeController');

router.post('/', checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAll);

module.exports = router;