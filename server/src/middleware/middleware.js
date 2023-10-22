import fs from "fs";
import {secret, usersJsonPath} from "../constants.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
    let {authorization} = req.headers;
    authorization = authorization.split(" ");
    if (authorization.length !== 2) return res.status(422).send({"error": "Invalid token format"})
    let token = authorization[1];
    if (!token) return res.status(401).send({"error": "Unauthenticated"})

    fs.readFile(usersJsonPath, "utf8", (err, data) => {
        if (err) return res.status(500).send({"error": "Failed to read the users list: " + err})
        const users = JSON.parse(data)
        try {
            const {username} = jwt.verify(token, secret);
            const {password, ...foundUser} = users.find(el => el.username === username)
            if (!foundUser) return res.status(401).send({"error": "Invalid user token"})
            req.user = foundUser;
            next();
        } catch (err) {
            return res.status(500).send({"error": "JWT verification have failed"})
        }
    })
}
export const isAdmin = (req, res, next) => {
    if (!req.user.admin) return res.status(403).send({"error": "Unauthorized access"})
    next()
}