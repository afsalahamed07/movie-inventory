import * as bcrypt from "bcryptjs";

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

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    // if err, do something
    // otherwise, store hashedPassword in DB
  });
}
