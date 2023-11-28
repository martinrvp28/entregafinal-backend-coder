import { logger } from "../../../utils/logger.js";
import {sendGmailProduct} from "../../../controllers/email.controller.js"

export default class MongoDao {
    constructor(model){
        this.model = model;
    }

    async getAll(){
        try {
            const response = await this.model.find({});
            return response;
        } catch (error) {
            logger.error(error);
        }
    }

    async getById(id) {
        try {
            const response = await this.model.findById(id);
            if (response) return response;
            else return false; 
        } catch (error) {
            logger.error(error);
        }
    }

    async create(obj) {
        try {
            const response = await this.model.create(obj);
            return response;
            
        } catch (error) {
            logger.error(error);
        }
    }

    async update(id,obj) {
        try {
            const response = await this.model.updateOne({ _id: id }, obj);
            return response;
        } catch (error) {
            logger.error(error);
        }
    }

    async delete(id) {

        try {

            const response = await this.model.findByIdAndDelete(id);

            if (response) {
                if ((response.owner) && (response.owner !== "admin")){
                    await sendGmailProduct(response.owner, response.title);
                }
            }

            return response;
        } catch (error) {
            logger.error(error);
        }
    }

}