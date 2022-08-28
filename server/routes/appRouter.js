const Router = require('express');
const router = new Router();
const { body } = require('express-validator');
const checkRole = require('../middleware/checkRoleMiddleware');
const appController = require('../controllers/appController');

router.post('/',
    // checkRole('ADMIN', 'MODERATOR'), 
    body('name').isString().isLength({ min: 3 }),
    body('title').optional().isArray(),
    body('img').optional().isArray(),
    body('text').optional().isArray(),
    body('link').optional().isArray(),
    body('button_id').optional().isArray(),
    appController.create);

router.put('/',
    // checkRole('ADMIN', 'MODERATOR'), 
    body('id').isNumeric(),
    body('name').optional().isString().isLength({ min: 3 }),
    body('title').optional().isArray(),
    body('img').optional().isArray(),
    body('text').optional().isArray(),
    body('link').optional().isArray(),
    body('button_id').optional().isArray(),
    appController.update);




router.post('/card/',
    // checkRole('ADMIN', 'MODERATOR'), 
    appController.createCard);



// router.get('/', appController.getAll);



// router.delete('/',
//     body('id').isNumeric(),
//     checkRole('ADMIN'),
//     typeController.delete);


module.exports = router;