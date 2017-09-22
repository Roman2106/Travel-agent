const express = require ("express");
const bodyParser = require("body-parser");
const app = express();
const apiRouter = require("./routes/api");
const port = 3001;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(apiRouter);

app.listen(port, () =>{
	console.log(`Server working on port ${port}!!!`);
});





