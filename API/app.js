const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ejs = require("ejs");

fs.readdir;

const app = express();
const port = 3000;

// middlewares
app.use(express.static("public"));

app.use(bodyParser.json());

// view engine
app.set("view engine", "ejs");

// database connection

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Your code here, e.g., starting your server or performing database operations
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

let data = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 25 },
];

app.get("/api/items", (req, res) => {
  res.json(data);
});

app.get("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find((item) => item.id === id);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(item);
});

app.post("/api/items", (req, res) => {
  const newItem = req.body;
  newItem.id = data.length + 1; // Generate a new ID
  data.push(newItem);
  res.status(201).json(newItem);
});

app.put("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = data.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  data[itemIndex] = { ...data[itemIndex], ...req.body };
  res.json(data[itemIndex]);
});

app.delete("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = data.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  const deletedItem = data.splice(itemIndex, 1);
  res.json(deletedItem[0]);
});

// Start the server
app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
