import "dotenv/config";

const api-key = process.env.TMDB_API;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer `,
  },
};
