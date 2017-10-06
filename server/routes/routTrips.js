const express = require("express");
const TripModel = require("../model/tripsBase");
const router = express.Router(); 

const transformId = trip => {
	const obj = trip.toObject();
	obj.id = obj._id;
	delete obj.__v;
	delete obj._id;
	return obj;
}

router.get("/trips", (req, res, next) => {
	TripModel.find().then( data  => res.json(data.map(transformId)), next);
});

router.get("/trips/:id", (req, res, next) =>{
	TripModel.findById(req.params.id).then( tripModel => {
		if(tripModel){
			res.json(transformId(tripModel));
		}else{
			res.status(404);
			res.end();
		}
	}, next);
});

router.put("/trips/:id", (req, res, next) => {
	TripModel.findById(req.params.id).then( tripModel => {
		if(tripModel){
			const { tripName, routName, dateDeparture, dateArrival } = req.body;
			tripModel.tripName = tripName && tripName.trim() ? tripName.trim() : tripModel.tripName;
			tripModel.routName = routName;
			tripModel.dateDeparture = dateDeparture && dateDeparture.trim() ? dateDeparture.trim() : tripModel.dateDeparture;
			tripModel.dateArrival = dateArrival && dateArrival.trim() ? dateArrival.trim() : tripModel.dateArrival;
			tripModel.save().then(model => res.json(transformId(model)), next);
		}else{
			res.status(404);
			res.end();
		}
	}, next);
});

router.delete("/trips/:id", (req, res, next) => {
	TripModel.findById(req.params.id).then( tripModel => {
		if(tripModel){
			tripModel.remove();
			res.json(transformId(tripModel));
		}else{
			res.status(200);
			res.end();
		}
	}, next);
});

router.post("/trips", (req, res, next) => {
	const { tripName, routName, dateDeparture, dateArrival } = req.body;
	const trip = new TripModel({
		tripName,
	 	routName,
	 	dateDeparture,
	 	dateArrival
	});
	trip.save().then(model => res.json(transformId(model)), next);
});

router.all((err, req, res, next) => {
	res.status(500);
	res.json(err);
});

module.exports = router;