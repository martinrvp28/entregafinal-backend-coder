import { Router } from "express";
import UserController from "../controllers/user.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import userSession from "../middlewares/userSession.js";
import {profile} from "../controllers/views.controllers.js";



const userController = new UserController();


import passport from "passport";

const router = Router();

router.post('/register', passport.authenticate('register'), userController.registerUser.bind(userController));

router.post('/login', passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/login?error=1',
}));

router.get('/register-github', passport.authenticate('github', {scope:['user:email']}));

router.get('/profile-github', passport.authenticate('github', {scope:['user:email']}), userController.gitHubResponse.bind(userController));


router.post('/add/:idProd/quantity/:quantity', isAuth, userController.addProdToUserCart)


router.get('/profile', userSession, isAuth, profile);

router.get('/users', userController.getAllUsersDTO.bind(userController));

router.post('/users/premium/:uid', userController.changePremiumUser.bind(userController));






export default router;