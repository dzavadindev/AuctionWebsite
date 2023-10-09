import express from 'express';
import fs from "fs";
import {secret, usersJsonPath} from "../constants.js";
import jwt from "jsonwebtoken";

const router = express.Router();

export const handleLogin = (req, res) => {
    const {username, email} = req.body;
    if (!username || !email) return res.status(422).send({"error": "Invalid payload"})

    fs.readFile(usersJsonPath, "utf8", (err, data) => {
        if (err) res.status(500).send({"error": "Internal Error: failed to read the users list | " + err.message})
        const json = JSON.parse(data);
        // console.log(json)
        const userExists = json.find(el => username === el.username && email === el.email);
        // json.forEach(el => console.log(username === el.username && email === el.email && admin === el.admin))

        console.log('found user', userExists)
        if (!userExists) return res.status(404).send({"error": "User does not exist. Unauthenticated"});
        const token = jwt.sign({"username": username, "email": email, "admin": userExists.admin}, secret)
        res.status(200).json({"token": token})
    })

}

export default router;