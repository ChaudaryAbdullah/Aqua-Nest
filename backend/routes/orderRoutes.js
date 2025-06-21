import express from "express";
import { Order } from "../models/orderModel.js";
import { isAdmin } from "../middleWare/isAdmin.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, products, totalAmount, shippingAddress } = req.body;

    console.log("Order data:", req.body);

    if (!userId || !products || !totalAmount || !shippingAddress) {
      return res.status(400).json({ message: "Missing order data" });
    }

    const order = new Order({
      user: userId,
      products: products,
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      status: "Pending", // Default status
    });
    console.log("Creating order:", order);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
});

// backend/routes/order.js
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate(
      "products.product"
    );
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("products.product");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

router.put("/:id/status", isAdmin, async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const { status } = req.body;

  try {
    console.log(id);
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
export default router;
