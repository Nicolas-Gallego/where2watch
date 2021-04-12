const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth"); //Import routes
const filmsRoute = require("./routes/filmInfo"); //Import films
const cors = require("cors");

//Connect to db
mongoose.connect(
  "mongodb://localhost:27017/w2w",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("db connect........");
  }
);

//Middlewares
app.use(express.json());
app.use(cors());

//Route Middlewares
app.use("/user", authRoute) ;

app.use("/films", filmsRoute);

app.listen(8000, () => {
  console.log("Server running port 8000.......");
});
