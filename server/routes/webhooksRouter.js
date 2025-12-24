const Router = require('express');
const router = new Router();
const { body } = require('express-validator');
const checkRole = require('../middleware/checkRoleMiddleware');
const typeController = require('../controllers/typeController');
const authMiddleware = require('../middleware/authMiddleware');
const stripeHookController = require('../controllers/stripeHookController');

router.post('/stripe', 
    Router.raw({ type: 'application/json' }),
    stripeHookController.stripe);


module.exports = router;