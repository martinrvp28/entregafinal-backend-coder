import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();


import { createProductMock } from "../services/mockProd.services.js";

export const createProductsMock = (req,res) => {
    try {
        const response = createProductMock();
        return httpResponse.Ok(res, response);
    } catch (error) {
        next(error);
    }
}