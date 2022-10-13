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
router.get('/question/',
    helpController.getQuestion);
router.delete('/faq/',
    checkRole('ADMIN'),
    body('id').isNumeric(),
    helpController.deleteFaq);

router.get('/category/',
    query('id').optional().isNumeric(),
    helpController.getCategory);
router.post('/category/',
    checkRole(['ADMIN', 'MODERATOR']), 
    body('title').isString().isLength({ min: 3 }),
    body('link').optional().isString().isLength({ min: 5 }),
    body('order_id').isNumeric(),
    helpController.createCategory); 


router.put('/category/',
    checkRole(['ADMIN', 'MODERATOR']), 
    body('id').isNumeric(),
    body('title').optional().isString().isLength({ min: 3 }),
    body('link').optional().isString().isLength({ min: 3 }),
    helpController.updateCategory); 
router.patch('/category/img-update/',
    checkRole(['ADMIN', 'MODERATOR']), 
    body('id').isNumeric(),
    helpController.changeCategoryImg); 

router.delete('/category/',
    checkRole(['ADMIN']), 
    body('catPositions').isArray(),
    body('id').isNumeric(),
    helpController.deleteCategory); 

    
router.get('/related/',
    query('id').isNumeric(),
    helpController.getRelated);
router.post('/related/',
    checkRole(['ADMIN', 'MODERATOR']),
    body('faq_id').isNumeric(),
    body('infoHelpQuestionId').isNumeric(),
    helpController.addRelated);
router.delete('/related/',
    checkRole(['ADMIN']),
    body('faq_id').isNumeric(),
    body('infoHelpQuestionId').isNumeric(),
    helpController.deleteRelated); 

module.exports = router;