import * as bcrypt from "bcryptjs";
import { insertIntoUsers } from "../db/queries";
import passport from "passport";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {void}
 */
export function getRegister(req, res) {
  res.render("register");
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {void}
 */
export function postRegister(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  /** @type import("../types/User").User */
  const user = {
    username: username,
    password: password,
    name: name,
  };

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    // if err, do something
    // otherwise, store hashedPassword in DB
    user.password = hashedPassword;
    insertIntoUsers(user);
  });

  res.redirect("/login");
}
