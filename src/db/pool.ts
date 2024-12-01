import * as pg from "pg";

const POOL_CONNECTIONS = 20; // TODO: move to env

export const pool = new pg.Pool({
  host: "localhost",
  user: "afsalahamed",
  database: "inventory_odin",
  port: 5432,
  max: POOL_CONNECTIONS,
});
