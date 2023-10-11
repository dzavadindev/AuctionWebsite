import fs from "fs";
import {secret, usersJsonPath} from "../constants.js";
import jwt from "jsonwebtoken";

export const isdLoggedIn = (next, req, res) => {
    let {authorization} = req.headers;
    authorization = authorization.split(" ").length === 2 ? authorization.split(" ")[1] : res.status(422).send({"error":"Invalid payload"})
    if (!authorization) return res.status(401).send({"error": "Unauthenticated"})

    fs.readFile(usersJsonPath, "utf8", (err, data) => {
        if (err) return res.status(500).send({"error": "Failed to read the users list: " + err})
        const users = JSON.parse(data)
        try {
            const tokenUser = jwt.verify(authorization, secret);
            const foundUser = users.find(el => el === tokenUser)
            if (!foundUser) return res.status(401).send({"error": "Invalid user token"})
            // req.body = {...req.body, "user": tokenUser}
            req.user = tokenUser;
            next();
        } catch (err) {
            return res.status //
        }
    })
}
export const isAdmin = (next, req, res) => {
    if (!req.user.admin) return res.status(403).send({"error": "Unauthorized access"})
    next()
}