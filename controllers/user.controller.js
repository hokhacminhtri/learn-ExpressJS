var db = require("../db");
const shortid = require("shortid");

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value(),
  });
};

module.exports.search = (req, res) => {
  let q = req.query.q;
  let matchedUsers = db
    .get("users")
    .value()
    .filter((user) => {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  res.render("users/index", {
    users: matchedUsers,
  });
};

module.exports.create = (req, res) => {
  console.log(req.cookies);
  res.render("users/create");
};

module.exports.get = (req, res) => {
  let id = req.params.id;

  let user = db.get("users").find({ id: id }).value();

  console.log(user);

  res.render("users/view", {
    user: user,
  });
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();

  console.log(res.locals);

  db.get("users").push(req.body).write();
  res.redirect("/users");
};
