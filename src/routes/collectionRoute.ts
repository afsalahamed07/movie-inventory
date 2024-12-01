// @deno-types="npm:@types/express"
import { Router } from "express";
import * as collectionController from "../controllers/collectionController.ts";

export const collectionRoute = Router();

collectionRoute.post("/add/:id", collectionController.postCollection);
collectionRoute.post(
  "/delete/:id",
  collectionController.postDeleteFromCollection,
);
collectionRoute.get("/", collectionController.getCollection);
