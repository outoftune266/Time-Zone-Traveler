// Requiring necessary npm packages
const express = require("express");
//const session = require("express-session");
const dotenv = require("dotenv").config();

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");


// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// We need to use sessions to keep track of our user's login status
//app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/food-api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});


