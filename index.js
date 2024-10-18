import express from "express";
const app = express();
const port = 3000;
import apiRoutes from "./api.js";
import { INR_BALANCES, ORDERBOOK } from "./variables.js";
// const INR_BALANCES = require("./variables");

app.use(express.json());
app.use("/", apiRoutes);


app.listen(port, () => {
    console.log(`Port is running on localhost:${port}`);
});