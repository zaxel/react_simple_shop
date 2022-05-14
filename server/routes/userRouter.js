const Router = require('express');
const { body } = require('express-validator');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 32}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', authMiddleware, userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/auth', userController.refresh);

module.exports = router;