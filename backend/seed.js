import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { User } from "./models/User.js";
import { Course } from "./models/Course.js";
import mongoose from "mongoose";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data (optional - comment out if you want to keep existing data)
    await User.deleteMany({});
    await Course.deleteMany({});

    // Create dummy users
    const users = [
      {
        email: "alokshukla6060@gmail.com",
        password: "alok123",
        name: "alok",
      },
      {
        email: "jane@example.com",
        password: "password123",
        name: "Jane Smith",
      },
      {
        email: "admin@example.com",
        password: "admin123",
        name: "Admin User",
      },
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create courses
    const courses = [
      {
        title: "Introduction to React",
        description:
          "Learn the fundamentals of React including components, props, state, and hooks. Build your first React application from scratch.",
        price: 49.99,
        image: "https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmVhY3Rqc3xlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        title: "Advanced JavaScript",
        description:
          "Master advanced JavaScript concepts including closures, promises, async/await, and design patterns.",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800",
      },
      {
        title: "Node.js Backend Development",
        description:
          "Build scalable backend applications with Node.js, Express, and MongoDB. Learn RESTful API design and authentication.",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      },
      {
        title: "Web Development Basics",
        description:
          "A comprehensive introduction to HTML, CSS, and JavaScript for beginners. Start your web development journey here.",
        price: 0, // Free course
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
      },
      {
        title: "Full Stack Development",
        description:
          "Complete full-stack development course covering frontend, backend, databases, and deployment strategies.",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      },
      {
        title: "Python for Beginners",
        description:
          "Learn Python programming from scratch. Perfect for beginners who want to start their programming journey.",
        price: 0, // Free course
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
      },
    ];

    const createdCourses = await Course.insertMany(courses);
    console.log(`✅ Created ${createdCourses.length} courses`);

    console.log("\n📝 Dummy User Credentials:");
    console.log("1. Email: john@example.com, Password: password123");
    console.log("2. Email: jane@example.com, Password: password123");
    console.log("3. Email: admin@example.com, Password: admin123");
    console.log("\n🎓 Valid Promo Code: BFSALE25 (50% discount)");

    console.log("\n✅ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedData();
