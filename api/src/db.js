const { Pool } = require("pg");

// All config comes from environment variables — this is deliberate.
// Later phases (ConfigMap/Secret, Vault) replace how these values are
// supplied, but the app code itself never changes.
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "devops",
  password: process.env.DB_PASSWORD || "devops",
  database: process.env.DB_NAME || "devops_app",
});

module.exports = { pool };
