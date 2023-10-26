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
export const addBid = (req, res) => {
    const {bid} = req.body;
    if (!bid || bid < 0) return res.status(422).send({"error": "invalid bid data provided"})

    fs.readFile(productsJsonPath, "utf8", (err, json) => {
        if (err) return res.status(500).send({"error": err.message})
        let data = JSON.parse(json)
        let product = data.find(el => Number(req.params.id) === el.id)
        console.log("before 400")
        if (product.price >= bid) return res.status(400).send({"error": "Your bid cannot be lower than items current price"})
        if (!product.bids) product.bids = [];
        product.price = bid;
        product.bids.push({...req.body, username: req.user.username, id: product.bids.length});
        console.log("after 400")
        fs.writeFile(productsJsonPath, JSON.stringify(data), () => {
            if (err) console.log('Error writing file:', err);
            else console.log('Successfully updated file');
        })
        res.status(201).send(product)
    })
}