const Router = require('express');
const { body } = require('express-validator');
const router = new Router();
const deviceController = require('../controllers/deviceController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), deviceController.create);
router.post('/bulk', checkRole('ADMIN'), deviceController.createBulk);
router.get('/', deviceController.getAll);
router.get('/random', deviceController.getRandom);
router.get('/:id', deviceController.getSingle);
router.put('/',
    body('typeId').optional().isNumeric(),
    body('rate').optional().isNumeric(),
    checkRole('ADMIN'), 
    deviceController.update);

module.exports = router;