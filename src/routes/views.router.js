import { Router } from "express";
import { __dirname } from "../utils.js";
import ProductManager from "../managers/productManager.js";
import {login, register, errorLogin, errorRegister, profile} from "../controllers/views.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import { logger } from "../utils/logger.js";

import UserDao from "../persistence/daos/mongodb/user.dao.js";
const userDao = new UserDao();




const router = Router();

const productManager = new ProductManager(__dirname + '/db/products.json');

router.get('/', async (req,res) => {

    try {
        const products = await service.getAll();
        res.render('home', {products})
    } catch (error) {
        logger.error(error.message);
    }
    
});

router.get('/realtimeproducts', (req,res) => {

    res.render('realTimeProducts')

});

router.get('/login',login);
router.get('/register',register);
router.get('/error-login',errorLogin);
router.get('/error-register',errorRegister);

router.get('/logout', async (req, res) => {
    
    try {
        if (req.session && req.session.passport && req.session.passport.user) {

            const userInfo = await userDao.getById(req.session.passport.user);
            await userDao.updateLastConnection(userInfo.email);
            req.session.destroy();
            logger.info('User logged out');
        }
        
        res.redirect('/login');
    } catch (error) {
        logger.error(error.message);
    }
});


export default router;