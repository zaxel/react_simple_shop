const Router = require('express');
const router = new Router();
const { body, param, query } = require('express-validator');
const checkRole = require('../../middleware/checkRoleMiddleware');
const aboutController = require('../../controllers/pageControllers/aboutController');


router.get('/', aboutController.getPage); 

router.post('/card/',
    // checkRole(['ADMIN', 'MODERATOR']), 
    body('title').optional().isString().isLength({ min: 3 }),
    body('card_text').optional().isString().isLength({ min: 5 }),
    body('card_prev_text').optional().isString().isLength({ min: 5 }),
    body('button_id').optional().isArray(),
    body('infoPageId').optional().isNumeric(),
    // body('hero').optional().isString().isLength({ min: 5 }),
    aboutController.createCard);

router.put('/card/',
    // checkRole(['ADMIN', 'MODERATOR']), 
    body('id').isNumeric(),
    body('title').optional().isString().isLength({ min: 3 }),
    body('card_text').optional().isString().isLength({ min: 5 }),
    body('card_prev_text').optional().isString().isLength({ min: 5 }),
    body('button_id').optional().isArray(),
    body('infoPageId').optional().isNumeric(),
    // body('hero').optional().isString().isLength({ min: 5 }),
    aboutController.updateCard);

router.get('/card/:id',
    param('id').isNumeric(),
    aboutController.getSingleCard); 

router.get('/cards/',
    aboutController.getAllCards); 

router.patch('/card/img-update', checkRole(['ADMIN', 'MODERATOR']), aboutController.updateCardImg);

router.delete('/card/',
    body('id').isNumeric(),
    // checkRole('ADMIN'),
    aboutController.deleteCard);



router.post('/block/',
    // checkRole(['ADMIN', 'MODERATOR']), 
    body('title').optional().isString().isLength({ min: 3 }),
    body('text').optional().isString().isLength({ min: 5 }),
    // body('hero').optional().isString().isLength({ min: 5 }),
    body('button_id').optional().isArray(),
    body('infoAboutCardId').optional().isNumeric(),
    aboutController.createBlock);

router.put('/block/',
    // checkRole(['ADMIN', 'MODERATOR']), 
    body('id').isNumeric(),
    body('title').optional().isString().isLength({ min: 3 }),
    body('text').optional().isString().isLength({ min: 5 }),
    // body('hero').optional().isString().isLength({ min: 5 }),
    body('button_id').optional().isArray(),
    body('infoAboutCardId').optional().isNumeric(),
    // body('hero').optional().isString().isLength({ min: 5 }),
    aboutController.updateBlock);

router.get('/block/:id',
    param('id').isNumeric(),
    aboutController.getSingleBlock); 

router.get('/blocks/',
    aboutController.getAllBlocks); 

router.patch('/block/img-update', 
    // checkRole(['ADMIN', 'MODERATOR']), 
    aboutController.updateBlockImg);

router.delete('/block/',
    body('id').isNumeric(),
    // checkRole('ADMIN'),
    aboutController.deleteBlock);


router.post('/btn/',
    // checkRole(['ADMIN', 'MODERATOR']), 
    body('text').isString().isLength({ min: 3 }),
    body('link').optional().isString().isLength({ min: 1 }),
    aboutController.createBtn);


router.put('/btn/',
    // checkRole(['ADMIN', 'MODERATOR']), 
    body('id').isNumeric(),
    body('text').optional().isString().isLength({ min: 3 }),
    body('link').optional().isString().isLength({ min: 5 }),
    aboutController.updateBtn);

router.get('/btn',
    aboutController.getChoosedBtns); 

router.get('/btns/',
    aboutController.getAllBtns); 

router.delete('/btn/',
    // body('id').isNumeric(),
    // checkRole('ADMIN'),
    aboutController.deleteBtn);

module.exports = router;