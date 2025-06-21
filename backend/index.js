import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import { PORT, DB_URL, FRONTEND_URL } from "./config.js";
import cors from "cors";
import http from "http";
import user from "./routes/userRoutes.js";
import profile from "./routes/profileRoutes.js";
import product from "./routes/productRoutes.js";
import order from "./routes/orderRoutes.js";
const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.use("/api/users", user);
app.use("/api/profile", profile);
app.use("/api/products", product);
app.use("/api/orders", order);

// Routes

app.get("/", (req, res) => {
  res.send("Welcome to the Aqua Nest API!");
});

// Start server with port fallback

server
  .listen(PORT)
  .on("listening", () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    mongoose
      .connect(DB_URL)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.error(`Error connecting to MongoDB: ${error.message}`);
      });
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      const fallbackPort = PORT + 1;
      console.warn(`Port ${PORT} is already in use. Trying ${fallbackPort}...`);

      server.listen(fallbackPort).on("listening", () => {
        console.log(
          `Fallback: Server is running on http://localhost:${fallbackPort}`
        );

        mongoose
          .connect(DB_URL)
          .then(() => {
            console.log("Connected to MongoDB");
          })
          .catch((error) => {
            console.error(`Error connecting to MongoDB: ${error.message}`);
          });
      });
    } else {
      throw err;
    }
  });
