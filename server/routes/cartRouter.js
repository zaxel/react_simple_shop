const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, cartController.createOrUpdate);
router.get('/', authMiddleware, cartController.get);

module.exports = router;