import express from "express";
import { Subscription } from "../models/Subscription.js";
import { Course } from "../models/Course.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Valid promo code and discount
const VALID_PROMO_CODE = "BFSALE25";
const PROMO_DISCOUNT = 0.5; // 50% discount

// POST /subscribe
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { courseId, promoCode } = req.body;
    const userId = req.userId;

    if (!courseId) {
      return res.status(400).json({ error: "Course ID is required" });
    }

    // Find course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if already subscribed
    const existingSubscription = await Subscription.findOne({
      userId,
      courseId,
    });
    if (existingSubscription) {
      return res.status(400).json({ error: "Already subscribed to this course" });
    }

    let pricePaid = course.price;

    // Handle free courses
    if (course.price === 0) {
      // Free course - allow instant subscription
      const subscription = new Subscription({
        userId,
        courseId,
        pricePaid: 0,
      });
      await subscription.save();

      return res.status(201).json({
        message: "Successfully subscribed to free course",
        subscription: {
          id: subscription._id,
          courseId: course._id,
          pricePaid: 0,
          subscribedAt: subscription.subscribedAt,
        },
      });
    }

    // Handle paid courses - require promo code
    if (!promoCode) {
      return res.status(400).json({
        error: "Promo code is required for paid courses",
      });
    }

    // Validate promo code
    if (promoCode !== VALID_PROMO_CODE) {
      return res.status(400).json({ error: "Invalid promo code" });
    }

    // Apply discount
    pricePaid = course.price * (1 - PROMO_DISCOUNT);

    // Create subscription
    const subscription = new Subscription({
      userId,
      courseId,
      pricePaid,
    });
    await subscription.save();

    res.status(201).json({
      message: "Successfully subscribed to course",
      subscription: {
        id: subscription._id,
        courseId: course._id,
        pricePaid,
        originalPrice: course.price,
        discount: PROMO_DISCOUNT * 100,
        subscribedAt: subscription.subscribedAt,
      },
    });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({ error: "Server error during subscription" });
  }
});

export default router;
