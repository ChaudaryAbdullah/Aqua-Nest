import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACK_END_LINK } from "../config";
import { motion } from "framer-motion";

type Order = {
  _id: string;
  status: string;
  products: { product: { name: string }; quantity: number }[];
  totalAmount: number;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
};

const orderStatusSteps = ["Pending", "Processing", "Shipped", "Delivered"];

const getProgress = (status: string) => {
  const index = orderStatusSteps.indexOf(status);
  return ((index + 1) / orderStatusSteps.length) * 100;
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const userId = localStorage.getItem("data");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${BACK_END_LINK}/api/orders/user/${userId}`
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };
    fetchOrders();
  }, [userId]);

  const currentOrders = orders.filter((o) => o.status !== "Delivered");
  const pastOrders = orders.filter((o) => o.status === "Delivered");

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      {/* Current Orders */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Current Orders</h2>
        {currentOrders.length === 0 ? (
          <p className="text-gray-600">No ongoing orders.</p>
        ) : (
          currentOrders.map((order) => (
            <div key={order._id} className="bg-white rounded shadow p-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Order ID: {order._id}</span>
                <span className="text-blue-600 font-medium">
                  Status: {order.status}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-4 bg-gray-200 rounded-full mb-4">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                  style={{ width: `${getProgress(order.status)}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgress(order.status)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="text-sm text-gray-600">
                {order.products.map((item, i) => (
                  <p key={i}>
                    {item.product.name} × {item.quantity}
                  </p>
                ))}
              </div>
              <p className="mt-2 text-sm">Total: Rs {order.totalAmount}</p>
            </div>
          ))
        )}
      </section>

      {/* Past Orders */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        {pastOrders.length === 0 ? (
          <p className="text-gray-600">No past orders yet.</p>
        ) : (
          pastOrders.map((order) => (
            <div key={order._id} className="bg-gray-50 rounded shadow p-4 mb-4">
              <div className="flex justify-between">
                <span className="font-medium">Order ID: {order._id}</span>
                <span className="text-green-600 font-medium">
                  Delivered on {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="text-sm text-gray-700 mt-2">
                {order.products.map((item, i) => (
                  <p key={i}>
                    {item.product.name} × {item.quantity}
                  </p>
                ))}
              </div>
              <p className="mt-2 text-sm">Total: Rs {order.totalAmount}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Orders;
