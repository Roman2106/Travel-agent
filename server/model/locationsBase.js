const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_CONNECTION || "mongodb://localhost/test1", {useMongoClient: true});
mongoose.Promise = global.Promise;

const LocationSchema = mongoose.Schema({
  country: String,
  city: String
});

const LocationModel = mongoose.model("Location", LocationSchema);

module.exports = LocationModel;