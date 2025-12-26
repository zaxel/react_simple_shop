require('dotenv').config();
const searchable = require('./migrations/search/searchable');
const express = require('express');
const sequelize = require('./db');
const params = require('./migrations/search/params');
// const models = require('./models/models');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 5000;
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const webhooksRouter = require('./routes/webhooksRouter');


const app = express();
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api/webhook', webhooksRouter);
app.use(express.json());
app.use('/api', router);

//error handler must be last middleware
app.use(errorHandler);


const start = async()=>{
    console.log('Stripe key is', process.env.STRIPE_SECRET_KEY ? 'FOUND' : 'MISSING');
    try{
        await sequelize.authenticate();
        if (process.env.DB_SYNC === 'true')
            await sequelize.sync({ alter: true });
        if (process.env.DB_SEARCHABLE === 'true')
            await searchable.up(params); //migration (up || down)
        app.listen(PORT, ()=>console.log(`server started on port ${PORT}`));
    }catch(e){
        console.log(e)
    }
}

start();