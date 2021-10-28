const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employee");
const { endOfDay, startOfDay } = require("date-fns");

const auth = require("../middlewares/auth");
const { Employee, Session } = require("../models/employee");

/* GET employees listing. */
router.get("/:date?", auth, employeeController.list);

/* POST employee creation. */
router.post("/", auth, employeeController.create);

/* POST employee check in. */
router.post("/check-in/:id", employeeController.checkIn);

/* POST employee check out. */
router.post("/check-out/:id", employeeController.checkOut);

module.exports = router;
