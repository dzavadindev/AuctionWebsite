import express from "express";
import {addUser, deleteUser, getUser, getUsers, updateUser} from '../controllers/users-controller.js'

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:username', getUser);
usersRouter.delete('/:username', deleteUser);
usersRouter.put('/:username', updateUser);
usersRouter.post('/', addUser);

export default usersRouter;
