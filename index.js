const express = require('express');
const cors = require('cors');

// importing local stuff
const db = require('./models/db')
const authRouter = require("./Routes/authRouter")
const prodRouter = require("./Routes/productsRouter");

const app = express();

// middleware necessary
app.use(express.json());
app.use(cors());
require('dotenv').config();

// configure port from the environment file
const port = process.env.PORT || 4000;

app.use("/user", authRouter);
app.use("/products", prodRouter);
app.listen(port, () => {
    console.log(`sever listen on ${port}`)
})