import express from 'express';
import {handleLogin} from "../controllers/token-controller.js";

const router = express.Router();

router.post("/", handleLogin);

export default router;