import bcrypt from "bcrypt"
import {productsJsonPath, saltRounds, secret, usersJsonPath} from "../constants.js";
import {readJsonFile, writeJsonFile} from "../utils/file-io.js";
import jwt from "jsonwebtoken";
import {differenceInHours, parse} from "date-fns";

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

        if (user.username !== req.user.username && user.email !== req.user.email) {
            if (!req.user.admin)
                return res.status(403).send({"error": "Unauthorized to perform that action. Sensitive information can only be retrieved by the owner user and the administrators"})
        }

        if (user) res.status(200).send(user)
        else res.status(404).send({"error": "user not found"})
    } catch (err) {
        res.status(500).send({"error": err.message});
    }
};

export const getUserWonAuctions = async (req, res) => {
    const {username} = req.params;
    if (username !== req.user.username) return res.status(403).send({"error": "can't access another clients won auctions"})
    try {
        const products = await readJsonFile(productsJsonPath);
        const participatedAuctions = products.filter(el => Array.isArray(el.bids) && el.bids.some(bid => bid.username === username));
        const wonAuctions = participatedAuctions.filter(el =>
            el.bids[el.bids.length - 1].username === username
            && differenceInHours(Date.now(), parse(el.endDate, "dd-MM-yyyy", new Date())) >= 0
        )
        res.status(200).send(wonAuctions)
    } catch (err) {
        res.status(500).send({"error": err.message})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const users = await readJsonFile(usersJsonPath);
        const userIndex = users.findIndex(u => u.username === req.params.username);

        if (userIndex === -1)
            return res.status(404).send({"error": "user not found"});

        if (users[userIndex].username !== req.user.username && users[userIndex].email !== req.user.email) {
            if (!req.user.admin)
                return res.status(403).send({"error": "Unauthorized to perform that action. Account manipulation can only be handled by the owner user and the administrators"})
        }

        const [user] = users.splice(userIndex, 1);
        await writeJsonFile(usersJsonPath, users);
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({"error": err.message});
    }
};

export const updateUser = async (req, res) => {
    const {username, email, password} = req.body;
    const validEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email);
    if (!username || !validEmail || !password)
        return res.status(422).send({"error": "invalid user data provided"});

    try {
        const users = await readJsonFile(usersJsonPath);
        const userIndex = users.findIndex(u => u.username === req.params.username);
        if (userIndex === -1)
            return res.status(404).send({"error": "user not found"});

        if (users[userIndex].username !== req.user.username && users[userIndex].email !== req.user.email) {
            if (!req.user.admin)
                return res.status(403).send({"error": "Unauthorized to perform that action. Account manipulation can only be handled by the owner user and the administrators"})
        }

        const hash = await bcrypt.hash(password, saltRounds);
        users[userIndex] = {username, email, password: hash, admin: req.user.admin};
        const token = jwt.sign(users[userIndex], secret);

        await writeJsonFile(usersJsonPath, users);

        res.status(200).send({user: users[userIndex], token});
    } catch (err) {
        res.status(500).send({"error": err.message});
    }
};

export const addUser = async (req, res) => {
    const {username, email, password} = req.body;
    const validEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email);
    if (!username || !validEmail || !password)
        return res.status(422).send({"error": "invalid user data provided"});

    try {
        const users = await readJsonFile(usersJsonPath);
        const userExists = users.some(u => u.username === username && u.email === email);
        if (userExists)
            return res.status(409).send({"error": "Conflict. User already exists"});
        const hash = await bcrypt.hash(password, saltRounds);
        const newUser = {username, email, password: hash, admin: false};
        users.push(newUser);
        await writeJsonFile(usersJsonPath, users);

        const token = jwt.sign(newUser, secret);
        const {password: hashedPassword, ...data} = newUser;
        res.status(201).json({"token": token, "user": data})
    } catch (err) {
        res.status(500).send({"error": err.message});
    }
};

