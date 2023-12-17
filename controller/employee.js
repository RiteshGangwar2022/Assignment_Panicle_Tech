const mongoose = require("mongoose");
const Employee = require("../Database/Models/Employee");

//to Add new Employee

const AddEmployee = async (req, res) => {
  //console.log(req.body);
  const { name, email, department, position, salary } = req.body;

  // checks
  if (!name || !email || !department || !position || !salary) {
    return res.status(422).json({ error: "fill all the data properly" });
  }

  try {
    //checking if Emplpyee already exists in database or not , else create a employee user

    // exiting employee
    const existEmployee = await Employee.findOne({ email });

    if (existEmployee) {
      return res.status(422).json({ error: "Employee already exists" });
    } else {
      const newemployee = new Employee({
        name,
        email,
        department,
        position,
        salary,
      });

      const data = await newemployee.save();
      //console.log(data)
      if (newemployee) {
        res
          .status(200)
          .json({ newemployee, message: "Employee added successfully" });
      }
    }
  } catch (err) {
    // console.log(err);
    res.status(422).send(err);
  }
};

//to find all the registered employees

const Allemployee = async (req, res) => {
  const { name, email, department, position, minSalary, maxSalary } = req.query;
  const filters = {};

  try {
    if (name) filters.name = { $regex: new RegExp(name, "i") };
    if (department)
      filters.department = { $regex: new RegExp(department, "i") };
    if (position) filters.position = { $regex: new RegExp(position, "i") };
    if (email) filters.email = email;
    if (minSalary && maxSalary) {
      filters.salary = { $gte: parseInt(minSalary), $lte: parseInt(maxSalary) };
    } else {
      if (minSalary) filters.salary = { $gte: parseInt(minSalary) };
      if (maxSalary) filters.salary = { $lte: parseInt(maxSalary) };
    }

    const employees = await Employee.find({ ...filters });
    res.status(200).json({ employees });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//to update the employee details

const Updateemployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    // checking existing employee
    const employee = await Employee.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!employee) {
      return res.status(422).json({ error: "Employee does not exists" });
    }

    res
      .status(200)
      .json({ employee, message: "Employee updated successfully" });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};


//to delete the employee

const Deleteemployee = async (req, res) => {
  try {
    const { id } = req.params;

    // checking existing employee
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(422).json({ error: "Employee does not exists" });
    }

    // Deleting the employee
    await Employee.findByIdAndDelete(id);

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { AddEmployee, Allemployee, Updateemployee, Deleteemployee };
