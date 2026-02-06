const { body, query, param } = require("express-validator");

exports.createEmployee = [
  body("firstName").trim().notEmpty(),
  body("lastName").trim().notEmpty(),
  body("email").isEmail().normalizeEmail(),
  body("department").optional().trim(),
];

exports.updateEmployee = [
  param("id").isInt(),
  body("firstName").optional().trim(),
  body("lastName").optional().trim(),
  body("email").optional().isEmail().normalizeEmail(),
  body("department").optional().trim(),
  body("isActive").optional().isBoolean(),
];
