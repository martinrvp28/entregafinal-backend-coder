import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserDao from "../persistence/daos/mongodb/user.dao.js";
import { logger } from "../utils/logger.js";
const userDao = new UserDao();

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

const register = async (req, email, password, done) => {

    try {
        const user = await userDao.getByEmail(email);
        if (user) {
            logger.fatal("User register failed - Mail already registered");
            return done(null, false);
        } else {
            const newUser = await userDao.register(req.body);
            logger.info("User registered successfully")
            return done(null, newUser);
        }
        
    } catch (error) {
        logger.error(error);
    }

}


const login = async (req, email, password, done) => {

    try {

        const userLogin = await userDao.login(email, password);
        if(!userLogin) {

            logger.fatal("User login failed");
            return done(null, false);
        }
        else {

            req.session.isAuthenticated = true;
            req.session.user = userLogin;
            req.user = userLogin;
            logger.info("User logged successfully")
            return done(null, userLogin); 
        }       
    } catch (error) {
        logger.error(error);
    }

};

const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use('login', loginStrategy);
passport.use('register', registerStrategy);

passport.serializeUser((user, done)=>{
    done(null, user._id)
});

passport.deserializeUser( async (id,done) => {
    const user = await userDao.getById(id);
    return done(null, user);
});
