const Router = require('express');
const router = new Router();
const { body } = require('express-validator');
const brandController = require('../controllers/brandController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', 
    checkRole('ADMIN'), 
    brandController.create);
router.get('/', brandController.getAll);
router.put('/',
    body('name').isLength({min: 3}),
    body('id').isNumeric(),
    checkRole('ADMIN'),
    brandController.update);
router.delete('/',
    body('id').isNumeric(),
    checkRole('ADMIN'),
    brandController.delete);

module.exports = router;