const Router = require('express');
const { body } = require('express-validator');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

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
    userController.update);
module.exports = router;