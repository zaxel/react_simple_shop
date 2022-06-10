const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', authMiddleware, orderController.create);
router.get('/',
    checkRole(['ADMIN', 'MODERATOR']), 
    orderController.getAll);
router.delete('/',
    checkRole('ADMIN'),
    orderController.delete);

module.exports = router;