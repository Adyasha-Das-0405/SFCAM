import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.postgres,
  host: process.env.localhost,
  database: process.env.sfcam_db,
  password: process.env.diya@2005,
  port: process.env.5432,
});

export default pool;