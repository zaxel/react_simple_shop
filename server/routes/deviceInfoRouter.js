const Router = require('express');
const { body } = require('express-validator');
const router = new Router();
const deviceInfoController = require('../controllers/deviceInfoController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), deviceInfoController.createBulk);
router.get('/:deviceId', deviceInfoController.getInfo);
router.put('/',
    body('description').optional().isLength({min: 1}),
    body('title').optional().isLength({min: 1}),
    checkRole('ADMIN'), 
    deviceInfoController.update);
router.delete('/',
    checkRole('ADMIN'),
    deviceInfoController.delete);
module.exports = router;