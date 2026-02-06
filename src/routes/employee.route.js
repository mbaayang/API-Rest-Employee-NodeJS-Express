const router = require("express").Router();
const controller = require("../controllers/employee.controller");
const validate = require("../middlewares/validate");
const validator = require("../validators/employee.validator");

router.post("/", validator.createEmployee, validate, controller.createEmployee);

router.get("/", controller.getEmployees);

router.get("/search", controller.searchEmployees);

router.get("/stats", controller.getStats);

router.get("/:id", controller.getEmployeeById);

router.put("/:id", validator.updateEmployee, validate, controller.updateEmployee);

router.delete("/:id", controller.deleteEmployee);


module.exports = router;
