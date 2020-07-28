const express = require("express");
const exphbs = require("express-handlebars");
const sequelize = require("./config/config");
const app = express();
const PORT = process.env.PORT || 4000;
// const routes = require("./routes");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./routes/"));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
  });
});
