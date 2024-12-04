import { Router } from "express";
import * as loginController from "../controllers/loginController.js";

export const loginRoute = Router();

loginRoute.get("/", loginController.getLogin);
loginRoute.post("/", loginController.postLogin);
