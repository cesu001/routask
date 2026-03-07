const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const profileRoute = require("./routes").profile;
const taskRoute = require("./routes").task;
const chatRoute = require("./routes").chat;
const passport = require("passport");
require("./config/passport")(passport);
const clientOrigin = process.env.CLIENT_ORIGIN;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.0.37:5173", clientOrigin],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Routes
app.use("/api/user", authRoute);
app.use(
  "/api/profile",
  passport.authenticate("jwt", { session: false }),
  profileRoute,
);
app.use(
  "/api/task",
  passport.authenticate("jwt", { session: false }),
  taskRoute,
);
app.use("/api/chat", chatRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`CORS allowed for: ${clientOrigin}`);
});
