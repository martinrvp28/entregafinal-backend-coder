import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import { __dirname } from "../utils.js";
import {upload} from "../middlewares/multerThumbnail.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";
import { addOwnerToBody } from "../middlewares/addOwnerToBody.js";

import { createProductsMock } from "../controllers/mockProducts.controller.js";

import ProductController from "../controllers/product.controllers.js";

const productController = new ProductController();

const router = Router();

const productManager = new ProductManager(__dirname + '/db/products.json');

router.get('/mockingproducts', createProductsMock);

router.get('/', productController.getAllProducts.bind(productController));

router.get('/:id', productController.getById.bind(productController));

router.post('/', checkAdmin, addOwnerToBody, productController.create.bind(productController));

router.put('/:id', checkAdmin, productController.update.bind(productController));

router.delete('/:id', checkAdmin, productController.delete.bind(productController));








export default router;