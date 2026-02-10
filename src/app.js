require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require("./middlewares/rateLimiter");

const employeeRoutes = require("./routes/employee.route");

const app = express();

app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(rateLimiter);
app.use(express.json());

app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Employee API");
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date()
  });
});

module.exports = app;
