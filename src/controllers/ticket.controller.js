import Controllers from "./class.controllers.js"
import TicketService from "../services/ticket.services.js"

import TicketDaoMongo from "../persistence/daos/mongodb/ticket.dao.js";
const ticketDaoInstance = new TicketDaoMongo();


import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

const ticketService = new TicketService();

export default class TicketController extends Controllers {
    constructor() {
        super(ticketService);
    }

    async generateTicket (req,res,next) {
        try {
            const { _id} = req.user;
            const ticket = await ticketService.generateTicket(_id);
            if (!ticket) return httpResponse.NotFound(res, `Ticket ${error.USER_NOT_FOUND}`);
            return httpResponse.Ok(res, ticket);
        } catch (error) {
            next(error);
        }
    }

    async tickets (req, res, next) {
        try {
            const response = await ticketDaoInstance.getAll();
            return httpResponse.Ok(res, response);
        } catch (error) {
            next(error);
        }
    }

}