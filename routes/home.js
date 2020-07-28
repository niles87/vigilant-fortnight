const router = require("express").Router();
const controller = require("../controllers/home");

router.route("/").get(controller.home);

module.exports = router;
