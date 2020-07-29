const router = require("express").Router();
const controller = require("../../controllers/api");

router.route("/login").post(controller.login);

router.route("/signup").post(controller.signup);

module.exports = router;
