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

const middleware1 = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware1, (req, res) => {
  res.send({
    time: req.time,
  });
});

//using route parameter
app.get("/:word/echo", (req, res) => {
  res.send({
    echo: req.params.word,
  });
});

//using query parameter
app.get("/name", (req, res) => {
  // console.log(req.query);
  res.send({ name: `${req.query.first} ${req.query.last}` });
});

module.exports = app;
