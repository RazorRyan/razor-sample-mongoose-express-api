const mongoose = require("mongoose");

const schema = mongoose.Schema({
  employeeNo: Number,
  employeeName: String,
  employeeTitle: String,
  employeeStartDate: Date,
  employeeEndDate: Date
});

module.exports = mongoose.model("Employee", schema);
