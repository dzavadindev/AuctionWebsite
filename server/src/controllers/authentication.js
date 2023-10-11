import express from 'express';
import fs from "fs";
import {secret, usersJsonPath} from "../constants.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

export const handleLogin = (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) return res.status(422).send({"error": "Invalid payload"})

    fs.readFile(usersJsonPath, "utf8", (err, data) => {
        if (err) res.status(500).send({"error": "Internal Error: failed to read the users list | " + err.message})
        const json = JSON.parse(data);
        const foundUser = json.find(el => username === el.username);
        if (!foundUser) return res.status(404).send({"error": "User does not exist. Unauthenticated"});
        bcrypt.compare(password, foundUser.password, (err, matched) => {
            if (matched) {
                const token = jwt.sign({
                    "username": foundUser.username,
                    "email": foundUser.email,
                    "admin": foundUser.admin
                }, secret)
                res.status(201).json({"token": token})
            } else return res.status(401).send({"error": "Invalid password. Unauthenticated"});
        })
    })

}

export default router;