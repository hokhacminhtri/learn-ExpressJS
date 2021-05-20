var express = require("express");

var controller = require("../controllers/user.controller");
var validate = require("../validate/user.validate");
var authMiddleware = require("../middlewares/auth.middleware");

var router = express.Router();

// router.get("/", (req, res) => {
//   res.render("index");
// });

router.get("/", controller.index);

router.get("/cookie", function (req, res, next) {
  res.cookie("user-id", 12345);
  res.cookie("ahihi", 1221);
  res.send("Hello");
});

router.get("/search", controller.search);

router.get("/create", controller.create);

router.get("/:id", controller.get);

//validate trc khi vào controller.postCreate
router.post("/create", validate.postCreate, controller.postCreate);

module.exports = router;
