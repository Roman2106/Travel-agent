const mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost/test1", {useMongoClient: true});
mongoose.Promise = global.Promise;

const TripSchema = mongoose.Schema({
	 tripName: String,
	 routName: String,
	 dateDeparture: String,
	 dateArrival: String
});

const TripModel = mongoose.model("Trip", TripSchema);

module.exports = TripModel;




