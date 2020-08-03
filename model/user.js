const bcrypt = require("bcryptjs");
const mongoose = require('mongoose')

// const { DataTypes, Model } = require("sequelize");
// const sequelize = require("../config/config.js");

// class User extends Model {}

// User.init(
//   {
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     score: {
//       type: DataTypes.INT,
//       allowNull:true
//     }
//   },
//   {
//     hooks: {
//       beforeCreate: (user, options) => {
//         let salt = bcrypt.genSaltSync(10);
//         let hash = bcrypt.hashSync(user.password, salt);
//         user.password = hash;
//       },
//     },
//     sequelize,
//     timestamps: false,
//     modelName: "User",
//   }
// );

// module.exports = User;

const Schema = mongoose.Schema

const UserSchema = new Schema ({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email:{
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  score: {
    type: Number
  }
})

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};