const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/from-snapshot', cartController.fromSnapshot);
router.post('/merge', authMiddleware, cartController.merge);

router.post('/items', authMiddleware, cartController.addItem);
router.get('/', authMiddleware, cartController.getAll);
router.patch('/items/:itemId', authMiddleware, cartController.updateQuantity);
router.delete('/items/:itemId', authMiddleware, cartController.deleteItem);
router.delete('/', authMiddleware, cartController.clearCart);


module.exports = router;