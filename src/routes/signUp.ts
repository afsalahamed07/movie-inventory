import { Router } from "express";
import { pool } from "../db/pool";

export const signUpRoute = Router();

signUpRoute.get("/", (req, res) => {
  res.render("sign-up-form");
});

signUpRoute.post("/", async (req, res, next) => {
  try {
    await pool.query(
      "INSERT INTO users (username, password, name) VALUES ($1, $2, $3)",
      [req.body.username, req.body.password, req.body.username],
    );
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});
