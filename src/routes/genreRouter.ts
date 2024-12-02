import { Router } from "express";
import { genreController } from "../controllers/genreController";
import { postCollection } from "../controllers/collectionController";

export const genreRouter = Router();

genreRouter.get("/:genre", genreController);

genreRouter.post("/collection/add/:id", postCollection);
