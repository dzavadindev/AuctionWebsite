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
        console.log("products: ", products)
        const product = products.find(el => Number(req.params.id) === el.id);
        console.log("product: ", product)
        if (!product)
            return res.status(404).send({"error": "product not found"});
        if (product.price >= bid)
            return res.status(400).send({"error": "Your bid cannot be lower than items current price"});
        if (differenceInHours(Date.now(), parse(product.endTime, "dd-MM-yyyy", new Date())) > 0)
            return res.status(400).send({"error": "This auction has been closed. No bids can be placed now"})
        let bidId = product.bids ? product.bids.length + 1 : 0;
        if (!product.bids) product.bids = [];
        product.price = bid;
        product.bids.push({bid: bid, username: req.user.username, id: bidId});
        await writeJsonFile(productsJsonPath, products);
        res.status(201).send(product);
    } catch (err) {
        res.status(500).send({"error": err.message});
    }
}

export const deleteBid = async (req, res) => {
    const {id, bidId} = req.params;

    try {
        const products = await readJsonFile(productsJsonPath);
        const productIndex = products.findIndex(el => Number(id) === el.id);
        if (productIndex === -1) return res.status(404).send({"error": "Product not found"})

        const {bids} = products[productIndex];
        if (!bids)
            return res.status(404).send({"error": "Product have not been bid on yet"})

        const foundBid = bids.find(bid => bid.id === Number(bidId));
        if (!foundBid)
            return res.status(404).send({"error": "Bid not found"});

        if (req.user.username !== foundBid.username) {
            console.log(req.user)
            if (!req.user.admin)
                return res.status(403).send({"error": "You can't delete another person's bid unless you're an admin"});
        }

        if (Number(bidId) !== bids.length - 1)
            return res.status(400).send({"error": "You cannot delete a bid that is not the last bid made for a product"});

        bids.splice(Number(bidId), 1);
        products[productIndex].price = bids[bids.length - 1].bid;
        await writeJsonFile(productsJsonPath, products);

        res.status(200).send(products[productIndex]);
    } catch (err) {
        res.status(500).send({"error": err.message});
    }
};
