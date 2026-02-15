import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "db",          // IMPORTANT → this is docker service name
  database: "expense_db",
  password: "postgres",
  port: 5432,
});

export default pool;
