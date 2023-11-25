import MongoDao from "./mongo.dao.js";
import { ProductModel } from "./models/product.model.js";
import { logger } from "../../../utils/logger.js";

export default class ProductDaoMongoDB extends MongoDao {
    constructor() {
        super(ProductModel);
    }

    async getAllProducts
    (
        limit = 10,
        sort = null,
        page = 1,
        query = null,
        queryValue = null
        ){

        try {

            const order = sort === 'desc' ? -1 : 1;
            
            let filterOps;
            if ( query && queryValue ) {

                if (query === "status"){

                    if (queryValue.toLowerCase() === "true") {
                        queryValue = true;
                    } else if(queryValue.toLowerCase() === "false") 
                        queryValue = false;

                    filterOps = { [query]: queryValue };

                } else filterOps = { [query]: { $regex: queryValue, $options: 'i' } };
                
            }
    
            const response = await ProductModel.paginate(filterOps, {
                lean: true,
                limit: limit,
                page: page,
                sort: order !== null ? { price: order } : undefined
            });

            return response;

        } catch (error) {
            logger.error(error);
        }
    }


    async getProductByCode (code) {
        try {
            const response = await ProductModel.findOne({ code });
            return response;
        } catch (error) {
            return false;
        }
    };

    async create(obj) {
        try {
            const existingProduct = await this.getProductByCode(obj.code);
    
            if (existingProduct === null) {
                const response = await ProductModel.create(obj);
                return response;
            } else {
                throw new Error('Ya existe un producto con el mismo código');
            }
        } catch (error) {
            logger.error(error);
        }
    }

}