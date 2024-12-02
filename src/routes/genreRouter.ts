import { Router } from "express";
import { genreController } from "../controllers/genreController";

export const genreRouter = Router();

genreRouter.get("/:genre", genreController);
