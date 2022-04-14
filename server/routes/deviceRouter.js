const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), deviceController.create);
router.post('/bulk', checkRole('ADMIN'), deviceController.createBulk);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getSingle);

module.exports = router;