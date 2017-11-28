const express = require("express");
const UserModel = require("../model/usersBase");
const router = express.Router();

const transformId = user => {
  const obj = user.toObject();
  obj.id = obj._id;
  delete obj.__v;
  delete obj._id;
  delete obj.password;
  return obj;
};

router.get("/users", (req, res, next) => {
  UserModel.find().then(data => res.json(data.map(transformId)), next);
});

router.delete("/users/:id", (req, res, next) => {
  UserModel.findById(req.params.id).then(userModel => {
    if (userModel) {
      userModel.remove();
      res.json(transformId(userModel));
    } else {
      res.status(200);
      res.end();
    }
  }, next);
});

router.post("/users", (req, res, next) => {
  const {login, password} = req.body;
  const user = new UserModel({
    login,
    password,
  });
  user.save().then(model => res.json(transformId(model)), next);
});

router.all((err, req, res, next) => {
  res.status(500);
  res.json(err);
});

module.exports = router;