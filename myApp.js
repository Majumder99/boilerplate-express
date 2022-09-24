let express = require("express");
let app = express();
require("dotenv").config({ path: "./config.env" });

console.log("Hello World");
const path = __dirname + "/views/index.html";

//Middleware
const middleware = (req, res, next) => {
  const method = req.method;
  const path = req.path;
  const ip = req.ip;
  console.log(`${method} ${path} - ${ip}`);
  next();
};
app.use(middleware);
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  // res.send("Hello Express");
  // console.log("Hello express");
  res.sendFile(path);
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({
      message: "HELLO JSON",
    });
  } else {
    res.json({
      message: "Hello json",
    });
  }
});

module.exports = app;
