const Router = require('express');
const router = new Router();
const { body, param, query } = require('express-validator');
const checkRole = require('../../middleware/checkRoleMiddleware');
const helpController = require('../../controllers/pageControllers/helpController');


router.get('/', helpController.getPage);

router.get('/faqs/', helpController.getFaqs); 

router.post('/faq/',
    checkRole(['ADMIN', 'MODERATOR']), 
    body('question').isString().isLength({ min: 3 }),
    body('answerTitle').isString().isLength({ min: 3 }),
    body('answerText').isString().isLength({ min: 3 }),
    helpController.createFaq);

router.put('/answer/',
    checkRole(['ADMIN', 'MODERATOR']), 
    body('id').isNumeric(),
    body('text').optional().isString().isLength({ min: 3 }),
    body('title').optional().isString().isLength({ min: 3 }),
    helpController.updateFaqAnswer);
router.put('/question/',
    checkRole(['ADMIN', 'MODERATOR']), 
    body('id').isNumeric(),
    body('question').optional().isString().isLength({ min: 3 }),
    helpController.updateFaqQuestion);
    

module.exports = router;