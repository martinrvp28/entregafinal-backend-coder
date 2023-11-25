import Controllers from "./class.controllers.js";
import CartService from "../services/cart.services.js";
import mongoose, { isValidObjectId } from "mongoose";
import TicketService from "../services/ticket.services.js";

const cartService = new CartService();
const ticketService = new TicketService();


import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();
import error from "../utils/errors.dictionary.js"

export default class CartController extends Controllers {
    constructor(){
        super(cartService);
    }

    async createCart(req, res, next) {
    
        try {
            const obj = {products:[]}
            const response = await cartService.create(obj);
            return httpResponse.Ok(res, response);
        } catch (error) {
            next(error);
        }
    }
    
    async addProductToCart(req,res,next){
    
        try {
            const {idCart, idProduct} = req.params;
            const addCart = await cartService.addProductToCart(idCart,idProduct);
            if (!addCart) return httpResponse.NotFound(res, error.CART_NOT_FOUND);
            else return httpResponse.Ok(res, addCart);
        } catch (error) {
            next(error);
        }
    
    }
    
    async deleteProductFromCart(req,res,next){
    
        try {
            const {idCart, idProduct} = req.params;
            const del = await cartService.deleteProductFromCart(idCart,idProduct);
            if (!del) return httpResponse.NotFound(res, error.CART_OR_PROD_NF);
            else return httpResponse.Ok(res, del);
    
        } catch (error) {
            next(error);
        }
    }
    
    async updateCart(req,res,next) {
        try {
            
            const {idCart} = req.params;
            const obj = req.body;
    
            const add = await cartService.updateCart(idCart,obj);
            if (!add) return httpResponse.NotFound(res, error.CART_NOT_FOUND);
            else return httpResponse.Ok(res, add);
        } catch (error) {
            next(error);
        }
    }
    
    async updateQuantity(req,res,next) {
        try {
            const {idCart, idProduct} = req.params;
            const objQ = req.body;
    
            const upd = await cartService.updateQuantity(idCart, idProduct, objQ);
            
            if (!upd) return httpResponse.NotFound(res, error.CART_OR_PROD_NF);
            else return httpResponse.Ok(res, upd);
        } catch (error) {
            next(error);
        }
    }
    
    async emptyCart (req, res, next) {
    
        try {
            const {idCart} = req.params;
            const del = await cartService.emptyCart(idCart);
            if (!del) return httpResponse.NotFound(res, error.CART_NOT_FOUND);
            else return httpResponse.Ok(res, del);
        } catch (error) {
            next(error);
        }
    
    }

    async purchase (req,res,next) {

        try {
            const {idUser} = req.params;

            await ticketService.generateTicket(idUser);
            
            const cart = await cartService.purchase(idUser);
            if (!cart) return httpResponse.NotFound(res, error.CART_OR_USER_NF);
            else return httpResponse.Ok(res, cart);
            
        } catch (error) {
        next(error);
        }

    }

}

