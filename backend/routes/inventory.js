const express = require("express");
const router = express.Router();
const {
  inventoryType,
  inventorySubtype,
  inventoryItem,
} = require("../models/inventory");

// Type Routes
router.post("/inventory/types", async (req, res) => {
  try {
    const { name } = req.body;
    const type = new inventoryType({ name });
    await type.save();
    res.status(201).json(type);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/inventory/types/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const type = await inventoryType.findByIdAndUpdate(
      req.params.id,
      { name },
      {
        new: true,
      }
    );
    if (!type) return res.status(404).json({ error: "Type not found" });
    res.json(type);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/inventory/types/:id", async (req, res) => {
  try {
    const type = await inventoryType.findByIdAndDelete(req.params.id);
    if (!type) return res.status(404).json({ error: "Type not found" });
    res.json({ message: "Type deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/inventory/types", async (req, res) => {
  try {
    const types = await inventoryType.find(); // No need to populate 'subtypes'
    res.json(types);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Subtype Routes
router.post("/inventory/subtypes", async (req, res) => {
  try {
    const subtype = new inventorySubtype(req.body);
    await subtype.save();
    res.status(201).json(subtype);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/inventory/subtypes/:id", async (req, res) => {
  try {
    const subtype = await inventorySubtype.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!subtype) return res.status(404).json({ error: "Subtype not found" });
    res.json(subtype);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/inventory/subtypes/:id", async (req, res) => {
  try {
    const subtype = await inventorySubtype.findByIdAndDelete(req.params.id);
    if (!subtype) return res.status(404).json({ error: "Subtype not found" });
    res.json({ message: "Subtype deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/inventory/subtypes", async (req, res) => {
  try {
    const subtypes = await inventorySubtype.find().populate("type");
    res.json(subtypes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Item Routes
router.post("/inventory/items", async (req, res) => {
  try {
    const item = new inventoryItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/inventory/items/:id", async (req, res) => {
  try {
    const item = await inventoryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/inventory/items/:id", async (req, res) => {
  try {
    const item = await inventoryItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/inventory/items", async (req, res) => {
  try {
    const items = await inventoryItem.find().populate("type subtype");
    res.json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Custom Query Routes
// Find All items by status
router.get("/inventory/items/status/:status", async (req, res) => {
  const { status } = req.params;
  try {
    const items = await inventoryItem.find({ status });
    res.json(items.length > 0 ? items : "No items found with this status");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Find All items by type
router.get("/inventory/items/type/:typeId", async (req, res) => {
  const { typeId } = req.params;
  try {
    const items = await inventoryItem.find({ type: typeId });
    res.json(items.length > 0 ? items : "No items found for this type");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Find All items by condition
router.get("/inventory/items/condition/:condition", async (req, res) => {
  const { condition } = req.params;
  try {
    const items = await inventoryItem.find({ condition });
    res.json(items.length > 0 ? items : "No items found with this condition");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Aggregate Example: Find All items and group by status
router.get("/inventory/items/aggregate/status", async (req, res) => {
  try {
    const result = await inventoryItem.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
