import { Request, Response, Router } from "npm:express";
import * as trendingController from "../controllers/trendingCotroller.ts";

export const trendingRoute = Router();

trendingRoute.use("/", trendingController.getTrendingMovies);
