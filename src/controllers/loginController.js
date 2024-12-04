/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {void}
 */
export function getLogin(req, res) {
  res.render("login-form");
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {void}
 */
export function postLogin(req, res) {
  const username = req.body.username;
  const password = req.body.password;
}
