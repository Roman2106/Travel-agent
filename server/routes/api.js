const express = require("express");
const router = express.Router();
const routTrips = require("./routTrips");
const routCustomers = require("./routCustomers");
const routLocations = require("./routLocations");
const routUsers = require("./routUsers");
const authRouter = require("../routes/auth");
const authMiddelware = require("../auth/authMiddelware");

router.use("/api", authMiddelware);
router.use("/api", routTrips);
router.use("/api", routCustomers);
router.use("/api", routLocations);
router.use("/api", routUsers);
router.use(authRouter);

module.exports = router;

