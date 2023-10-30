import {productsJsonPath} from "../constants.js";
import {readJsonFile, writeJsonFile} from "../utils/file-io.js";
import {differenceInHours, parse} from "date-fns";

export const getBids = async (req, res) => {
    try {
        const products = await readJsonFile(productsJsonPath);
        const product = products.find(el => Number(req.params.id) === el.id);
        if (product) res.status(200).send(product.bids || []);
        else res.status(404).send({"error": "product not found"});
    } catch (err) {
        res.status(500).send({"error": err.message});
    }
};

export const addBid = async (req, res) => {
    const {bid} = req.body;
    if (!bid || bid < 0) return res.status(422).send({"error": "invalid bid data provided"});

    try {
        const products = await readJsonFile(productsJsonPath);
        const productIndex = products.findIndex(el => Number(req.params.id) === el.id);
        if (productIndex !== -1) {
            if (products[productIndex].price >= bid)
                return res.status(400).send({"error": "Your bid cannot be lower than items current price"});
            if (differenceInHours(Date.now(), parse(product.endTime, "dd-MM-yyyy", new Date())) > 0)
                return res.status(400).send({"error": "This auction has been closed. To bids can be placed now"})
            if (!products[productIndex].bids) products[productIndex].bids = [];
            products[productIndex].price = bid;
            products[productIndex].bids.push({...req.body, username: req.user.username, id: products[productIndex].bids.length});
            console.log(products)
            await writeJsonFile(productsJsonPath, products);
            res.status(201).send(products[productIndex]);
        } else {
            res.status(404).send({"error": "product not found"});
        }
    } catch (err) {
        res.status(500).send({"error": err.message});
    }
};

export const removeBid = async (req, res) => {
    const {id, bidId} = req.params;

    try {
        const products = await readJsonFile(productsJsonPath);
        const productIndex = products.findIndex(el => Number(id) === el.id);
        if (productIndex !== -1) {
            const {bids} = products[productIndex];
            const foundBid = bids.find(bid => bid.id === Number(bidId));
            if (!foundBid) return res.status(404).send({"error": "Bid not found"});
            if (req.user.username !== foundBid.username) return res.status(401).send({"error": "You can't delete another person's bid"});
            if (Number(bidId) === bids.length - 1) {
                bids.splice(Number(bidId), 1);
                products[productIndex].price = bids.length > 0 ? bids[bids.length - 1].bid : initialPrice;
                await writeJsonFile(productsJsonPath, products);
                res.status(200).send(products[productIndex]);
            } else {
                res.status(400).send({"error": "You cannot delete a bid that is not the last bid made for a product"});
            }
        } else {
            res.status(404).send({"error": "Product not found"});
        }
    } catch (err) {
        res.status(500).send({"error": err.message});
    }
};
