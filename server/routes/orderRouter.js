const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/checkout', authMiddleware, orderController.checkout);
router.get('/resolve-by-session/:session_id', authMiddleware, orderController.resolveBySession);
router.post('/', authMiddleware, orderController.create);
router.get('/',
    checkRole(['ADMIN', 'MODERATOR']), 
    orderController.getAll);
router.get('/history',
    authMiddleware, 
    orderController.getHistory);
router.delete('/',
    checkRole('ADMIN'),
    orderController.delete);

module.exports = router;