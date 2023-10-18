import fs from "fs";
import bcrypt from "bcrypt"
import {usersJsonPath, saltRounds} from "../constants.js";

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
    const {username, email} = req.body;
    if (!username && !email) return res.status(422).send({"error": "invalid user data provided"})
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

    console.log(req.body)

    const {username, email, password} = req.body
    const validEmail = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$".search(email);
    if (!username && !validEmail && !password) return res.status(422).send({"error": "invalid user data provided"})

    fs.readFile(usersJsonPath, "utf8", (readErr, json) => {
        if (readErr) res.status(500).send({"error": readErr.message})
        let data = json ? JSON.parse(json) : [];

        const userExists = data.find(el => el.username === username && el.email === email);
        if (userExists)
            return res.status(409).send({"error": "Conflict. User already exists"})

        bcrypt.hash(password, saltRounds, (hashErr, hash) => {
            if (hashErr)
                return res.status(500).send({"error": "Password hashing failed, try the request again - " + hashErr})

            data.push({"username": username, "email": email, "password": hash, admin: false});
            fs.writeFile(usersJsonPath, JSON.stringify(data), writeErr => {
                if (writeErr) return res.status(500).send({"error": "Error when writing into a file: ", writeErr})
                res.status(201).send(data);
            })
        })
    })
}