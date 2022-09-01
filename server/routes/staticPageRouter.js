﻿const Router = require('express');
const router = new Router();
const { body, query } = require('express-validator');
const checkRole = require('../middleware/checkRoleMiddleware');
const StaticPageController = require('../controllers/StaticPageController');

router.post('/',
    checkRole('ADMIN', 'MODERATOR'), 
    body('name').isString().isLength({ min: 3 }),
    body('title').optional().isArray(),
    body('img').optional().isArray(),
    body('text').optional().isArray(),
    body('link').optional().isArray(),
    body('button_id').optional().isArray(),
    StaticPageController.create);

router.put('/',
    checkRole('ADMIN', 'MODERATOR'), 
    body('id').isNumeric(),
    body('name').optional().isString().isLength({ min: 3 }),
    body('title').optional().isArray(),
    body('img').optional().isArray(),
    body('text').optional().isArray(),
    body('link').optional().isArray(),
    body('button_id').optional().isArray(),
    StaticPageController.update);

router.get('/',
    query('id').optional().isNumeric(),
    query('name').optional().isString().isLength({ min: 3 }),
    StaticPageController.getPage); 


// router.delete('/',
//     body('id').isNumeric(),
//     checkRole('ADMIN'),
//     typeController.delete);


module.exports = router;