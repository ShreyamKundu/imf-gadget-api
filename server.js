require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { PrismaClient } = require("@prisma/client");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const prisma = new PrismaClient();

// Import Routes
const authRoutes = require("./routes/auth");
const gadgetsRoutes = require("./routes/gadgets");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.get("/", (req, res) => res.send("IMF Gadget API"));
app.use("/api/health-check", (req, res) => res.send("OK"));
app.use("/api/auth", authRoutes);
app.use("/api/gadgets", gadgetsRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// 404 Route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));