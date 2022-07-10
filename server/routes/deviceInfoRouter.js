const Router = require('express');
const { body } = require('express-validator');
const router = new Router();
const deviceInfoController = require('../controllers/deviceInfoController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/:deviceId', deviceInfoController.getInfo);

module.exports = router;