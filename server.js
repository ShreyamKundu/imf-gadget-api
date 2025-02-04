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
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/api/health-check", (req, res) => res.send("OK"));
app.use("/api/auth", authRoutes);
app.use("/api/gadgets", gadgetsRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
