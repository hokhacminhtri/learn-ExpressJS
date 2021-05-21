require("dotenv").config();
console.log(process.env.SESSION_SECRET);

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var userRoute = require("./routes/user.route");
var authRoute = require("./routes/auth.route");
var productRoute = require("./routes/product.route");

var authMiddleware = require("./middlewares/auth.middleware");

const port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser("ahiiasdasjkld14"));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {
    name: "Users",
  });
});

app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/auth", authRoute);
app.use("/products", productRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
