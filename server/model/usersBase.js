const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.connect(process.env.MONGO_CONNECTION || "mongodb://localhost/test1", {useMongoClient: true});
mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  login: String,
  password: String
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 10, (error, hash) => {
    if (error) {
      console.log(error);
      return next();
    }
    this.password = hash;
    next();
  })
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
  UserModel
};

// fetch("/api/users", {method:"POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify({login:'test', password:"123"})});

// fetch("/auth/login", {method:"POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify({login:'test', password:"123"})});




