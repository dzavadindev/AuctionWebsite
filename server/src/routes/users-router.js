import express from "express";
import {addUser, deleteUser, getUser, getUsers, updateUser} from '../controllers/users-controller.js'

const usersRouter = express.Router();

usersRouter.get('', getUser);
usersRouter.get('/:id', getUsers);
usersRouter.delete('/:id', deleteUser);
usersRouter.put('/:id', updateUser);
usersRouter.post('', addUser);

export default usersRouter;
