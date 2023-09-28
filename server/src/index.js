import express from 'express';

import cors from 'cors'
import auth from './middleware/auth.js';

import bidsRouter from "./routers/bids-router.js";
import productsRouter from "./routers/products-router.js";
import usersRouter from "./routers/users-router.js";

// import * as db from "./database/db-helper.js"
// db.createTable()

const app = express();

const port = 3000;
app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use("/auth", auth);

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/bids', bidsRouter);
app.use((req, res) => res.status(404).send('Sorry, that resource does not exist!'))

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});