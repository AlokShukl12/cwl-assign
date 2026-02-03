import express from "express";
import { Subscription } from "../models/Subscription.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// GET /my-courses - return all courses the authenticated user subscribed to
router.get("/my-courses", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;

    const subscriptions = await Subscription.find({ userId })
      .populate("courseId", "title description price image")
      .sort({ subscribedAt: -1 });

    const myCourses = subscriptions.map((sub) => ({
      id: sub._id,
      courseId: sub.courseId._id,
      title: sub.courseId.title,
      description: sub.courseId.description,
      pricePaid: sub.pricePaid,
      subscribedAt: sub.subscribedAt,
      image: sub.courseId.image,
    }));

    res.json(myCourses);
  } catch (error) {
    console.error("Error fetching user courses:", error);
    res.status(500).json({ error: "Server error fetching user courses" });
  }
});

export default router;
