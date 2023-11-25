import Services from "./class.services.js";

import UserDao from "../persistence/daos/mongodb/user.dao.js";
import ProductDaoMongoDB from "../persistence/daos/mongodb/product.dao.js";

import UserRepository from "../persistence/repository/users/users.repository.js";

const userDao = new UserDao();
const productDao = new ProductDaoMongoDB();
const userRepository = new UserRepository();

export default class UserService extends Services {
    constructor(){
        super(userDao);
    }

    async register (user) {
        try {
            return await userDao.register(user);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async login(user) {
        try {
            return await userDao.login(user);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addProdToUserCart(userId, prodId, quantity) {
        try {
            const existProd = await productDao.getById(prodId);
            if (!existProd) return false;
            return userDao.addProdToUserCart(userId,prodId, quantity);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getByIdDTO(id) {
        try {
            const prod = await userRepository.getByIdDTO(id);
            if (!prod) return false;
            else return prod;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllUsersDTO() {
        try {
            const users = await userRepository.getAllUsersDTO();
            if (!users) return false;
            else return users;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async changePremiumUser(uid, role) {
        try {
            const updatedUser = await userDao.changePremiumUser(uid, role);
            return updatedUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}