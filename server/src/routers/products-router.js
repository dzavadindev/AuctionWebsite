import express from "express";
import {addProduct, deleteProduct, getProduct, getProducts, updateProduct} from '../controllers/products-controller.js'
import {addBid, getBid, getBids} from "../controllers/bids-controller.js";

const productsRouter = express.Router();

// Products
productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProduct);
productsRouter.delete('/:id', deleteProduct);
productsRouter.put('/:id', updateProduct);
productsRouter.post('/', addProduct);

// Bids
productsRouter.get('/:id/bids', getBids);
productsRouter.get('/:id/bids/:bidId', getBid);
productsRouter.post('/:id/bids', addBid);

export default productsRouter;
