const jwt = require("jsonwebtoken");
const jwtSecret = require("./config");
const {UserModel} = require("../model/usersBase");

module.exports = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, jwtSecret, (err, data) => {
    if (err) {
      return res.status(401).end();
    }
    const userId = data.sub;
    UserModel.findById(userId).then(user => {
      if (!user) {
        return res.status(401).end();
      }
      console.log(user);
      next();
    }).catch(err => next(err));
  });
};