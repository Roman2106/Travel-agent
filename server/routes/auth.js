const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post("/auth/login", (req, res, next) => {
  passport.authenticate("local-login", (err, token) => {
    if (err) {
      res.status(400);
      return res.json(err);
    } else if (token === false) {
      res.status(401);
      return res.json(err);
    }
    return res.json({token});
  })(req, res, next);
});

module.exports = router;