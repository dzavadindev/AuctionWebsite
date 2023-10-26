import express from "express";
import {addProduct, deleteProduct, getProduct, getProducts, updateProduct} from '../controllers/products-controller.js'
import {addBid, getBids} from "../controllers/bids-controller.js";
import {isAdmin, isLoggedIn} from "../middleware/middleware.js";
// import path from "path";

const productsRouter = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './images/beings');
//     }, filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
//
// // Multer instance
// const upload = multer({storage: storage});
//
// // Multer middleware
// const uploadMiddleware = upload.single('image');

// Products
productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProduct);
productsRouter.delete('/:id', isLoggedIn, isAdmin, deleteProduct);
productsRouter.put('/:id', isLoggedIn, isAdmin, updateProduct);
productsRouter.post('/', isLoggedIn, isAdmin, addProduct);

// Bids
productsRouter.get('/:id/bids', getBids);
productsRouter.post('/:id/bids', isLoggedIn, addBid);

export default productsRouter;
