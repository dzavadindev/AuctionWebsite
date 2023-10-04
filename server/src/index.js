import express from 'express';

import token from './routers/token-router.js';

import productsRouter from "./routers/products-router.js";
import usersRouter from "./routers/users-router.js";

const app = express();
app.use(express.json());

const port = 3000;

// Checking the access of the client - authorization
// Checking if the client is logged it - authentications
app.use("/token", token);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use((req, res) => res.status(404).send('Sorry, that resource does not exist!'))

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});