const Router = require('express');
const { body } = require('express-validator');
const router = new Router();
const deviceInfoController = require('../controllers/deviceInfoController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/:deviceId', deviceInfoController.getInfo);
router.put('/',
    body('description').optional().isLength({min: 1}),
    body('title').optional().isLength({min: 1}),
    checkRole('ADMIN'), 
    deviceInfoController.update);

module.exports = router;