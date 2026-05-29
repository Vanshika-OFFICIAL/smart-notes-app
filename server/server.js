const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const auth = require("./middleware/auth");
const authRoutes = require("./routes/authRoutes");
const app = express();
const noteRoutes = require("./routes/noteRoutes");
const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.VITE_CLIENT_URL,
    ],
    credentials: true,
  })
);
app.get("/api/protected", auth, (req, res) => {
  res.json({ msg: "Protected OK", userId: req.user.id });
});
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
const connectDB = require("./config/db");
connectDB();

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});