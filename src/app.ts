// @deno-types="npm:@types/express"
import express, { Request, Response } from "npm:express";
import { trendingRoute } from "./routes/trendingRoute.ts";
import * as path from "jsr:@std/path";

const app = express();
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const viewsPath = path.join(__dirname, "views");

const assetPath = path.join(__dirname, "public");
app.use(express.static(assetPath));

app.set("views", viewsPath);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", trendingRoute);

app.listen(3000, () => console.log(`Listening at PORT: 3000`));
