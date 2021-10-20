const express = require("express");
const Employee = require("../models/Employee");
const router = express.Router();

router.get("/employees", async (req, res) => {
  const employees = await Employee.find();
  res.send(employees);
});

router.post("/employees", async (req, res) => {
  const request = new Employee({
    employeeNo: req.body.employeeNo,
    employeeName: req.body.employeeName,
    employeeTitle: req.body.employeeTitle, 
    employeeStartDate: req.body.employeeStartDate,
    employeeEndDate: req.body.employeeEndDate,
  });
  await request.save();
  res.send(request);
});

router.get("/employees/:id", async (req, res) => {
  try {
    const result = await Employee.findOne({ _id: req.params.id });
    res.send(result);
  } catch {
    res.status(404);
    res.send({ error: "Employee doesn't exist!" });
  }
});

router.patch("/employees/:id", async (req, res) => {
  try {
    const result = await Employee.findOne({ _id: req.params.id });

    if (req.body.employeeNo) {
      result.employeeNo = req.body.employeeNo;
    }

    if (req.body.employeeName) {
      result.employeeName = req.body.employeeName;
    }

    if (req.body.employeeTitle) {
      result.employeeTitle = req.body.employeeTitle;
    }

    if (req.body.employeeStartDate) {
      result.employeeStartDate = req.body.employeeStartDate;
    }

    await result.save();
    res.send(result);
  } catch {
    res.status(404);
    res.send({ error: "Employee doesn't exist!" });
  }
});

router.delete("/employees/:id", async (req, res) => {
  try {
    await Employee.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Employee doesn't exist!" });
  }
});

module.exports = router;
