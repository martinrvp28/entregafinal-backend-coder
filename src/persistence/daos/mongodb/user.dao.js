import MongoDao from "./mongo.dao.js";
import { UserModel } from "./models/user.model.js";
import { createHash, isValidPassword } from "../../../utils.js";
import { logger } from "../../../utils/logger.js";
import { sendGmail } from "../../../controllers/email.controller.js";

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
                else {
                    await this.updateLastConnection(email);
                    return userExist;
                }

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
    
            const existingProductIndex = user.cart.findIndex(item => item.product.toString() === prodId.toString());
    
            if (existingProductIndex !== -1) {
            
                user.cart[existingProductIndex].quantity += quantity;
            } else {
                
                user.cart.push({
                    product: prodId,
                    quantity
                });
            }
    
            await user.save();
            return user;
        } catch (error) {
            logger.error(error);
        }
    }

    async changePremiumUser(uid, newRole) {
        try {
            const response = await this.model.updateOne(
                { _id: uid },
                { $set: { ["role"]: newRole } }
                );
            return response;
                            
        } catch (error) {
            logger.error(error);
        }
    }

    async updateLastConnection(userEmail){

        const newDate = new Date();
        await this.model.updateOne(
            {email: userEmail},
            {$set:{["last_connection"]: newDate}}
        );
    }

    async deleteInactiveUsers() {
        try {

            const compareDate = new Date();
            compareDate.setDate(compareDate.getDate() - 2);
            const compareDateUTC = compareDate.toISOString();

            const deletedUsers = await UserModel.find({ last_connection: { $lt: compareDateUTC }});
            
            for (const user of deletedUsers) {
                try {
                    await sendGmail(user.email, user.first_name);
                } catch (error) {
                    console.error(`Error al enviar correo a ${emailUsuario}:`, error);
                }
            }

            const resultado = await UserModel.deleteMany({ last_connection: { $lt: compareDateUTC }});
            return resultado;


        } catch (error) {
            logger.error(error);
        }
    }


}