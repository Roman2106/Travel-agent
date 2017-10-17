const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_CONNECTION || "mongodb://localhost/test1", {useMongoClient: true});
mongoose.Promise = global.Promise;

const TripSchema = mongoose.Schema({
  tripName: String,
  routName: Array,
  dateDeparture: String,
  dateArrival: String
});

const TripModel = mongoose.model("Trip", TripSchema);

module.exports = TripModel;




