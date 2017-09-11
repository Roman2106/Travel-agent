const express = require ("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();
const apiRouter = require("./routes/api");
const dbTrips = path.join(__dirname, "/DB/dbTrips.json");

app.locals = {
	arrTrips: []
}

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'static')));
app.use(apiRouter);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(5000, () =>{
	console.log("Server working on port 5000.");
});





