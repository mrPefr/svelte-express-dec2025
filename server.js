const express = require('express');
const app = express();
const {getGuitars, updateGuitars} = require("./guitars.js");
const guitarRoutes = require("./routes.js");
const port = process.env.port || 3000;

app.listen(port, () => {
    console.log("Server running on http://localhost:" + port);
});

// Middleware för att hantera json-data i post-requests
app.use(express.json());

app.use(express.static("client/dist"));

// guitars api
app.use("/api", guitarRoutes);