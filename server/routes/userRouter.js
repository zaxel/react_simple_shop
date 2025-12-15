const Router = require('express');
const { body } = require('express-validator');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');
const correctUserAddressMiddleware = require('../middleware/correctUserAddressMiddleware');
const addressController = require('../controllers/addressController');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 32}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/check', authMiddleware, userController.refresh);
router.get('/refresh', userController.refresh);
router.get('/', checkRole(['ADMIN', 'MODERATOR']), userController.getAll);
router.put('/',
    body('email').optional().isEmail(),
    body('role').optional().isLength({min: 4, max: 15}),
    body('is_activated').optional().isLength({min: 4, max: 5}),
    checkRole('ADMIN'),
    userController.update);
router.delete('/',
    checkRole('ADMIN'),
    userController.delete);

router.get('/:userId/addresses', authMiddleware, correctUserAddressMiddleware, addressController.get);
router.post('/:userId/addresses', authMiddleware, correctUserAddressMiddleware, addressController.add);
router.patch('/:userId/addresses/:addressId', authMiddleware, addressController.update);
router.delete('/:userId/addresses/:addressId', authMiddleware, addressController.delete);
router.patch('/:userId/addresses/:addressId/default', authMiddleware, addressController.setDefault);




module.exports = router;