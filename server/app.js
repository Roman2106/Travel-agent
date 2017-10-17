const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const apiRouter = require("./routes/api");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(apiRouter);

module.exports = app;