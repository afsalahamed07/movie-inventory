import { Router } from "express";
import * as collectionController from "../controllers/collectionController.js";

export const collectionRoute = Router();

collectionRoute.post("/add/:id", collectionController.postCollection);
collectionRoute.post(
  "/delete/:id",
  collectionController.postDeleteFromCollection,
);
collectionRoute.get("/", collectionController.getCollection);
