const express = require ("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();
const apiRouter = require("./routes/api");
const port = 3001;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'static')));
app.use(apiRouter);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(port, () =>{
	console.log(`Server working on port ${port}!!!`);
});





