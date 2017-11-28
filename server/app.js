const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const apiRouter = require("./routes/api");
const passport = require("passport");
const localLoginStrategy = require("./auth/localLoginStartegy");

passport.use("local-login", localLoginStrategy);
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(apiRouter);

module.exports = app;