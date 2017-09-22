const express = require("express");
const LocationModel = require("../model/locationsBase");
const router = express.Router();

const transformId = location => {
	const obj = location.toObject();
	obj.id = obj._id;
	delete obj.__v;
	delete obj._id;
	return obj;
}

router.get("/locations", (req, res, next) => {
	LocationModel.find().then( data  => res.json(data.map(transformId)), next);
});

router.get("/locations/:id", (req, res, next) =>{
	LocationModel.findById(req.params.id).then( locationModel => {
		if(locationModel){
			res.json(transformId(locationModel));
		}else{
			res.status(404);
			res.end();
		}
	}, next);
});

router.post("/locations", (req, res, next) => {
	const {country, city} = req.body;
	const location = new LocationModel({
		country,
		city
	});
	location.save().then(model => res.json(transformId(model)), next);
});

router.put("/locations/:id", (req, res, next) => {
	LocationModel.findById(req.params.id).then( locationModel => {
		if(locationModel){
			const {country, city} = req.body;
			locationModel.country = country && country.trim() ? country.trim() : locationModel.country;
			locationModel.city = city && city.trim() ? city.trim() : locationModel.city;
			locationModel.save().then(model => res.json(transformId(model)), next);
		}else{
			res.status(404);
			res.end();
		}
	}, next);
});

router.delete("/locations/:id", (req, res, next) => {
	LocationModel.findById(req.params.id).then( locationModel => {
		if(locationModel){
			locationModel.remove();
			res.json(transformId(locationModel));
		}else{
			res.status(200);
			res.end();
		}
	}, next);
});

router.all((err, req, res, next) => {
	res.status(500);
	res.json(err);
});

module.exports = router;