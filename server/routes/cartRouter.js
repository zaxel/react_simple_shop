const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
const correctUserIdMiddleware = require('../middleware/correctUserIdMiddleware');

router.post('/', authMiddleware, correctUserIdMiddleware, cartController.createOrUpdate);
router.get('/get', authMiddleware, correctUserIdMiddleware, cartController.getAll);
router.get('/basketId', authMiddleware, cartController.getBasketId);
router.delete('/', authMiddleware, correctUserIdMiddleware, cartController.deleteOne);

module.exports = router;