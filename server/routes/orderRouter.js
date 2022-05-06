const Router = require('express');
const router = new Router();
const orderController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, orderController.createOrder);

module.exports = router;