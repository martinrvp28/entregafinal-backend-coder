import { HttpResponse } from "../utils/http.response.js";
const http = new HttpResponse();
import { logger } from "../utils/logger.js";

export const errorHandler = (error, req, res, next) => {

    logger.error(`${error.message}`);
    const status = error.status || 404;
    http.ServerError(res, error.message);
}