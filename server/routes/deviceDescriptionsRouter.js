const Router = require('express');
const { body } = require('express-validator');
const router = new Router();
const deviceDescriptionsController = require('../controllers/deviceDescriptionsController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/:deviceId', deviceDescriptionsController.getDescriptions);

module.exports = router;