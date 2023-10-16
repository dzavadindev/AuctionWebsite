import express from "express";
import {addUser, deleteUser, getUser, getUsers, updateUser} from '../controllers/users-controller.js'
import {isAdmin, isdLoggedIn} from "../middleware/middleware.js";

const usersRouter = express.Router();

usersRouter.get('/', isdLoggedIn, isAdmin, getUsers);
usersRouter.get('/:username', getUser);
usersRouter.delete('/:username', isdLoggedIn, deleteUser);
usersRouter.put('/:username', updateUser);
usersRouter.post('/', addUser);

export default usersRouter;
