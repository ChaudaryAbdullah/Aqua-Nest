import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACK_END_LINK } from "../config";

const Payment = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [cart, setCart] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dataString = localStorage.getItem("data");
    const userData = dataString ? dataString : null;
    if (!userData) {
      navigate("/login");
    } else {
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
    }
    console.log(user);
    const cartString = localStorage.getItem("cart");
    const storedCart = cartString ? JSON.parse(cartString) : null;
    if (storedCart) setCart(storedCart);
  }, []);

  const calculateTotal = () => {
    return Object.values(cart).reduce(
      (acc: number, item: any) => acc + item.product.price * item.quantity,
      0
    );
  };

  const handleOrder = async () => {
    if (!address || !city || !postalCode || !country) {
      toast.error("Please fill in all address fields.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });

      return;
    }

    const orderData = {
      userId: user._id,
      products: Object.entries(cart).map(
        ([_, { product, quantity }]: [string, any]) => ({
          product: product._id,
          quantity,
        })
      ),
      totalAmount: calculateTotal(),
      shippingAddress: {
        address,
        city,
        postalCode,
        country,
      },
    };

    try {
      console.log(orderData);
      const response = await axios.post(
        `${BACK_END_LINK}/api/orders`,
        orderData
      );
      toast.success("Order placed successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });

      localStorage.removeItem("cart");
      navigate("/order"); // or redirect to /orders or a success page
    } catch (error) {
      console.error("Order creation failed", error);
      toast.error("Order failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

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
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
          <h2 className="text-2xl font-bold mb-4">Order Details</h2>
          {Object.values(cart).map((item: any, idx: number) => (
            <div
              key={item.product?._id || idx}
              className="mb-2 flex justify-between"
            >
              <span className="flex items-center gap-2 font-medium text-gray-800">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                  {item.product?.name}
                </span>
                <span className="text-xs text-gray-500">× {item.quantity}</span>
              </span>
              <span className="font-semibold text-blue-700">
                Rs {item.product?.price * item.quantity}
              </span>
            </div>
          ))}
          <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="input w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="input w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleOrder}
          >
            Confirm Order - Rs {calculateTotal()}
          </button>
        </div>
      </section>
    </motion.div>
  );
};

export default Payment;
