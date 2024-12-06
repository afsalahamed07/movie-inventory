/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {void}
 */
export function getLogin(req, res) {
  res.render("login-form");
}
