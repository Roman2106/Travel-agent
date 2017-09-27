const mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost/test1", {useMongoClient: true});
mongoose.Promise = global.Promise;

const CustomersSchema = mongoose.Schema({
	 firstName: String,
	 lastName: String,
	 customersTrips: Array
});

const CustomersModel = mongoose.model("Customer", CustomersSchema);

module.exports = CustomersModel;




