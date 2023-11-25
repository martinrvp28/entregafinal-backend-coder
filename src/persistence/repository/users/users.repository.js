import UserDao from "../../daos/mongodb/user.dao.js";
const userDao = new UserDao();
import { logger } from "../../../utils/logger.js";

import UserResDTO from "../../dtos/users/users.res.dto.js";
import AllUsersResDTO from "../../dtos/users/allUsers.res.dto.js";

export default class UserRepository {
    constructor (){
        this.dao = userDao;
    }

    async getByIdDTO(id) { 
        try {
            const response = await this.dao.getById(id);
            return new UserResDTO(response);
        } catch (error) {
            logger.error(error);
        }
    }

    async getAllUsersDTO() {
        try {
            const response = await this.dao.getAll();
            if (!response) return false;
            else {
                const usersDTO = response.map(user => new AllUsersResDTO(user));
                return usersDTO;
            }          
        } catch (error) {
            
        }
    }

}