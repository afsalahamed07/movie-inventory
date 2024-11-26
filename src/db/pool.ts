import { Pool } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

const POOL_CONNECTIONS = 20; // TODO: move to env

export const pool = new Pool(
  {
    hostname: "localhost",
    user: "afsalahamed",
    database: "inventory_odin",
    port: 5432,
  },
  POOL_CONNECTIONS,
);
