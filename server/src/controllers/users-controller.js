import fs from "fs";
import bcrypt from "bcrypt"
import {usersJsonPath, salt} from "../constants.js";

const verifyUserPayload = (payload) => {
    return payload.username && payload.email && payload.password
}

export const getUsers = (req, res) => {
    fs.readFile(usersJsonPath, "utf8", (err, json) => {
        if (err) res.status(500).send({"error": err.message});
        res.status(200).send(json);
    })
}
export const getUser = (req, res) => {
    fs.readFile(usersJsonPath, "utf8", (err, json) => {
        if (err) res.status(500).send({"error": err.message});
        let data = JSON.parse(json);
        let user = data.find(el => req.params.username === el.username)
        if (user) res.status(200).send(user);
        res.status(404).send({"error": "user not found"})
    })
}
export const deleteUser = (req, res) => {
    fs.readFile(usersJsonPath, "utf8", (err, json) => {
        if (err) res.status(500).send({"error": err.message});
        let data = JSON.parse(json);
        let user = data.find(el => req.params.username === el.username)
        if (user) {
            delete data[data.indexOf(user)];
            fs.writeFile(usersJsonPath, JSON.stringify(data), () => {
                if (err) console.log('Error writing file:', err);
                else console.log('Successfully updated file');
            })
            res.status(200).send(user)
        } else res.status(404).send({"error": "user not found"})
    })
}
export const updateUser = (req, res) => {
    if (!verifyUserPayload(req.body)) return res.status(422).send({"error": "invalid user data provided"})
    fs.readFile(usersJsonPath, "utf8", (err, json) => {
        if (err) res.status(500).send({"error": err.message});
        let data = JSON.parse(json);
        let user = data.indexOf(data.find(el => req.params.username === el.username))
        if (user !== -1) {
            data[user] = req.body
            fs.writeFile(usersJsonPath, JSON.stringify(data), () => {
                if (err) console.log('Error writing file:', err);
                else console.log('Successfully updated file');
            })
            res.status(200).send(data[user]);
        } else res.status(404).send({"error": "user not found"})
    })
}
export const addUser = (req, res) => {

    const validEmail = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$".search(email);

    if (!verifyUserPayload(req.body)) return res.status(422).send({"error": "invalid user data provided"})
    fs.readFile(usersJsonPath, "utf8", (err, json) => {
        if (err) res.status(500).send({"error": err.message})
        let data = JSON.parse(json)
        req.body.password = bcrypt.hash(req.body.password, salt)
        data.push(req.body);
        fs.writeFile(usersJsonPath, JSON.stringify(data), () => {
            if (err) console.log('Error writing file:', err);
            else console.log('Successfully updated file');
        })
        res.status(201).send(data)
    })
}