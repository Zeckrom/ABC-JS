const { endOfDay, startOfDay } = require("date-fns");

const auth = require("../middlewares/auth");
const { Employee, Session } = require("../models/employee");

const employeeController = {
  list: async (req, res) => {
    const { date } = req.params;
    let employees;

    if (date) {
      employees = await Employee.find({
        // If a date is provided, we will fetch employees in the range between the 2 edges of the day.
        createdAt: {
          $gte: startOfDay(new Date(date)),
          $lte: endOfDay(new Date(date)),
        },
      });
    } else {
      employees = await Employee.find();
    }

    return res.status(200).json(employees);
  },
  create: async (req, res) => {
    const { body } = req;
    const newEmployee = new Employee({
      name: body.name,
      firstName: body.firstName,
      department: body.department,
    });
    const savedEmployee = await newEmployee.save();
    return res.status(200).json({ employee: savedEmployee });
  },
  checkIn: async (req, res) => {
    const {
      params: { id },
      body: { comment },
    } = req;
    const employee = await Employee.findById(id);
    if (employee.currentSession?.checkIn) {
      // If the employee hasn't checked out, checking in again is not allowed
      return res.status(400).send("Please check out before checking in again.");
    }

    if (!employee.currentSession) {
      employee.currentSession = {};
      employee.currentSession = new Session();
    }
    employee.currentSession.checkIn = new Date();
    employee.currentSession.comment = comment;

    const updatedEmployee = await employee.save();
    return res.send(updatedEmployee);
  },
  checkOut: async (req, res) => {
    const {
      params: { id },
      body: { comment },
    } = req;
    const employee = await Employee.findById(id);
    if (!employee.currentSession.checkIn) {
      // If there is a current active session and the employee hasn't checked out yet, an error is thrown.
      return res.status(400).send("Please check in before checking out again.");
    }
    const checkedOut = new Date();
    // Duration will be stored as a timestamp
    const duration =
      checkedOut.getTime() -
      new Date(employee.currentSession.checkIn).getTime();
    const newSession = new Session({
      checkIn: employee.currentSession.checkIn,
      checkOut: checkedOut,
      duration,
      comment,
    });
    employee.sessions.push(newSession);
    const emptySession = new Session();
    employee.currentSession = emptySession;
    const savedEmployee = await employee.save();
    return res.send(savedEmployee);
  },
};

module.exports = employeeController;
