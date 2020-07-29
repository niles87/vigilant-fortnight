const router = require("express").Router();
const controller = require("../controllers/home");

router.route("/").get(controller.home);

router.route("/login").get(controller.login);

router.route("/game").get(controller.game);

module.exports = router;
