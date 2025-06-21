import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const [user, setUser] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#history") {
      const el = document.getElementById("history");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    const dataString = localStorage.getItem("data");
    const userData = dataString ? dataString : null;

    const fetchUser = async () => {
      try {
        console.log(BACK_END_LINK);
        const response = await axios.get(
          `${BACK_END_LINK}/api/users/${userData}`
        );
        if (!response) {
          console.error("Something went wrong!");
        }

        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${BACK_END_LINK}/api/orders/user/${user._id}`
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };
    fetchOrders();
  }, [user]);

  const currentOrders = orders.filter((o) => o.status !== "Delivered");
  const pastOrders = orders.filter((o) => o.status === "Delivered");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-10 bg-blue-500"
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-500 to-white/95 overflow-hidden">
        <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>
      </section>

      {/* Current Orders */}
      <div className="bg-white/95">
        <div className="max-w-5xl mx-auto py-10 px-4">
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Current Orders</h2>
            {currentOrders.length === 0 ? (
              <p className="text-gray-600">No ongoing orders.</p>
            ) : (
              currentOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow-lg p-6 mb-6"
                >
                  <div className="flex justify-between mb-3">
                    <span className="font-medium">Order ID: {order._id}</span>
                    <span className="text-blue-600 font-medium">
                      Status: {order.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative w-full h-4 bg-gray-200 rounded-full mb-5 overflow-hidden">
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
                  <p className="mt-3 text-sm">Total: Rs {order.totalAmount}</p>
                </div>
              ))
            )}
          </section>

          {/* Past Orders */}
          <section>
            <h2 id="history" className="text-xl font-semibold mb-4 history">
              Order History
            </h2>
            {pastOrders.length === 0 ? (
              <p className="text-gray-600">No past orders yet.</p>
            ) : (
              pastOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-gray-50 rounded shadow p-4 mb-4"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">Order ID: {order._id}</span>
                    <span className="text-green-600 font-medium">
                      Delivered on{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
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
      </div>
    </motion.div>
  );
};

export default Orders;
