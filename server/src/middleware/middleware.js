import {secret, usersJsonPath} from "../constants.js";
import jwt from "jsonwebtoken";
import {readJsonFile} from "../utils/file-io.js";

export const isLoggedIn = async (req, res, next) => {
    let {authorization} = req.headers;
    authorization = authorization.split(" ");
    if (authorization.length !== 2) return res.status(422).send({"error": "Invalid token format"})
    let token = authorization[1];
    if (!token) return res.status(401).send({"error": "Unauthenticated, missing token"})

    try {
        const users = await readJsonFile(usersJsonPath);
        const {username} = jwt.verify(token, secret);
        console.log(users.find(el => el.username === username))
        const {password, ...foundUser} = users.find(el => el.username === username)
        if (!foundUser) return res.status(401).send({"error": "Invalid user token"})
        req.user = foundUser;
        next();
    } catch (err) {
        return res.status(500).send({"error": err.message})
    }
}

export const isAdmin = (req, res, next) => {
    if (!req.user.admin) return res.status(403).send({"error": "Unauthorized access"})
    next()
}