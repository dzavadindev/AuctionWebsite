import express from "express";
import {
    addUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
    getUserWonAuctions
} from '../controllers/users-controller.js'
import {isAdmin, isLoggedIn} from "../middleware/middleware.js";

const userRouter = express.Router();

userRouter.get('/', isLoggedIn, isAdmin, getUsers);
userRouter.get('/:username', isLoggedIn, getUser);
userRouter.get('/:username/won', isLoggedIn, getUserWonAuctions);
userRouter.delete('/:username', isLoggedIn, deleteUser);
userRouter.put('/:username', isLoggedIn, updateUser);
userRouter.post('/', addUser);

export default userRouter;
