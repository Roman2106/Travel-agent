const express = require("express");
const router = express.Router();


router.get("/customers", (req, res) => {
	res.send("customers get");
});

router.post("/customers", (req, resp) =>{
	res.send("customers get");
});



module.exports = router;