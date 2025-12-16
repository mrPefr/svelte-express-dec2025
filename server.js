const express = require('express');
const cookieParser = require('cookie-parser')
require("dotenv").config();
const app = express();
const {getGuitars, updateGuitars} = require("./guitars.js");
const guitarRoutes = require("./guitarRoutes.js");
const authRoutes = require("./authRoutes.js");
const port = process.env.port || 3000;

app.listen(port, () => {
    console.log("Server running on http://localhost:" + port);
});

// Middleware för att hantera json-data i post-requests
app.use(express.json());

// urlEncoded för testning
app.use(express.urlencoded({extended:true}))

app.use(express.static("client/dist"));

app.use(cookieParser());

// guitars api
app.use("/api", guitarRoutes);

// Auth routes
app.use("/auth", authRoutes);