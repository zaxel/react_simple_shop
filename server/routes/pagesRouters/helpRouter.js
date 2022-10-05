const Router = require('express');
const router = new Router();
const { body, param, query } = require('express-validator');
const checkRole = require('../../middleware/checkRoleMiddleware');
const helpController = require('../../controllers/pageControllers/helpController');


router.get('/', helpController.getPage); 


module.exports = router;