const Router = require('express');
const router = new Router();
const { body } = require('express-validator');
const checkRole = require('../middleware/checkRoleMiddleware');
const appController = require('../controllers/appController');

router.post('/', 
    // checkRole('ADMIN', 'MODERATOR'), 
    body('name').isString().isLength({min: 3}),
    body('title').optional().isArray(),
    body('img').optional().isArray(),
    body('text').optional().isArray(),
    body('link').optional().isArray(),
    body('button_id').optional().isArray(),
    appController.create);

    
router.post('/card/', 
    // checkRole('ADMIN', 'MODERATOR'), 
    appController.createCard);

// router.get('/', appController.getAll);

// router.put('/',
//     body('name').isLength({min: 3}),
//     body('id').isNumeric(),
//     checkRole('ADMIN'),
//     typeController.update);
// router.delete('/',
//     body('id').isNumeric(),
//     checkRole('ADMIN'),
//     typeController.delete);


module.exports = router;