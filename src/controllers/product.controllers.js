import Controllers from "./class.controllers.js";
import ProductService from "../services/product.services.js";

const productService = new ProductService();

export default class ProductController extends Controllers {
    constructor(){
        super(productService);
    }


    async getAllProducts (req, res, next)  {
        try {
            const limit = req.query.limit ? req.query.limit : 10;
            const sort = req.query.sort;
            const page = req.query.page ? req.query.page : 1;
            const query = req.query.query;
            const queryValue = req.query.queryValue;
    
    
            const products = await productService.getAllProducts(limit,sort,page,query,queryValue);
            
    
            const prevQueryParams = {
                limit,
                sort: sort ? sort : undefined,
                page: products.prevPage,
                query: query ? query : undefined,
                queryValue: queryValue ? queryValue : undefined
            };
            const prevLinkQuery = Object.entries(prevQueryParams)
                .filter(([key, value]) => value !== undefined) // Filtrar los parámetros opcionales
                .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                .join('&');
            const prevLink = `${req.baseUrl}${req.path}?${prevLinkQuery}`;
    
            const nextQueryParams = {
                limit,
                sort: sort ? sort : undefined,
                page: products.nextPage,
                query: query ? query : undefined,
                queryValue: queryValue ? queryValue : undefined
            };
            const nextLinkQuery = Object.entries(nextQueryParams)
                .filter(([key, value]) => value !== undefined) // Filtrar los parámetros opcionales
                .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                .join('&');
            const nextLink = `${req.baseUrl}${req.path}?${nextLinkQuery}`;
    
            const response = {
                status: 'success',
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                page: products.page,
                prevLink: prevLink ? prevLink : null,
                nextLink: nextLink ? nextLink : null
            };
            
            res.render('products', {response});

        } catch (error) {
            next(error);
        }
    }

}

