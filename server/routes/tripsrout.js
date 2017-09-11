const express = require("express"); 
const router = express.Router();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const dbTrips = path.join(__dirname, "../DB/dbTrips.json");
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({extended: true}));


router.post("/", (request, response) =>{
	fs.readFile(dbTrips, "utf8", (err, data) =>{
	if(err){
		throw err;
	}
	const dataBaseObj = JSON.parse(data);
		response.locals.arrTrips = dataBaseObj;
	const {nameTrip, route, dateOfDeparture, dateOfReturn} = request.body; 
		response.locals.arrTrips.push({nameTrip, route, dateOfDeparture, dateOfReturn});
		response.render("trips", { title: "Trips"});
	let stringArr = JSON.stringify(response.locals.arrTrips);
		fs.writeFile(dbTrips, stringArr);
	});
});

router.get("/", (request, response) =>{
	fs.readFile(dbTrips, "utf8", (err, data) =>{
	if(err){
		throw err;
	}
	const dataBaseObj = JSON.parse(data);
	response.locals.arrTrips = dataBaseObj;
	response.render("trips", { title: "Trips"});
	});	
});

module.exports = router;