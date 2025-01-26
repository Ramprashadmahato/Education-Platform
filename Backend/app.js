const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/Db/config");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const opportunityRoutes = require("./src/routes/opportunityRoutes");
const SubmissionRoutes = require("./src/routes/submissionRoutes")

const notificationRoutes = require("./src/routes/notificationRoutes");

const cors = require("cors");
// require("dotenv").config();




dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();


// Modular routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/submissions", SubmissionRoutes);
app.use("/api/notifications", notificationRoutes);


// Static files
app.use("/uploads", express.static("Public/uploads"));

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 300).json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

