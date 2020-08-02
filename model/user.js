const bcrypt = require("bcryptjs");
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/config.js");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.INT,
      allowNull:true
    }
  },
  {
    hooks: {
      beforeCreate: (user, options) => {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      },
    },
    sequelize,
    timestamps: false,
    modelName: "User",
  }
);

module.exports = User;
