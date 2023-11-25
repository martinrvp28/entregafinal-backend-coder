import express, {json, urlencoded} from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import { __dirname } from "./utils.js";
import { Server } from 'socket.io';
import ProductManager from './managers/productManager.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import MainRouter from './routes/index.js';
const mainRouter = new MainRouter();

import passport from 'passport';
import './passport/local-strategy.js'
import './passport/github-strategy.js'

import config from '../config.js';

import { logger } from './utils/logger.js';

import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { info } from './docs/info.js';

const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: config.MONGO_ATLAS_URL,
        crypto: {
            secret: config.SECRET_KEY_JWT
        }
    }),
    secret: config.SECRET_KEY_JWT,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}

import './persistence/daos/mongodb/connection.js';
import userSession from './middlewares/userSession.js';

const productManager = new ProductManager(__dirname + '/db/products.json');

const app = express();

const specs = swaggerJSDoc(info);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(json())
    .use(urlencoded({extended: true}))
    .use(express.static(__dirname + '/public'))
    .use(morgan('dev'))

    .use(cookieParser())
    .use(session(mongoStoreOptions))
    .use(userSession)

    .use(passport.initialize())
    .use(passport.session())

    .engine('handlebars', handlebars.engine())
    .set('views', __dirname + '/views')
    .set('view engine', 'handlebars')

    app.use('/', mainRouter.getRouter());
    app.use(errorHandler);

const PORT = config.PORT ;

const httpServer = app.listen(PORT, ()=> {
    logger.info(`Server running on port ${PORT}`)
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {


    socket.emit('allProducts', await productManager.getProducts());

    socket.on('disconnect', () =>{
        logger.info(`Cliente Desconectado: ${socket.id}`)
    })

    socket.on('newProduct', async (prod) => {
        const add = await productManager.addProduct(prod);
        socketServer.emit('allProducts', await productManager.getProducts());
    })

    socket.on('deleteProd', async (id) => {

        const del = await productManager.deleteProduct(id);
        socketServer.emit('allProducts', await productManager.getProducts());
    })


});