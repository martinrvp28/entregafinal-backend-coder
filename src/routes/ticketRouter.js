import { Router } from "express";
import TicketController from "../controllers/ticket.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const controller = new TicketController();
const router = Router();

router.post('/', isAuth, controller.generateTicket);

export default router;