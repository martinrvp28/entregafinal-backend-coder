import UserDao from "../persistence/daos/mongodb/user.dao.js";
import { logger } from "../utils/logger.js";

import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

const userDao = new UserDao();

export const checkAdmin = async (req,res,next) => {

    try {

        if (req.session.passport && req.session.passport.user){ 

            const user = await userDao.getById(req.session.passport.user);

            if (!user) {
                return httpResponse.Unauthorized(res, {msg: 'You are not Administrator'});
            }

            if (user.role === "admin" || user.role === "premium") return next(); 
            logger.warning('Non-admin user, trying to access a restricted sector');
            return httpResponse.Unauthorized(res, {msg: 'You are not Administrator'});

        } else {
            return httpResponse.Unauthorized(res, {msg: 'You are not Administrator'});
        }
        
    } catch (error) {
        logger.error(error);
    }
    
}