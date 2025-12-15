const Router = require('express');
const router = new Router();
const ordersDetailsController = require('../controllers/ordersDetailsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:orderId',
    authMiddleware, 
    ordersDetailsController.getOrderDescriptions);

module.exports = router;