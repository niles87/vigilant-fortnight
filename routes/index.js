const router = require("express").Router();

const home = require("./home.js");
const game = require("./game.js");
const api = require("./api");

router.use("/", home);
router.use("/game", game);
router.use("/api/v1", api);

module.exports = router;
