import express from "express";
import {addProduct, deleteProduct, getProduct, getProducts, updateProduct} from '../controllers/products-controller.js'
import {addBid, getBids, deleteBid} from "../controllers/bids-controller.js";
import {isAdmin, isLoggedIn} from "../middleware/middleware.js";

const productRouter = express.Router();

// Products
productRouter.get('/', getProducts);
productRouter.get('/:id', getProduct);
productRouter.delete('/:id', isLoggedIn, isAdmin, deleteProduct);
productRouter.put('/:id', isLoggedIn, isAdmin, updateProduct);
productRouter.post('/', isLoggedIn, isAdmin, addProduct);

// Bids
productRouter.get('/:id/bids', getBids);
productRouter.post('/:id/bids', isLoggedIn, addBid);
productRouter.delete('/:id/bids/:bidId', isLoggedIn, deleteBid);

export default productRouter;
