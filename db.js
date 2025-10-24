import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "konumdb",
  password: "postgres",
  port: 5432
});

export async function saveLocation({ id, lat, lng }) {
  await pool.query(
    `INSERT INTO locations (user_id, geom)
     VALUES ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326))
     ON CONFLICT (user_id) DO UPDATE
     SET geom = EXCLUDED.geom;`,
    [id, lng, lat]
  );
}

export async function getAllLocations() {
  const res = await pool.query(
    `SELECT user_id, ST_Y(geom) as lat, ST_X(geom) as lng FROM locations;`
  );
  return res.rows;
}