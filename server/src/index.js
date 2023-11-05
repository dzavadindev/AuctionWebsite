import express from 'express';

import tokenRouter from './routers/token-router.js';
import productRouter from "./routers/product-router.js";
import userRouter from "./routers/user-router.js";
import cors from 'cors'

const app = express();
app.use(cors({
    exposedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(express.json());

const port = 3000;

app.use('/token', tokenRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use((req, res) => res.status(404).send('Sorry, that resource does not exist!'))

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});