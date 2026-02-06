const pool = require("../config/db");

/* CREATE */
exports.create = async ({ firstName, lastName, email, department }) => {
  const { rows } = await pool.query(
    `INSERT INTO employees (first_name, last_name, email, department)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [firstName, lastName, email, department]
  );
  return rows[0];
};

/* READ ALL (pagination + tri + filtre) */
exports.findAll = async ({
  page,
  limit,
  sortBy,
  order,
  department,
  isActive,
}) => {
  const offset = (page - 1) * limit;
  const values = [];
  let query = `SELECT * FROM employees WHERE 1=1`;

  if (department) {
    values.push(department);
    query += ` AND department=$${values.length}`;
  }

  if (isActive !== undefined) {
    values.push(isActive);
    query += ` AND is_active=$${values.length}`;
  }

  query += ` ORDER BY ${sortBy} ${order}
             LIMIT $${values.length + 1}
             OFFSET $${values.length + 2}`;

  values.push(limit, offset);

  const { rows } = await pool.query(query, values);
  return rows;
};

/* READ ONE */
exports.findById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM employees WHERE id=$1",
    [id]
  );
  return rows[0];
};

/* UPDATE */
exports.update = async (id, data) => {
  const fields = [];
  const values = [];

  Object.entries(data).forEach(([key, value]) => {
    values.push(value);
    fields.push(`${key}=$${values.length}`);
  });

  const query = `
    UPDATE employees SET ${fields.join(", ")}
    WHERE id=$${values.length + 1}
    RETURNING *
  `;

  values.push(id);
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/* DELETE */
exports.remove = async (id) => {
  await pool.query("DELETE FROM employees WHERE id=$1", [id]);
};

/* SEARCH */
exports.search = async (q) => {
  const { rows } = await pool.query(
    `SELECT * FROM employees
     WHERE LOWER(first_name) LIKE LOWER($1)
        OR LOWER(last_name) LIKE LOWER($1)
        OR LOWER(email) LIKE LOWER($1)`,
    [`%${q}%`]
  );
  return rows;
};

/* STATS */
exports.stats = async () => {
  const { rows } = await pool.query(`
    SELECT
      COUNT(*) AS total,
      COUNT(*) FILTER (WHERE is_active=true) AS active,
      COUNT(*) FILTER (WHERE is_active=false) AS inactive
    FROM employees
  `);
  return rows[0];
};
