import { Router } from "express";
import * as regeisterController from "../controllers/registerController";

export const registerRoute = Router();

registerRoute.get("/", regeisterController.getRegister);
registerRoute.post("/", regeisterController.postRegister);
