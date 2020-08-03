require("dotenv").config();

// const Sequelize = require("sequelize");

// const sequelize = process.env.IBM_DB2
//   ? new Sequelize(process.env.IBM_DB2)
//   : new Sequelize("phaser_io", "root", process.env.PASSWORD, {
//       host: "localhost",
//       port: 3306,
//       dialect: "mysql",
//     });

// module.exports = sequelize;
module.exports = {
  database = process.env.DB_STRING
}