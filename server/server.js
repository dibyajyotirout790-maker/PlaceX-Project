// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const connectDB = require("./config/db");

// const authRoutes = require("./routes/authRoutes");
// const jobRoutes = require("./routes/jobRoutes");
// const applicationRoutes = require("./routes/applicationRoutes");
// const profileRoutes = require("./routes/profileRoutes");

// const app = express();

// // Middleware
// app.use(
//     cors({
//         origin: [
//             "http://localhost:4200",
//             "https://place-x-project.vercel.app"
//         ],
//         methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//         allowedHeaders: ["Content-Type", "Authorization"],
//         credentials: true
//     })
// );

// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/jobs", jobRoutes);
// app.use("/api/applications", applicationRoutes);
// app.use("/api/profile", profileRoutes);

// // Health check
// app.get("/", (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "PlaceX API is running"
//     });
// });

// // Database connection
// connectDB().catch((err) => {
//     console.error("MongoDB connection error:", err.message);
// });

// // Local development only
// const PORT = process.env.PORT || 5000;

// if (process.env.NODE_ENV !== "production") {
//     app.listen(PORT, () => {
//         console.log(`PlaceX server running on port ${PORT}`);
//     });
// }

// module.exports = app;

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:4200",
            "https://place-x-project.vercel.app"
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "PlaceX API is running"
    });
});
app.get("/api/health", async (req, res) => {
    try {
        await connectDB();

        res.status(200).json({
            success: true,
            message: "PlaceX backend and MongoDB are healthy",
            mongoConfigured: !!process.env.MONGO_URI,
            jwtConfigured: !!process.env.JWT_SECRET,
            mongoConnected: true,
            nodeEnv: process.env.NODE_ENV || "undefined"
        });

    } catch (error) {

        console.error("Health check MongoDB error:", error);

        res.status(503).json({
            success: false,
            message: "PlaceX backend is running but MongoDB is unavailable",
            mongoConfigured: !!process.env.MONGO_URI,
            jwtConfigured: !!process.env.JWT_SECRET,
            mongoConnected: false,
            error: error.message,
            nodeEnv: process.env.NODE_ENV || "undefined"
        });
    }
});

// Ensure MongoDB is connected before database-dependent routes
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database unavailable:", error.message);

        return res.status(503).json({
            success: false,
            message: "Database unavailable",
            error: error.message
        });
    }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`PlaceX server running on port ${PORT}`);
    });
}

module.exports = app;