var md5 = require("md5");
var db = require("../db");

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let user = db.get("users").find({ email: email }).value();

  if (!user) {
    res.render("auth/login", {
      errors: ["User doesn't exist"],
      value: res.body,
    });
    return;
  }

  var hashedPassword = md5(password);

  if (user.password !== hashedPassword) {
    res.render("auth/login", {
      errors: ["Wrong password"],
      value: res.body,
    });
    return;
  }

  res.cookie("userId", user.id, { signed: true });
  res.redirect("/users");
};
