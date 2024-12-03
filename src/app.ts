import express, { NextFunction, Request, Response } from "express";
import { trendingRoute } from "./routes/trendingRoute.ts";
import { collectionRoute } from "./routes/collectionRoute.ts";
import path from "path";
import { fileURLToPath } from "url";
import { genreRouter } from "./routes/genreRouter.ts";
import * as crypto from "crypto";
import cookieParser from "cookie-parser";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewsPath = path.join(__dirname, "views");

const assetPath = path.join(__dirname, "public");

const sessions = {}; // Format: { sessionId: { userData, expiresAt } }
const SESSION_LIFETIME = 3600000; // 1 hour in milliseconds

const generateSessionId = () => crypto.randomBytes(16).toString("hex");

const sessionMiddleware = (req, res, next) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId || !sessions[sessionId]) {
    return res.status(401).send({ message: "Unauthorized: Invalid session" });
  }

  if (sessions[sessionId].expiresAt < Date.now()) {
    delete sessions[sessionId];
    return res
      .status(401)
      .send({ message: "Session expired, please log in again" });
  }

  req.session = sessions[sessionId].userData;
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(assetPath));

app.set("views", viewsPath);
app.set("view engine", "ejs");

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

app.use("/", trendingRoute);
app.use("/collection", collectionRoute);
app.use("/genre", genreRouter);

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Replace with real authentication logic
  if (username === "test" && password === "1234") {
    const sessionId = generateSessionId();
    const expiresAt = Date.now() + SESSION_LIFETIME;

    // Store session data on the server
    sessions[sessionId] = { userData: { username }, expiresAt };

    // Set a cookie with the session ID
    res.cookie("sessionId", sessionId, {
      httpOnly: true, // Prevent JavaScript access
      secure: false, // Use true in production with HTTPS
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: SESSION_LIFETIME, // 1 hour
    });

    res.send({ message: "Login successful" });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

app.get("/dashboard", sessionMiddleware, (req, res) => {
  res.send({ message: `Welcome, ${req.session.username}` });
});

console.log(sessions);

app.listen(3000, () => console.log(`Listening at PORT: 3000`));
