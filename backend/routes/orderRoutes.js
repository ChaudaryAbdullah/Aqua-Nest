import express from "express";
import { Order } from "../models/orderModel.js";

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

export default router;
