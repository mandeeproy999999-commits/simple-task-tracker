const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const path = require("path");
const taskRoutes = require("./routes/taskRoutes");

require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/api", (req, res) => {
    res.json({
        message: "Task Tracker API Running 🚀"
    });
});

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;