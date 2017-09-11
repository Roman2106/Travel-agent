const express = require("express");
const router = express.Router();

const tripsRouter = require("./tripsrout");
const customersRouter = require("./customersrout");
const locationsRouter = require ("./locationsrout");

router.get('/', ((req,res) => {
	res.render("index", { title: "Second progect"});
}));

router.use("/trips", tripsRouter);
router.use("/customers", customersRouter);
router.use("/locations", locationsRouter);

module.exports = router;