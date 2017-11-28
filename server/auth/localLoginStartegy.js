const {Strategy} = require("passport-local");
const {UserModel} = require("../model/usersBase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = require("./config");

const throwInvalidCredentials = () => {
  const error = new Error("Invalid credentials.");
  error.name = "InvalidCredentials";
  throw error();
};

module.exports = new Strategy({
  usernameField: "login",
  passwordField: "password",
  session: false
}, (login, password, done) => {
  UserModel.findOne({login}).then(user => {
    if (!user) {
      throwInvalidCredentials();
    }
    return bcrypt.compare(password, user.password).then(isMatched => {
      if (!isMatched) {
        throwInvalidCredentials();
      }
      const data = {
        sub: user.id
      };
      jwt.sign(data, jwtSecret, {expiresIn: "24h"}, (error, token) => {
        done(null, token);
      })
    })
  }).catch(err => done(err));
});