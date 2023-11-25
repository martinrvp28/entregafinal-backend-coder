import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();


export default class Controllers {
    constructor(service) {
        this.service = service;
    }

    async getAll(req,res,next) {
        try {
            const items = await this.service.getAll();
            return httpResponse.Ok(res, {items});
        } catch (error) {
            next(error.message);
        }
    }

    async getById(req,res,next) {
        try {
            
            const {id} = req.params;
            const item = await this.service.getById(id);
    
            if(!item) return httpResponse.NotFound(res, 'Controller item not found');
            else return httpResponse.Ok(res, {item});
        } catch (error) {
            next(error.message);
        }
    }

    async create(req,res,next) {
        try {
            const newItem = await this.service.create(req.body);
            if (!newItem) return httpResponse.NotFound(res, 'Controller item not found');
            else return httpResponse.Ok(res, {newItem});
        } catch (error) {
            next(error.message);
        }
    }

    async update(req,res,next) {
        try {
            const {id} = req.params;
            const item = await this.service.getById(id);
            if (!item) return httpResponse.NotFound(res, 'Controller item update not found');
            else {
                const itemUpdate = await this.service.update(id, req.body);
                console.log(itemUpdate)
                return httpResponse.Ok(res, {itemUpdate});
            }
        } catch (error) {
            next(error.message);
        }
    }

    async delete(req,res,next) {
        try {
            const {id} = req.params;
            console.log(id);
            const item = await this.service.getById(id);
            if (!item) return httpResponse.NotFound(res, 'Controller item delete not found');
            else {
                const itemDel = await this.service.delete(id);
                return httpResponse.Ok(res, {itemDel});
            }
            
        } catch (error) {
            next(error.message);
        }
    }
}