﻿const Router = require('express');
const router = new Router();
const { body, param } = require('express-validator');
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
    aboutController.update);

// router.get('/card/:id',
//     param('id').isNumeric(),
//     appController.getSingleCard); 

// router.get('/cards/',
//     appController.getAllCards); 
    


// router.patch('/card/img-update', checkRole(['ADMIN', 'MODERATOR']), appController.updateCardImg);

// router.delete('/',
//     body('id').isNumeric(),
//     checkRole('ADMIN'),
//     typeController.delete);



router.post('/block/',
    // checkRole(['ADMIN', 'MODERATOR']), 
    body('title').optional().isString().isLength({ min: 3 }),
    body('text').optional().isString().isLength({ min: 5 }),
    // body('hero').optional().isString().isLength({ min: 5 }),
    body('button_id').optional().isArray(),
    body('infoAboutCardId').isNumeric(),
    aboutController.createBlock);

module.exports = router;