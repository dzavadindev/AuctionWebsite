import fs from "fs";
import {productsJsonPath} from "../constants.js";

export const getProducts = (req, res) => {
    fs.readFile(productsJsonPath, "utf8", (err, json) => {
        if (err) return res.status(500).send({"error": err.message});
        res.status(200).send(json);
    })
}
export const getProduct = (req, res) => {
    fs.readFile(productsJsonPath, "utf8", (err, json) => {
        if (err) return res.status(500).send({"error": err.message});
        let data = JSON.parse(json);
        let product = data.find(el => Number(req.params.id) === el.id)
        if (product) res.status(200).send(product);
        else res.status(404).send({"error": "product not found"})
    })
}
export const deleteProduct = (req, res) => {
    fs.readFile(productsJsonPath, "utf8", (err, json) => {
        if (err) return res.status(500).send({"error": err.message});
        let data = JSON.parse(json);
        let product = data.find(el => Number(req.params.id) === el.id)
        if (product) {
            data.splice(data.indexOf(product), 1);
            fs.writeFile(productsJsonPath, JSON.stringify(data), () => {
                if (err) console.log('Error writing file:', err);
                else console.log('Successfully updated file');
            })
            res.status(200).send(product)
        } else res.status(404).send({"error": "product not found"})
    })
}
export const updateProduct = (req, res) => {
    const {image, name, author, description, price, country, year} = req.body
    if (!image || !name || !author || !description || !price || !country || !year) return res.status(422).send({"error":"Invalid payload"})
    if (price < 0 || year < 0) return res.status(422).send({"error":"Invalid payload"})

    fs.readFile(productsJsonPath, "utf8", (err, json) => {
        if (err) return res.status(500).send({"error": err.message});
        let data = JSON.parse(json);
        let product = data.find(el => Number(req.params.id) === el.id)
        let productIndex = data.indexOf(product)
        let body = {...req.body, id: data[productIndex].id}
        if (productIndex !== -1) {
            data[productIndex] = body
            fs.writeFile(productsJsonPath, JSON.stringify(data), () => {
                if (err) console.log('Error writing file:', err);
                else console.log('Successfully updated file');
            })
            res.status(200).send(data[productIndex]);
        } else res.status(404).send({"error": "product not found"})
    })
}
export const addProduct = (req, res) => {
    const {image, name, author, description, price, country, year} = req.body;
    if (!image || !name || !author || !description || !price || !country || !year) return res.status(422).send({"error":"Invalid payload"})
    if (price < 0 || year < 0) return res.status(422).send({"error":"Invalid payload"})

    fs.readFile(productsJsonPath, "utf8", (err, json) => {
        if (err) return res.status(500).send({"error": err.message})
        let data = JSON.parse(json)
        let body = {...req.body, id: data.length}
        data.push(body);
        fs.writeFile(productsJsonPath, JSON.stringify(data), () => {
            if (err) console.log('Error writing file:', err);
            else console.log('Successfully updated file');
        })
        res.status(201).send(data)
    })
}
