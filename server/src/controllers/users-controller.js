import fs from "fs";
import {usersJsonPath} from "../constants.js";

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
    // apply some other shit
    fs.readFile(usersJsonPath, "utf8", (err, json) => {
        if (err) res.status(500).send({"error": err.message})
        let data = JSON.parse(json)
        data.push(req.body);
        console.log(req.body)
        fs.writeFile(usersJsonPath, JSON.stringify(data), () => {
            if (err) console.log('Error writing file:', err);
            else console.log('Successfully updated file');
        })
        res.status(201).send(data)
    })
}