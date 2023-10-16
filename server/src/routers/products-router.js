import express from "express";
import {addProduct, deleteProduct, getProduct, getProducts, updateProduct} from '../controllers/products-controller.js'
import {addBid, getBid, getBids} from "../controllers/bids-controller.js";
import {isAdmin, isdLoggedIn} from "../middleware/middleware.js";

const productsRouter = express.Router();

// Products
productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProduct);
productsRouter.delete('/:id', isdLoggedIn, isAdmin, deleteProduct);
productsRouter.put('/:id', isdLoggedIn, isAdmin, updateProduct);
productsRouter.post('/', isdLoggedIn, isAdmin, addProduct);

// Bids
productsRouter.get('/:id/bids', getBids);
productsRouter.get('/:id/bids/:bidId', getBid);
productsRouter.post('/:id/bids', isdLoggedIn, addBid);

export default productsRouter;
