import express from "express";
import {addUser, deleteUser, getUser, getUsers, updateUser} from '../controllers/users-controller.js'
import {isAdmin, isLoggedIn} from "../middleware/middleware.js";

const usersRouter = express.Router();

usersRouter.get('/', isLoggedIn, isAdmin, getUsers);
usersRouter.get('/:username', getUser);
usersRouter.delete('/:username', isLoggedIn, deleteUser);
usersRouter.put('/:username', updateUser);
usersRouter.post('/', addUser);

export default usersRouter;
