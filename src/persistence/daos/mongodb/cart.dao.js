import MongoDao from "./mongo.dao.js";
import { CartModel } from "./models/cart.model.js";
import { logger } from "../../../utils/logger.js";

export default class CartDaoMongoDB extends MongoDao {
    constructor() {
        super(CartModel);
    }

    async getCartById(id){

        try {
            const response = await CartModel.findById(id).lean().populate('products.id');
            return response;
        } catch (error) {
            logger.error(error);
        }
    }

    async addProductToCart(idCart,idProd){

        try {
            
            const cart = await CartModel.findById(idCart);
            if (cart){

                const prodExists = cart.products.find(p => p.id.toString() === idProd.toString());
                if(prodExists){
                    
                    prodExists.quantity = prodExists.quantity + 1;
                    cart.markModified('products');

                } else {

                    const newProd = {
                        id: idProd,
                        quantity: 1
                    }

                    cart.products.push(newProd);
                }

                await cart.save();
                return cart;

            } else return false;


        } catch (error) {
            logger.error(error);
        }
    }

    async deleteProductFromCart(idCart,idProduct){

        try {
            const carrito = await CartModel.findById(idCart);
            if (!carrito) {
                return false;
            }
            const index = carrito.products.findIndex((producto) => producto.id.toString() === idProduct.toString());
            if (index === -1) {
                return false;
            }

            carrito.products.splice(index, 1);
            await carrito.save();
    
            return carrito;

        } catch (error) {
            logger.error(error);
        }
    
    }


    async updateCart(idCart, obj){

        try {
            const cart = await CartModel.findById(idCart);

            if (!cart) {
                return false;
            }
            cart.products = obj;
            const updatedCart = await cart.save();
            return updatedCart;

        } catch (error) {
            logger.error(error);
        }
    }

    async updateQuantity(idCart, idProduct, objQ){

        try {
            
            const cart = await CartModel.findById(idCart); 
            
            if (!cart) return false;
            
            const index = cart.products.findIndex((product) => product.id.toString() === idProduct.toString());
            
            if (index === -1) {
            return false;
            }

            const newQuantity = objQ.quantity;
            cart.products[index].quantity = newQuantity;
            await cart.save();

            return cart;
            
        } catch (error) {
            logger.error(error);
        }
}

    async emptyCart(idCart){

        try {

            const cart = await CartModel.findById(idCart); 
            if (!cart) return false;

            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            logger.error(error);
        }

    }

}