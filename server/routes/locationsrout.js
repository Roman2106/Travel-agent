const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const dbTrips = path.join(__dirname, "../DB/dbTrips.json");
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({extended: true}));

router.get("/", (request, response) =>{
	response.render("locations", { title: "Locations"}); 
	
});

module.exports = router;