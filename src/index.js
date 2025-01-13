'use strict';
// Load environment variables from .env file
const dotenv = require('dotenv').config();

const express = require("express");
const dbConnect = require("./config/dbConnect");
const appRouters = require("./routes");

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//Middleware.
app.use(express.json());


// routes
app.use('/', appRouters)

const PORT = process.env.PORT || 7000;

dbConnect();
app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}...`)
})