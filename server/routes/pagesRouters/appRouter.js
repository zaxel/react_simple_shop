const Router = require('express');
const router = new Router();
const { body, param } = require('express-validator');
const checkRole = require('../../middleware/checkRoleMiddleware');
const appController = require('../../controllers/pageControllers/appController');


router.post('/card/',
    checkRole(['ADMIN', 'MODERATOR']), 
    body('title').isString().isLength({ min: 3 }),
    body('hero').isString().isLength({ min: 5 }),
    body('link').isString().isLength({ min: 5 }),
    body('app_button_img').isString().isLength({ min: 5 }),
    body('app_button_dark_img').isString().isLength({ min: 5 }),
    body('InfoPageId').isNumeric(),
    appController.create);

router.put('/card/',
    checkRole(['ADMIN']), 
    body('id').isNumeric(),
    body('title').optional().isString().isLength({ min: 3 }),
    body('hero').optional().isString().isLength({ min: 5 }),
    body('link').optional().isURL().isLength({ min: 5 }),
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

router.patch('/card/img-update', checkRole(['ADMIN']), appController.updateCardImg);


module.exports = router;