const Router = require('express');
const router = new Router();
const { body, param, query } = require('express-validator');
const checkRole = require('../../middleware/checkRoleMiddleware');
const helpController = require('../../controllers/pageControllers/helpController');


router.get('/', helpController.getPage); 

router.post('/faq/',
    checkRole(['ADMIN', 'MODERATOR']), 
    body('question').isString().isLength({ min: 3 }),
    body('answerTitle').isString().isLength({ min: 3 }),
    body('answerText').isString().isLength({ min: 3 }),
    helpController.createFaq);

module.exports = router;