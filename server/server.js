//import packages
const express = require("express");
const cors = require("cors");

const app = express();

//middleware
app.use(express.json());
app.use(cors);

app.listen(4001, () => {
    console.log("Server is listening on port 4001");
})