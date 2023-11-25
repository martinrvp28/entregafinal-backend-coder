import Services from "./class.services.js";

import ProductDaoMongoDB from "../persistence/daos/mongodb/product.dao.js";

const prodDao = new ProductDaoMongoDB();

export default class ProductService extends Services {
    constructor(){
        super(prodDao);
    }

    async getAllProducts(limit,sort,page,query,queryValue) {

        try {
            const response = await prodDao.getAllProducts(limit,sort,page,query,queryValue);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}



