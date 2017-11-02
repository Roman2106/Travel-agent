const express = require("express");
const CustomersModel = require("../model/customersBase");
const router = express.Router();

const transformId = trip => {
  const obj = trip.toObject();
  obj.id = obj._id;
  delete obj.__v;
  delete obj._id;
  return obj;
};

router.get("/customers", (req, res, next) => {
  CustomersModel.find().then(data => res.json(data.map(transformId)), next);
});

router.get("/customers/:id", (req, res, next) => {
  CustomersModel.findById(req.params.id).then(customersModel => {
    if (customersModel) {
      res.json(transformId(customersModel));
    } else {
      res.status(404);
      res.end();
    }
  }, next);
});

router.put("/customers/:id", (req, res, next) => {
  CustomersModel.findById(req.params.id).then(customersModel => {
    if (customersModel) {
      const {firstName, lastName, customersTripsID} = req.body;
      customersModel.firstName = firstName && firstName.trim() ? firstName.trim() : customersModel.firstName;
      customersModel.lastName = lastName && lastName.trim() ? lastName.trim() : customersModel.lastName;
      customersModel.customersTripsID = customersTripsID;
      customersModel.save().then(model => res.json(transformId(model)), next);
    } else {
      res.status(404);
      res.end();
    }
  }, next);
});

router.post("/customers", (req, res, next) => {
  const {firstName, lastName, customersTripsID} = req.body;
  const customer = new CustomersModel({
    firstName,
    lastName,
    customersTripsID
  });
  customer.save().then(model => res.json(transformId(model)), next);
});

router.delete("/customers/:id", (req, res, next) => {
  CustomersModel.findById(req.params.id).then(customersModel => {
    if (customersModel) {
      customersModel.remove();
      res.json(transformId(customersModel));
    } else {
      res.status(200);
      res.end();
    }
  }, next);
});

router.all((err, req, res, next) => {
  res.status(500);
  res.json(err);
});

module.exports = router;