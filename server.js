const express = require("express");
const exphbs = require("express-handlebars");
const sequelize = require("./config/config");
const app = express();
const PORT = process.env.PORT || 4000;
const home = require("./routes/home");
const game = require("./routes/game");
const api = require("./routes/api");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/", home);
app.use("/game", game);
app.use("/api/v1", api);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
  });
});
