import bcrypt from "bcrypt"
import {usersJsonPath, saltRounds, secret, productsJsonPath} from "../constants.js";
import {readJsonFile, writeJsonFile} from "../utils/file-io.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await readJsonFile(usersJsonPath);
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({"error": err.message})
    }
};
export const getUser = async (req, res) => {
    try {
        const users = await readJsonFile(usersJsonPath)
        const user = users.find(u => u.username === req.params.username)
        if (user) res.status(200).send(user)
        else res.status(404).send({"error": "user not found"})
    } catch (err) {
        res.status(500).send({"error": err.message});
    }
};

// export const getUserWonAuctions = async (res, req) => {
//     const {username} = req.params;
//     if (username !== req.user.username) return res.status(403).send({"error": "can't access another clients won auctions"})
//     try {
//         const products = await readJsonFile(productsJsonPath);
//         const participatedAuctions = products.filter(el => el.bids.includes())
//     } catch (err) {
//         res.status(500).send({"error": err.message})
//     }
// }

export const deleteUser = async (req, res) => {
    const {username, email} = req.body;
    if (!username || !email) return res.status(422).send({"error": "invalid user data provided"});

    try {
        const users = await readJsonFile(usersJsonPath);
        const userIndex = users.findIndex(u => u.username === req.params.username);

        if (
            (users[userIndex].username !== req.user.username && users[userIndex].email === req.user.email) ||
            !req.user.admin
        ) return res.status(403).send({"error": "Unauthorized to perform that action. Account manipulation can only be handled by the owner user and hte administrators"})

        if (userIndex !== -1) {
            const [user] = users.splice(userIndex, 1);
            await writeJsonFile(usersJsonPath, users);
            res.status(200).send(user);
        } else {
            res.status(404).send({"error": "User not found"});
        }
    } catch (err) {
        res.status(500).send({"error": err.message});
    }
};

export const updateUser = async (req, res) => {
    const {username, email, password} = req.body;
    const validEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email);
    if (!username || !validEmail || !password) return res.status(422).send({"error": "invalid user data provided"});

    try {
        const users = await readJsonFile(usersJsonPath);
        const userIndex = users.findIndex(u => u.username === req.params.username);

        if (
            (users[userIndex].username !== req.user.username && users[userIndex].email === req.user.email) ||
            !req.user.admin
        ) return res.status(403).send({"error": "Unauthorized to perform that action. Account manipulation can only be handled by the owner user and hte administrators"})


        if (userIndex !== -1) {
            users[userIndex] = req.body;
            await writeJsonFile(usersJsonPath, users);
            res.status(200).send(users[userIndex]);
        } else {
            res.status(404).send({"error": "user not found"});
        }

    } catch (err) {
        res.status(500).send({"error": err.message});
    }
};

export const addUser = async (req, res) => {
    const {username, email, password} = req.body;
    const validEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email);
    if (!username || !validEmail || !password) return res.status(422).send({"error": "invalid user data provided"});

    try {
        const users = await readJsonFile(usersJsonPath, []);
        const userExists = users.some(u => u.username === username && u.email === email);
        if (userExists) return res.status(409).send({"error": "Conflict. User already exists"});

        const hash = await bcrypt.hash(password, saltRounds);
        const newUser = {username, email, password: hash, admin: false};
        users.push(newUser);
        await writeJsonFile(usersJsonPath, users);

        const token = jwt.sign(newUser, secret)
        res.status(201).json({"token": token, "user": newUser})
    } catch (err) {
        res.status(500).send({"error": err.message});
    }
};

