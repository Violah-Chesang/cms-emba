const mongoose = require("mongoose");

// Type Schema
const inventoryTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subtypes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subtype" }],
});

// Subtype Schema
const inventorySubtypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: mongoose.Schema.Types.ObjectId, ref: "inventoryType", required: true },
});

// Item Schema
const inventoryItemSchema = new mongoose.Schema({
  type: { type: mongoose.Schema.Types.ObjectId, ref: "inventoryType", required: true },
  subtype: { type: mongoose.Schema.Types.ObjectId, ref: "inventorySubtype" },
  serialNumber: { type: String },
  description: { type: String },
  quantity: { type: Number, default: 1 },
  location: { type: String },
  purchaseDate: { type: Date },
  status: { type: String },
  condition: { type: String },
});

const inventoryType = mongoose.model("inventoryType", inventoryTypeSchema);
const inventorySubtype = mongoose.model("inventorySubtype", inventorySubtypeSchema);
const inventoryItem = mongoose.model("inventoryItem", inventoryItemSchema);

module.exports = { inventoryType, inventorySubtype, inventoryItem };
