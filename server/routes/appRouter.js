const Router = require('express');
const router = new Router();
const { body, param } = require('express-validator');
const checkRole = require('../middleware/checkRoleMiddleware');
const appController = require('../controllers/appController');


router.post('/card/',
    // checkRole('ADMIN', 'MODERATOR'), 
    body('title').isString().isLength({ min: 3 }),
    body('hero').isString().isLength({ min: 5 }),
    body('link').isString().isLength({ min: 5 }),
    body('app_button_img').isString().isLength({ min: 5 }),
    body('app_button_dark_img').isString().isLength({ min: 5 }),
    body('InfoPageId').isNumeric(),
    appController.create);

router.put('/card/',
    // checkRole('ADMIN', 'MODERATOR'), 
    body('id').isNumeric(),
    body('title').optional().isString().isLength({ min: 3 }),
    body('hero').optional().isString().isLength({ min: 5 }),
    body('link').optional().isString().isLength({ min: 5 }),
    body('app_button_img').optional().isString().isLength({ min: 5 }),
    body('app_button_dark_img').optional().isString().isLength({ min: 5 }),
    body('InfoPageId').optional().isNumeric(),
    appController.update);

router.get('/card/:id',
    param('id').isNumeric(),
    appController.getSingleCard); 

router.get('/cards/',
    appController.getAllCards); 
    
router.get('/', appController.getPage); 

router.patch('/card/img-update', checkRole('ADMIN'), appController.updateCardImg);

// router.delete('/',
//     body('id').isNumeric(),
//     checkRole('ADMIN'),
//     typeController.delete);


module.exports = router;