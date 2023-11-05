import {secret, usersJsonPath} from "../constants.js";
import jwt from "jsonwebtoken";
import {readJsonFile} from "../utils/file-io.js";

export const isLoggedIn = async (req, res, next) => {
    let {authorization} = req.headers;
    if (!authorization) return res.status(401).send({"error":"No authorization provided. Request denied"})
    authorization = authorization.split(" ");
    if (authorization.length !== 2) return res.status(401).send({"error": "Invalid token format"})
    let token = authorization[1];
    if (!token) return res.status(401).send({"error": "Unauthenticated, missing token"})

    try {
        const users = await readJsonFile(usersJsonPath);
        const {username} = jwt.verify(token, secret);
        const foundUser = users.find(el => el.username === username);
        if (!foundUser) return res.status(401).send({"error": "Middleware error. User could not be found"})
        const {password, ...data} = foundUser
        req.user = data;
        next();
    } catch (err) {
        return res.status(500).send({"error": "Middleware error. " + err.message})
    }
}

export const isAdmin = (req, res, next) => {
    if (!req.user.admin) return res.status(403).send({"error": "Unauthorized access"})
    next()
}