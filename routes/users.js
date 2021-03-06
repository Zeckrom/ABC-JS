var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// Register
router.post("/register", userController.register);

// Login
router.post("/login", userController.login);

module.exports = router;
