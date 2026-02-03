import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import subscriptionRoutes from "./routes/subscriptions.js";
import myCoursesRoutes from "./routes/myCourses.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware - Simple CORS for development
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Health check
app.get("/", (req, res) => {
  res.json({ message: "cwlAssign Course Subscription API" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/subscribe", subscriptionRoutes);
app.use("/", myCoursesRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server accessible at http://localhost:${PORT}`);
});
