import express, { NextFunction, Request, Response } from "express";
import { trendingRoute } from "./routes/trendingRoute.ts";
import { collectionRoute } from "./routes/collectionRoute.ts";
import path from "path";
import { fileURLToPath } from "url";
import { genreRouter } from "./routes/genreRouter.ts";
import session from "express-session";
import * as passport from "passport";
import { signUpRoute } from "./routes/signUp.ts";
import { loginRoute } from "./routes/loginRoute.js";
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewsPath = path.join(__dirname, "views");
const assetPath = path.join(__dirname, "public");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetPath));

app.set("views", viewsPath);
app.set("view engine", "ejs");

// TODO: to be removed
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

app.use("/", trendingRoute);
app.use("/collection", collectionRoute);
app.use("/genre", genreRouter);
app.use("/sign-up", signUpRoute);

app.use("/login", loginRoute);

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/error",
  }),
);

app.listen(3000, () => console.log(`Listening at PORT: 3000`));
