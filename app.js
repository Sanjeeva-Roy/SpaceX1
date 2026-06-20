require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const missionRoutes = require("./routes/missionRoutes");

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

// Static Files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", authRoutes);
app.use("/", missionRoutes);

// Default Route
app.get("/", (req, res) => {
    res.redirect("/login");
});

// Server
const PORT = process.env.PORT || 3021;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});