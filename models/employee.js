const mongoose = require("mongoose");
const { Schema } = mongoose;

const SessionSchema = new Schema({
  checkIn: Date,
  checkOut: Date,
  comment: String,
  duration: Number,
});

// module.exports = SessionSchema;

const EmployeeSchema = new Schema({
  name: String,
  firstName: String,
  department: String,
  createdAt: { type: Date, default: new Date() },
  currentSession: { type: SessionSchema, default: {} },
  sessions: { type: [SessionSchema], default: [] },
});

// module.exports = mongoose.model("Employee", EmployeeSchema);

module.exports = {
  Employee: mongoose.model("Employee", EmployeeSchema),
  Session: mongoose.model("Session", SessionSchema),
};
