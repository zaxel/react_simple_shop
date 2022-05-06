const Router = require('express');
const router = new Router();

const deviceRouter = require('./deviceRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const orderRouter = require('./orderRouter');

router.use('/user', userRouter);
router.use('/device', deviceRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);

module.exports = router;