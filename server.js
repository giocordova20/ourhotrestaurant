// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data
// =============================================================
var tables = [];

var reserved = [];
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "res.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "table.html"));
  });
  

// Displays all characters
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

//displays all reservations
app.get("/api/waitlist", function(req, res) {
    return res.json(reserved);
  });
  


// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newCustomer = req.body;

  console.log(newCustomer);

  checkTables(newCustomer);

  res.json(newCustomer);
});

app.post("/api/clear", function(req, res) {
  tables = [];
  reserved = [];
});

// Starts the server to begin listening
// =============================================================
app.listen((PORT), function() {
  console.log("App listening on PORT " + PORT);
});

function checkTables(customer) {
    if(tables.length <5) {
        tables.push(customer);
    }
    else {
        reserved.push(customer);
    }
}
