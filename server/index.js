const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const profileRoute = require("./routes").profile;
const taskRoute = require("./routes").task;
const passport = require("passport");
require("./config/passport")(passport);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/user", authRoute);
app.use(
  "/api/profile",
  passport.authenticate("jwt", { session: false }),
  profileRoute
);
app.use(
  "/api/task",
  passport.authenticate("jwt", { session: false }),
  taskRoute
);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
