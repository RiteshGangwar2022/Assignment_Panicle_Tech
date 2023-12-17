const mongoose = require("mongoose");
const validator = require("validator");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "must username"],
    },
    email: {
      type: String,
      require: [true, "must email"],
      unique: true,
      validate: [validator.isEmail, "Enter a valid email"],
    },
    department: {
      type: String,
      require: [true, "must department_name"],
    },
    position: {
      type: String,
      require: [true, "must position"],
    },
    salary: {
      type: String,
      require: [true, "must salary"],
    },
  },
  { timestaps: true }
);


const Employee= mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
