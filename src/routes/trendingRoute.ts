import { Router } from "npm:express";
import * as trendingController from "../controllers/trendingCotroller.ts";

export const trendingRoute = Router();

trendingRoute.get("/", trendingController.getTrendingMovies);
