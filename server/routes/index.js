const Router = require('express');
const router = new Router();

const deviceRouter = require('./deviceRouter');
const deviceInfoRouter = require('./deviceInfoRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const orderRouter = require('./orderRouter');
const orderDetailRouter = require('./orderDetailRouter');

const staticPageRouter = require('./pagesRouters/staticPageRouter');
const appRouter = require('./pagesRouters/appRouter');
const aboutRouter = require('./pagesRouters/aboutRouter');

router.use('/user', userRouter);
router.use('/device', deviceRouter);
router.use('/device/info/', deviceInfoRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);
router.use('/order/details', orderDetailRouter);

router.use('/page', staticPageRouter);
router.use('/app', appRouter);
router.use('/about', aboutRouter);

module.exports = router;