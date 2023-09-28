import express from "express";
import {addBid, deleteBid, getBid, getBids, updateBid} from '../controllers/bids-controller.js'

const bidsRouter = express.Router();

bidsRouter.get('', getBid);
bidsRouter.get('/:id', getBids);
bidsRouter.delete('/:id', deleteBid);
bidsRouter.put('/:id', updateBid);
bidsRouter.post('', addBid);

export default bidsRouter;
