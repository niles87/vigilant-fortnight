const express = require("express");
const exphbs = require("express-handlebars");
const sequelize = require("./config/config");
const app = express();
const PORT = process.env.PORT || 4000;

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
  });
});
