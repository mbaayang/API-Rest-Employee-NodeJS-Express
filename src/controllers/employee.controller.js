const service = require("../services/employee.service");

/* CREATE */
exports.createEmployee = async (req, res) => {
  const employee = await service.create(req.body);
  res.status(201).json(employee);
};

/* READ ALL */
exports.getEmployees = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "id",
    order = "asc",
    department,
    isActive,
  } = req.query;

  const employees = await service.findAll({
    page: +page,
    limit: +limit,
    sortBy,
    order,
    department,
    isActive:
      isActive !== undefined ? isActive === "true" : undefined,
  });

  res.json(employees);
};

/* READ ONE */
exports.getEmployeeById = async (req, res) => {
  const employee = await service.findById(req.params.id);
  if (!employee)
    return res.status(404).json({ message: "Employee not found" });
  res.json(employee);
};

/* UPDATE */
exports.updateEmployee = async (req, res) => {
  const updated = await service.update(req.params.id, req.body);
  res.json(updated);
};

/* DELETE */
exports.deleteEmployee = async (req, res) => {
  await service.remove(req.params.id);
  res.status(204).send();
};

/* SEARCH */
exports.searchEmployees = async (req, res) => {
  const results = await service.search(req.query.q || "");
  res.json(results);
};

/* STATS */
exports.getStats = async (req, res) => {
  const stats = await service.stats();
  res.json(stats);
};
