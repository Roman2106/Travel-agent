const express = require("express");
const router = express.Router();
const routTrips = require("./routTrips");
const routCustomers = require("./routCustomers");
const routLocations = require("./routLocations");

router.use("/api", routTrips);
router.use("/api", routCustomers);
router.use("/api", routLocations);

module.exports = router;

