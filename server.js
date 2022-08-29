const express = require("express");
const app = express();
const path = require('path')
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
/* app.use(express.static(path.join(__dirname, 'build'))); */
app.use("/", require("./routes/todo.js"));
app.use("/auth", require("./routes/auth.js"));

/* app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
}); */

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
 }

// set port, listen for requests
const PORT = process.env.PORT || 5050;
const MONGODB_URI = process.env.MONGODB_URI;
//const MONGO_LOCAL = "mongodb://127.0.0.1/backend2"

mongoose
.connect(MONGODB_URI)
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
