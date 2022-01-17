//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const newList = ["Chips", "Chocolate", "Cold Drinks"];
const workList = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  const day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems: newList
  });

});

app.post("/", (req, res) => {

  const item = req.body.addItem;

  if (req.body.list === "Work") {
    workList.push(item);
    res.redirect("/work");

  } else {
    newList.push(item);
    res.redirect("/");
  }

  console.log(req.body);
});

app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workList
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
