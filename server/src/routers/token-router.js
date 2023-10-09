import express from 'express';
import {handleLogin} from "../controllers/authentication.js";

const router = express.Router();

router.post("/", handleLogin);

export default router;