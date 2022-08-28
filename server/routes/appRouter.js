const Router = require('express');
const router = new Router();
const { body, param } = require('express-validator');
const checkRole = require('../middleware/checkRoleMiddleware');
const appController = require('../controllers/appController');


router.post('/',
    // checkRole('ADMIN', 'MODERATOR'), 
    body('title').isString().isLength({ min: 3 }),
    body('hero').isString().isLength({ min: 5 }),
    body('link').isString().isLength({ min: 5 }),
    body('app_button_img').isString().isLength({ min: 5 }),
    body('app_button_dark_img').isString().isLength({ min: 5 }),
    body('InfoPageId').isNumeric(),
    appController.createCard);


// router.delete('/',
//     body('id').isNumeric(),
//     checkRole('ADMIN'),
//     typeController.delete);


module.exports = router;