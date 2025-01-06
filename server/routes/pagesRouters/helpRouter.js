const Router = require('express');
const router = new Router();
const { body, param, query } = require('express-validator');
const checkRole = require('../../middleware/checkRoleMiddleware');
const helpController = require('../../controllers/pageControllers/helpController');


router.get('/', helpController.getPage);

router.get('/faqs/', helpController.getFaqs);

router.get('/singlefaq/:faqName',
    helpController.getSingleFaq); 
router.get('/faq/',
    query('id').optional().isNumeric(),
    helpController.getFaq); 

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
    body('catNewFaqData.infoHelpCategoryId').optional({ nullable: true }).isNumeric(),
    body('catNewFaqData.fromCategoryId').optional().isNumeric(),
    body('catNewFaqData.order_id').optional({ nullable: true }).isNumeric(),
    body('catNewFaqData.positions').optional(),
    helpController.updateFaqQuestion);

router.get('/question/',
    query('categoryId').optional().isNumeric(),
    query('page').optional().isNumeric(),
    query('limit').optional().isNumeric(),
    query('categories').optional().isString(),
    helpController.getQuestion);
router.delete('/faq/',
    checkRole('ADMIN'),
    body('id').isNumeric(),
    helpController.deleteFaq);
router.put('/faq/position/',
    checkRole(['ADMIN', 'MODERATOR']), 
    body('positions').isArray(),
    body('categoryId').isNumeric(),
    helpController.changeFaqPosition); 

router.get('/search/',
    query('searchPhrase').optional().isString(),
    query('page').optional().isNumeric(),
    query('limit').optional().isNumeric(),
    query('categories').optional().isString(),
    helpController.getFaqSearch);

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
router.put('/category/position/',
    checkRole(['ADMIN', 'MODERATOR']), 
    body('positions').isArray(),
    helpController.changeCatPosition); 


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


router.get('/popular/', helpController.getPopular); 
router.post('/popular/',
    checkRole(['ADMIN', 'MODERATOR']),
    body('id').isNumeric(),
    helpController.createPopular);

module.exports = router;