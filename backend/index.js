import express from "express";
import cors from "cors";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "./db.js";
import dotenv from "dotenv";
import routes from './Routes/index.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// -------------------- CORS --------------------
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,               // allow cookies/auth headers
  })
);

// Middleware
app.use(express.json());

app.use('/api/v1', routes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
