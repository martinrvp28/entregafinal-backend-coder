import { generateProd } from '../utils/mockProducts.utils.js';


export const createProductMock = (cant = 100) => {
    try {
        const products = [];
        for (let i=0; i < cant; i++) {
            const prod = generateProd();
            products.push(prod);
        }
        
        return products;
        
    } catch (error) {
        throw new Error(error.message);
    }
}
