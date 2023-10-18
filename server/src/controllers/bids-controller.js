import fs from "fs";
import {productsJsonPath} from "../constants.js";

export const getBids = (req, res) => {
    fs.readFile(productsJsonPath, "utf8", (err, json) => {
        if (err) return res.status(500).send({"error": err.message});
        let data = JSON.parse(json);
        let product = data.find(el => Number(req.params.id) === el.id)
        if (product) res.status(200).send(product.bids);
        else res.status(404).send({"error": "product not found"})
    })
}
export const getBid = (req, res) => {
    fs.readFile(productsJsonPath, "utf8", (err, json) => {
        if (err) return res.status(500).send({"error": err.message});
        let data = JSON.parse(json);
        let product = data.find(el => Number(req.params.id) === el.id)
        if (!product) return res.status(404).send({"error": "product not found"})
        let bid = product.bids ? product.bids.find(el => Number(req.params.bidId) === el.id) : false;
        if (bid) res.status(200).send(bid);
        else res.status(404).send({"error": "bid not found"})
    })
}
export const addBid = (req, res) => {
    const {username, bid} = req.body;
    if (!username && (!bid || bid < 0)) return res.status(422).send({"error": "invalid bid data provided"})
    fs.readFile(productsJsonPath, "utf8", (err, json) => {
        if (err) return res.status(500).send({"error": err.message})
        let data = JSON.parse(json)
        let product = data.find(el => Number(req.params.id) === el.id)
        if (product.price < bid) return res.status(400).send({"error": "Your bid cannot be lower than items current price"})
        if (!product.bids) product.bids = [];
        product.bids.push({...req.body, id: product.bids.length});
        fs.writeFile(productsJsonPath, JSON.stringify(data), () => {
            if (err) console.log('Error writing file:', err);
            else console.log('Successfully updated file');
        })
        res.status(201).send(product.bids[product.bids.length])
    })
}