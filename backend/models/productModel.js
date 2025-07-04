import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String, required: true },
  stock: { type: Number, required: true },
  ratings: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
});

export const Product = mongoose.model("Product", productSchema);
