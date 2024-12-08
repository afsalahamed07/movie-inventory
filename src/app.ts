import express, { NextFunction, Request, Response } from "express";
import { trendingRoute } from "./routes/trendingRoute.ts";
import { collectionRoute } from "./routes/collectionRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import { genreRouter } from "./routes/genreRouter.ts";
import session from "express-session";
import { registerRoute } from "./routes/registerRoute.js";
import { loginRoute } from "./routes/loginRoute.js";
import pgSession from "connect-pg-simple";
import { pool } from "./db/pool.js";
import passport from "./middleware/passport.js";
const app = express();

const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login"); // Redirect unauthenticated users
};

const pgs = pgSession(session);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewsPath = path.join(__dirname, "views");
const assetPath = path.join(__dirname, "public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetPath));

app.use(
  session({
    store: new pgs({
      pool: pool, // Connection pool
      tableName: "user_sessions", // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
    }),
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  }),
);

app.use(passport.session());

app.set("views", viewsPath);
app.set("view engine", "ejs");

// TODO: to be removed
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Middleware to protect routes globally, except for login and register
app.use((req, res, next) => {
  const publicRoutes = ["/login", "/register", "/error"]; // Add your public routes here
  if (publicRoutes.includes(req.path)) {
    return next(); // Skip authentication for public routes
  }
  ensureAuthenticated(req, res, next);
});

app.use("/", trendingRoute);
app.use("/collection", collectionRoute);
app.use("/genre", genreRouter);
app.use("/register", registerRoute);

app.use("/login", loginRoute);

app.listen(3000, () => console.log(`Listening at PORT: 3000`));
