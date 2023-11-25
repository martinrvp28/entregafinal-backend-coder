import fs from 'fs';
import { __dirname } from '../utils.js';
import ProductManager from "./productManager.js";

import { logger } from '../utils/logger.js';

const productManager = new ProductManager(__dirname + '/src/db/products.json');

export default class CartManager{
    constructor(path){
        this.path = path;
    }

async getAllCarts(){
    try {
        if(fs.existsSync(this.path)){
            const carts = await fs.promises.readFile(this.path, 'utf8');
            const cartsJSON = JSON.parse(carts);
            return cartsJSON;
        } else {
            return [];
        }
        
    } catch (error) {
        logger.error(error);
    }
};

async createCart(){
    try {

        const cart = {
            id: await this.#getMaxId() +1,
            products: []
        };

        const cartsFile = await this.getAllCarts();
        cartsFile.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
        return cart;

    } catch (error) {
        logger.error(error);
    }
    
}

async getCartById(id) {

    try {
        const carts = await this.getAllCarts();
        const cart = carts.find((p) => p.id === id);

        if (!cart) {
            return false;
        } else {
            return cart;
        }
        
    } catch (error) {
        logger.error(error);
    }
}

async addProductToCart(idCart,idProd) {

    try {
        const cartsFile = await this.getAllCarts();      
        const cartExist = await this.getCartById(idCart);
        const prodCheck = await productManager.getProductById(idProd);

        if (prodCheck){

            if (cartExist) {
                const prodExist = cartExist.products.find(p => p.id === idProd);
                
                if (prodExist){
                    prodExist.quantity = prodExist.quantity+1;
                    
                } else {
                    const prod = {
                        id: idProd,
                        quantity: 1,
                    }
                    
                    cartExist.products.push(prod);
                }
            
                
                const newCartFile = cartsFile.map(cart =>{
                    if (cart.id === idCart) return cartExist;
                    else return cart
                })

                
                await fs.promises.writeFile(this.path, JSON.stringify(newCartFile));
            
            return cartsFile;
            }
        } else {
            throw new Error('product not found')
        }

    } catch (error) {
        logger.error(error);
    }
}

async #getMaxId(){
    try {
        const cartsFile = await this.getAllCarts();
        let maxId=0;
        cartsFile.map((p) => {
            if (p.id > maxId) maxId = p.id;
        })

        return maxId;
        
    } catch (error) {
        logger.error(error);
    }

}




}


