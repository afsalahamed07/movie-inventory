import { Router } from "express";
import * as loginController from "../controllers/loginController.js";
import passport from "../middleware/passport.js";

export const loginRoute = Router();

loginRoute.get("/", loginController.getLogin);
loginRoute.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/error",
  }),
);
