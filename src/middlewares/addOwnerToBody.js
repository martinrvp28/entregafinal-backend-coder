import UserDao from "../persistence/daos/mongodb/user.dao.js";
import { logger } from "../utils/logger.js";

import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

const userDao = new UserDao();

export const addOwnerToBody = async (req,res,next) => {

    try {
        const user = await userDao.getById(req.session.passport.user);
        req.body.owner = user.email;
        next();
        
    } catch (error) {
        logger.error(error);
    }
    
}