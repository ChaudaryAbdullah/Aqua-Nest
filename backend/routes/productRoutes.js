import express from "express";
import { Product } from "../models/productModel.js";
const router = express.Router();

// @route   POST /api/products
// @desc    Create a new product
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.price ||
      !req.body.category ||
      !req.body.size ||
      !req.body.stock ||
      !req.body.description ||
      !req.body.imageUrl
    ) {
      return res.status(400).json({
        error:
          "Name, price, category, size, stock, description, and imageUrl are required",
      });
    }
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   GET /api/products
// @desc    Get all products or filter by query
router.get("/", async (req, res) => {
  try {
    const { category, size, name } = req.query;
    let filter = {};

    if (category && category !== "all") filter.category = category;
    if (size && size !== "all") filter.size = size;
    if (name) filter.name = new RegExp(name, "i");

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
