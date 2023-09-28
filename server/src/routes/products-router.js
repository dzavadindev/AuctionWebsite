import express from "express";
import {addProduct, deleteProduct, getProduct, getProducts, updateProduct} from '../controllers/products-controller.js'

const productsRouter = express.Router();

productsRouter.get('', getProduct);
productsRouter.get('/:id', getProducts);
productsRouter.delete('/:id', deleteProduct);
productsRouter.put('/:id', updateProduct);
productsRouter.post('', addProduct);

export default productsRouter;
