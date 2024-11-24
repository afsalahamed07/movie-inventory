// @deno-types="npm:@types/express"
import express, { Request, Response } from "npm:express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Dinosaur API!");
});

app.listen(3000);
