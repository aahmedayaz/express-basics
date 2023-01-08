// ================================================================================
//                    Assignment # 03 
//                    
//        MEMBERS --->  1-  Ahmed Ayaz
//                      2-  Muhammad Araib     
//                      3-  Jawad Ahmed
// ================================================================================

const express = require("express");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid"); // For Generating ID's
dotenv.config();

const app = express();
app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 5000;

let users_database = [
  { id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", name: "Ahmed Ayaz", age: 20 },
  { id: "2b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", name: "Muhammad Araib", age: 20 },
  { id: "3b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", name: "Jawad Ahmed", age: 40 },
];

// @route   GET /
// @desc    Get greetings message
// @access  Public
app.get("/", (req, res) => {
  return res.send(`Welcome to backend app developed by ${process.env.NAME}`);
});

// ================================================================================
// User CRUD
// ================================================================================

// @route   GET /users
// @desc    Get all Users
// @access  Public
app.get("/users", (req, res) => {
  try {
    return res.status(200).send(users_database);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

// @route   GET /users/:id
// @desc    Get a user
// @access  Public
app.get("/users/:id", (req, res) => {
  try {
    const id = req.params.id;
    const user = users_database.filter((user) => user.id === id)[0];
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

// @route   POST /users
// @desc    Add all Users
// @access  Public
app.post("/users", (req, res) => {
  try {
    // 1. Get user from body
    let { name, age } = req.body;

    // 2. Validate data
    name = name?.trim();
    if (!name || name == "") {
      return res.status(400).send("Bad Request: Name is missing.");
    }
    if (!age) {
      return res.status(400).send("Bad Request: Age is missing.");
    }

    // 3. Add user inside database
    const id = uuidv4();
    users_database.push({ id, name, age });

    // 4. send response
    return res.status(200).send(users_database);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

// @route   PUT /users/:id
// @desc    Update User
// @access  Public
app.put("/users/:id", (req, res) => {
  try {
    // 1. Get user from body
    let { name, age } = req.body;

    // 2. Validate data
    name = name?.trim();
    if (!name || name == "") {
      return res.status(400).send("Bad Request: Name is missing.");
    }
    if (!age) {
      return res.status(400).send("Bad Request: Age is missing.");
    }

    // 3. Update user
    const id = req.params.id;
    users_database = users_database.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          name,
          age,
        };
      } else {
        return user;
      }
    });

    // 4. send response
    return res.status(200).send(users_database);
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

// @route   DELETE /users/:id
// @desc    Delete User
// @access  Public
app.delete("/users/:id", (req, res) => {
  try {
    const id = req.params.id;
    let found = false;

    users_database.forEach((user) => {
      if (user.id === id) {
        found = true;
      }
    });

    if (!found) {
      return res.status(400).send("Bad Request: User not found.");
    }

    users_database = users_database.filter((user) => user.id !== id);

    return res.status(200).send("User has been deleted.");
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

app.listen(PORT, null, () => {
  console.log(`Your server has been started on http://localhost:${PORT}`);
});
