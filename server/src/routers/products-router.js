import express from "express";
import {addProduct, deleteProduct, getProduct, getProducts, updateProduct} from '../controllers/products-controller.js'
import {addBid, getBids, removeBid} from "../controllers/bids-controller.js";
import {isAdmin, isLoggedIn} from "../middleware/middleware.js";

const productsRouter = express.Router();

// Products
productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProduct);
productsRouter.delete('/:id', isLoggedIn, isAdmin, deleteProduct);
productsRouter.put('/:id', isLoggedIn, isAdmin, updateProduct);
productsRouter.post('/', isLoggedIn, isAdmin, addProduct);

// Bids
productsRouter.get('/:id/bids', getBids);
productsRouter.post('/:id/bids', isLoggedIn, addBid);
productsRouter.delete('/:id/bids/:bidId', isLoggedIn, removeBid);

export default productsRouter;
