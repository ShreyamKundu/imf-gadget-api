const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../middlewares/authMiddleware");
const generateCodename = require("../utils/generateCodename");
const prisma = new PrismaClient();
const router = express.Router();

/**
 * @route   POST /gadgets
 * @desc    Add a new gadget
 * @access  Private (Requires authentication)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const codename = generateCodename();

    const gadget = await prisma.gadget.create({
      data: {
        name: codename,
      },
    });

    res.status(201).json(gadget);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

/**
 * @route   GET /gadgets
 * @desc    Retrieve all gadgets (Optional filter by status)
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    let gadgets;

    if (status) {
      gadgets = await prisma.gadget.findMany({
        where: {
          status,
        },
      });
    } else {
      gadgets = await prisma.gadget.findMany();
    }

    // Add random mission success probability to each gadget
    const gadgetsWithProbability = gadgets.map((gadget) => ({
      ...gadget,
      missionSuccessProbability: Math.floor(Math.random() * 91) + 10, // Random success probability
    }));

    res.json(gadgetsWithProbability);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

/**
 * @route   PATCH /gadgets/:id
 * @desc    Update an existing gadget (Name and status)
 * @access  Private (Requires authentication)
 */
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    // Find the gadget by its id
    const gadget = await prisma.gadget.findUnique({ where: { id } });

    // If the gadget doesn't exist, return a 404 error
    if (!gadget) {
      return res.status(404).json({ message: "Gadget not found" });
    }

    const updateData = {};

    if (name) updateData.name = name;
    if (status) updateData.status = status;

    const updatedGadget = await prisma.gadget.update({
      where: { id },
      data: updateData,
    });

    res.json(updatedGadget); 
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

/**
 * @route   DELETE /gadgets/:id
 * @desc    Soft delete a gadget (Mark as 'Decommissioned' with a timestamp)
 * @access  Private (Requires authentication)
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await prisma.gadget.findUnique({ where: { id } });

    // If the gadget doesn't exist, return a 404 error
    if (!gadget) {
      return res.status(404).json({ message: "Gadget not found" });
    }

    const updatedGadget = await prisma.gadget.update({
      where: { id },
      data: {
        status: "Decommissioned",
        decommissionedAt: new Date(),
      },
    });

    res.json({ message: "Gadget decommissioned", gadget: updatedGadget });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

/**
 * @route   POST /gadgets/:id/self-destruct
 * @desc    Trigger the self-destruct sequence for a gadget
 * @access  Private (Requires authentication)
 */
router.post("/:id/self-destruct", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const gadget = await prisma.gadget.findUnique({ where: { id } });

    if (!gadget) {
      return res.status(404).json({ message: "Gadget not found" });
    }

    if (gadget.status === "Destroyed") {
      return res.status(400).json({ message: "Gadget already destroyed" });
    }

    // Generate a random 6-digit confirmation code
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);

    await prisma.gadget.update({
      where: { id },
      data: {
        status: "Destroyed",
      },
    });

    res.json({
      message: "Self-destruct sequence initiated",
      confirmationCode,
      note: "Use this code to confirm self-destruction (simulation only).",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;