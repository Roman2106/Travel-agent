const express = require("express");
const router = express.Router();


router.get("/locations", (req, res) => {
	res.send("locations get");
});

router.post("/locations", (req, resp) =>{
	res.send("locations get");
});



module.exports = router;