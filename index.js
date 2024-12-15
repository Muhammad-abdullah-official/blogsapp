// loading environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

// Importing necessary modules
import express from "express"; // Web framework
import morgan from "morgan"; // HTTP request logger
import helmet from "helmet"; // Secure HTTP headers
import cors from "cors"; // Cross-Origin Resource Sharing
import rateLimit from "express-rate-limit"; // Request rate limiting
import dbConnect from "./config/db.js"; // Database connection
import authRoutes from "./routes/authRoutes.js"; // Authentication routes
import userRoutes from "./routes/userRoutes.js"; // User-related routes
import blogRoutes from "./routes/blogRoutes.js"; // Blog-related routes

// Define port
const Port = process.env.PORT || 5000;

// Connect to the database
dbConnect();

// Initialize Express application
const app = express();

// Middleware for logging HTTP requests in the 'combined' format (includes detailed info)
app.use(morgan("combined"));

// Middleware for securing HTTP headers
app.use(helmet());

// CORS setup to allow all origins (since you don't have your own domain)
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Restrict allowed HTTP methods
  })
);

// Rate limiting to prevent too many requests from a single IP (to avoid DDoS)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes time window
  max: 100, // Limit to 100 requests per IP within the time window
  message: "Too many requests, please try again later.",
});
app.use("/api", limiter); // Apply rate limiter only to API routes

// Middleware for parsing incoming JSON requests
app.use(express.json());

// Register routes for user authentication, user data, and blog API
app.use("/user", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

// Global error handler for unhandled errors in the application
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({ message: "Something went wrong!" }); // Send generic error message
});

// Handle uncaught exceptions (fatal errors in the app) and unhandled promise rejections
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception: ", err);
  process.exit(1); // Exit application if there is an uncaught exception
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection: ", reason);
  process.exit(1); // Exit application if there is an unhandled promise rejection
});

// Start the server and listen on the specified port
app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});
