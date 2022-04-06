const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, cartController.createOrUpdate);
router.post('/get', authMiddleware, cartController.getAll);
router.delete('/', authMiddleware, cartController.deleteOne);

module.exports = router;