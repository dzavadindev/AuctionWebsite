import {productsJsonPath} from "../constants.js";
import {differenceInSeconds, format, parse} from "date-fns";
import {readJsonFile, writeJsonFile} from '../utils/file-io.js';


export const getProducts = async (req, res) => {
    const {year, country, price, searchQuery} = req.query;
    try {
        let products = await readJsonFile(productsJsonPath);

        if (year) {
            const [yearFrom, yearTo] = year.split("-").map(Number);
            products = products.filter(el => el.year >= yearFrom && el.year <= yearTo);
        }
        if (price) {
            const [priceFrom, priceTo] = price.split("-").map(Number);
            products = products.filter(el => el.price >= priceFrom && el.price <= priceTo);
        }
        if (country)
            products = products.filter(el => el.country.toLowerCase() === country.toLowerCase());
        if (searchQuery)
            products = products.filter(el => (el.name.toLowerCase() + el.author.toLowerCase()).includes(searchQuery.toLowerCase()))

        res.status(200).send(products);
    } catch (err) {
        res.status(500).send({"error": err.message});
    }
};

export const getProduct = async (req, res) => {
    try {
        const products = await readJsonFile(productsJsonPath);
        const product = products.find(el => Number(req.params.id) === el.id);
        if (product) res.status(200).send(product);
        else res.status(404).send({"error": "product not found"});
    } catch (err) {
        res.status(500).send({"error": err.message});
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const products = await readJsonFile(productsJsonPath);
        const productIndex = products.findIndex(el => Number(req.params.id) === el.id);

        if (productIndex !== -1) {
            const [product] = products.splice(productIndex, 1);
            await writeJsonFile(productsJsonPath, products);
            res.status(200).send(product);
        } else res.status(404).send({"error": "product not found"});

    } catch (err) {
        res.status(500).send({"error": err.message});
    }
};

export const updateProduct = async (req, res) => {
    const {image, name, author, description, price, country, year, endDate} = req.body;
    if (!image || !name || !author || !description || !price || !country || !year || !endDate)
        return res.status(422).send({"error": "Invalid payload"});

    const startDateUnformatted = Date.now();
    const endDateUnformatted = parse(endDate, "dd-MM-yyyy", new Date());
    if (price < 0 || year < 0 || differenceInSeconds(endDateUnformatted, startDateUnformatted) <= 0)
        return res.status(422).send({"error": "Invalid payload"});

    req.body.startDate = format(startDateUnformatted, "dd-MM-yyyy");

    try {
        const products = await readJsonFile(productsJsonPath);
        const productIndex = products.findIndex(el => Number(req.params.id) === el.id);

        if (productIndex !== -1) return res.status(404).send({"error": "product not found"});
        products[productIndex] = {...req.body, id: products[productIndex].id};
        await writeJsonFile(productsJsonPath, products);
        res.status(200).send(products[productIndex]);

    } catch (err) {
        res.status(500).send({"error": err.message});
    }
};

export const addProduct = async (req, res) => {
    const {image, name, author, description, price, country, year, endDate} = req.body;
    if (!image || !name || !author || !description || !price || !country || !year || !endDate) return res.status(422).send({"error": "Invalid payload, missing a field"});

    const startDateUnformatted = Date.now();
    const endDateUnformatted = parse(endDate, "dd-MM-yyyy", new Date());
    if (price < 0 || year < 0) return res.status(422).send({"error": "Invalid payload, negative year or price value"});
    if (differenceInSeconds(endDateUnformatted, startDateUnformatted) <= 0) return res.status(422).send({"error": "Invalid payload, end date earlier than start date"});

    req.body.startDate = format(startDateUnformatted, "dd-MM-yyyy");

    try {
        const products = await readJsonFile(productsJsonPath);
        const newProduct = {...req.body, id: products.length};
        products.push(newProduct);
        await writeJsonFile(productsJsonPath, products);
        res.status(201).send(newProduct);
    } catch (err) {
        res.status(500).send({"error": err.message});
    }
};

