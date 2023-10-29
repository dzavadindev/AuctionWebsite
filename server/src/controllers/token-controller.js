import {secret, usersJsonPath} from "../constants.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {readJsonFile} from "../utils/file-io.js";

export const handleLogin = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) return res.status(422).send({"error": "Invalid payload"})

    try {
        const users = await readJsonFile(usersJsonPath);
        const foundUser = users.find(el => username === el.username);
        if (!foundUser) return res.status(401).send({"error": "User does not exist. Unauthenticated"});
        bcrypt.compare(password, foundUser.password, (err, matched) => {
            if (matched) {
                const token = jwt.sign({
                    "username": foundUser.username,
                    "email": foundUser.email,
                    "admin": foundUser.admin
                }, secret)
                res.status(201).send({"token": token, "user": foundUser})
            } else return res.status(401).send({"error": "Invalid password. Unauthenticated"});
        })
    } catch (err) {
        res.status(500).send({"error": "Internal Error: failed to read the users list. " + err.message})
    }
}