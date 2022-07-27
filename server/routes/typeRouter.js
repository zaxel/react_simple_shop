const Router = require('express');
const router = new Router();
const { body } = require('express-validator');
const checkRole = require('../middleware/checkRoleMiddleware');
const typeController = require('../controllers/typeController');

router.post('/', 
    // checkRole('ADMIN'), 
    typeController.create);
router.get('/', typeController.getAll);
router.put('/',
    body('name').isLength({min: 3}),
    body('id').isNumeric(),
    checkRole('ADMIN'),
    typeController.update);
router.delete('/',
    body('id').isNumeric(),
    checkRole('ADMIN'),
    typeController.delete);

module.exports = router;