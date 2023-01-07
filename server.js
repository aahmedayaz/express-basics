const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

const db = [
  {
    name: "Ahmed Ayaz",
    age: 20,
  },
  {
    name: "Ahmed Faraz",
    age: 20,
  },
  {
    name: "Rashid",
    age: 20,
  },
];

// @route   GET /
// @desc    Get greetings message
// @access  Public
app.get("/", (req, res) => {
  res.send(`Welcome to backend app developed by ${process.env.NAME}`);
});

// ================================================================================
// User CRUD
// ================================================================================

// @route   GET /api
// @desc    Get all Users
// @access  Public
app.get("/api", (req, res) => {
  try {
    res.status(200).send(db);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route   POST /api
// @desc    Add a User
// @access  Public
app.post("/api", (req, res) => {
  try {
    let { name, age } = req.body;
    console.log(req.body);
    // const name = req.body.name;
    // const age = req.body.age;
    name = name?.trim();

    if (!name || name == "") {
      return res.status(400).send("Bad Request: Name is missing.");
    }
    if (!age) {
      return res.status(400).send("Bad Request: Age is missing.");
    }
    db.push({ name, age });
    res.status(200).send(db);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route   GET /api
// @desc    Get all Users
// @access  Public
app.get("/api", (req, res) => {
  try {
    res.status(200).send(db);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route   GET /api
// @desc    Get all Users
// @access  Public
app.get("/api", (req, res) => {
  try {
    res.status(200).send(db);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, null, () => {
  console.log(`Your server has been started on http://localhost:${PORT}`);
});
