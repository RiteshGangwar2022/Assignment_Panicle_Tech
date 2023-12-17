const express = require("express");
const router = express.Router();

const {
  AddEmployee,
  Allemployee,
  Updateemployee,
  Deleteemployee,
} = require("../controller/employee");

router.post("/register", AddEmployee);
router.get("/allemployee", Allemployee);
router.put("/update/:id", Updateemployee);
router.delete("/delete/:id", Deleteemployee);

module.exports = router;
