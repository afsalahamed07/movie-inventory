#! /usr/bin/env deno -A

import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

async function main() {
  const client = new Client({
    user: "afsalahamed",
    database: "inventory_odin",
    hostname: "localhost",
    port: 5432,
  });

  try {
    await client.connect();

    // Use a for-loop to handle async/await properly
    for (const genre of genres) {
      await client.queryArray(
        `INSERT INTO genres (id, name) VALUES ($1, $2)`,
        [genre.id, genre.name],
      );
    }

    console.log("Genres populated successfully");
  } catch (error) {
    console.error("Error while populating genres:", error);
  } finally {
    await client.end();
  }
}

main();
