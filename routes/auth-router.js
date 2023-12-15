const express = require("express");
const router = express.Router();
const authControllers = require("../Controllers/auth-controller"); // Adjusted path

router.route("/").get(authControllers.home);
router.route("/register").get(authControllers.register);

module.exports = router;
