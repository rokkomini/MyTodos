const express = require("express");
const app = express();

const dotenv = require("dotenv").config();

const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
// parse requests of content-type - application/json

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route

//Routes
app.use("/", require("./routes/todo.js"));
app.use("/auth", require("./routes/auth.js"));

// set port, listen for requests
const PORT = process.env.PORT || 5050;

mongoose
.connect("mongodb://127.0.0.1/backend2")
.then(() => {
    console.log("Successfully connect to MongoDB.");   ;
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
