import MongoDao from "./mongo.dao.js";
import { UserModel } from "./models/user.model.js";
import { createHash, isValidPassword } from "../../../utils.js";
import { logger } from "../../../utils/logger.js";

export default class UserDao extends MongoDao {
    constructor(){
        super(UserModel);
    }

    async register(user){
        try {
            const {email, password} = user;
            const existUser = await this.getByEmail(email);
            if(!existUser){
                const newUser = await UserModel.create({
                    ...user,
                    password: createHash(password)
                });
                return newUser;
            }
            else return false;
        } catch (error) {
            logger.error(error);
        }
    }

    async login(email, password){

        try {
            const userExist = await this.getByEmail(email);

            if (userExist) {
                const passValid = isValidPassword(password, userExist);
                if (!passValid) return false;
                else return userExist;

            } 
            else return false;
        } catch (error) {
            logger.error(error);
        }
        
    }

    async getByEmail(email){
        try {
            const userExist = await UserModel.findOne({email});
            if (userExist){
                return userExist;
            } else return false;
        } catch (error) {
            logger.error(error);
        }
    }

    async addProdToUserCart(userId, prodId, quantity) {
        try {
            const user = await UserModel.findById(userId);
            if (!user) return false;
            user.cart.push({
                product: prodId,
                quantity
            })
            user.save();
            return user;
        } catch (error) {
            logger.error(error);
        }
    }

    async changePremiumUser(uid, newRole) {
        try {
            console.log('llegamos al dao change premium user')
            const response = await this.model.updateOne(
                { _id: uid },
                { $set: { ["role"]: newRole } } 
                );
            return response;
                            
        } catch (error) {
            logger.error(error);
        }
    }


}