const Router = require('express');
const { body } = require('express-validator');
const router = new Router();



const ordersDetailsController = require('../controllers/ordersDetailsController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/:orderId',
    // checkRole(['ADMIN', 'MODERATOR']), 
    ordersDetailsController.getOrderDescriptions);

module.exports = router;