import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Star, ShoppingCart, Droplets, Search } from "lucide-react";
import axios from "axios";
import { BACK_END_LINK } from "../config";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  ratings: number;
  reviews: number;
  imageUrl: string;
  category: string;
  size: string;
  stock: number;
};

const Products = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{
    [id: string]: { product: Product; quantity: number };
  }>({});
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});
  const [showCart, setShowCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const username = localStorage.getItem("data");
    setIsLoggedIn(!!username);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCart(false);
      }
    };

    if (showCart) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCart]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BACK_END_LINK}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);
  console.log(products);
  const filteredProducts = products
    .filter(
      (product) => selectedType === "all" || product.category === selectedType
    )
    .filter(
      (product) => selectedSize === "all" || product.size === selectedSize
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.ratings - a.ratings;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Our Products
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover our complete range of premium water products, each
              crafted for different needs and preferences
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Cart icon */}
      <div className="fixed top-20 right-6 z-50">
        <button
          onClick={() => {
            if (!isLoggedIn) {
              navigate("/login");
            } else {
              setShowCart(true);
            }
          }}
          className="relative bg-white p-3 rounded-full shadow-md hover:shadow-lg transition"
        >
          <ShoppingCart className="h-6 w-6 text-blue-600" />
          {Object.keys(cart).length > 0 && (
            <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-1">
              {Object.values(cart).reduce(
                (acc, item) => acc + item.quantity,
                0
              )}
            </span>
          )}
        </button>
      </div>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b sticky top-24 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-wrap items-center justify-between gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filters:</span>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* Search */}
              <motion.div className="relative" whileFocus={{ scale: 1.02 }}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </motion.div>

              {/* Type Filter */}
              <motion.select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
              >
                <option value="all">All Types</option>
                <option value="spring">Spring Water</option>
                <option value="sparkling">Sparkling</option>
                <option value="alkaline">Alkaline</option>
              </motion.select>

              {/* Size Filter */}
              <motion.select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
              >
                <option value="all">All Sizes</option>
                <option value="330ml">330ml</option>
                <option value="500ml">500ml</option>
                <option value="1L">1L</option>
                <option value="5L">5L</option>
              </motion.select>

              {/* Sort */}
              <motion.select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </motion.select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {products.length > 0 && filteredProducts.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key="products-grid"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.3 },
                    }}
                    layout
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-64 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.div
                        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Droplets className="h-5 w-5 text-blue-600" />
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {product.name}
                        </h3>
                        <motion.span
                          className="text-2xl font-bold text-blue-600"
                          whileHover={{ scale: 1.1 }}
                        >
                          Rs {product.price}
                        </motion.span>
                      </div>

                      <p className="text-gray-600 mb-4">
                        {product.description}
                      </p>

                      <div className="flex items-center mb-4">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <Star
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.ratings)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            </motion.div>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">
                          {product.ratings} ({product.reviews} reviews)
                        </span>
                        <div
                          style={{ marginLeft: "2rem" }}
                          className="flex items-right justify-between mt-4 space-x-4"
                        >
                          {/* Quantity Selector */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                setQuantities((prev) => ({
                                  ...prev,
                                  [product._id]: Math.max(
                                    1,
                                    (prev[product._id] || 1) - 1
                                  ),
                                }))
                              }
                              className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold"
                            >
                              -
                            </button>
                            <span className="text-lg font-semibold">
                              {quantities[product._id] || 1}
                            </span>
                            <button
                              onClick={() =>
                                setQuantities((prev) => ({
                                  ...prev,
                                  [product._id]: (prev[product._id] || 1) + 1,
                                }))
                              }
                              className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <motion.div
                          className="text-sm text-gray-500"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="bg-gray-100 px-3 py-1 rounded-full">
                            {product.size}
                          </span>
                        </motion.div>

                        <motion.div
                          className="text-sm text-gray-500"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="bg-gray-100 px-3 py-1 rounded-full">
                            Available {product.stock}
                          </span>
                        </motion.div>

                        <motion.button
                          onClick={() => {
                            if (!isLoggedIn) {
                              navigate("/login");
                              return;
                            }
                            const qty = quantities[product._id] || 1;
                            setCart((prev) => ({
                              ...prev,
                              [product._id]: {
                                product,
                                quantity:
                                  (prev[product._id]?.quantity || 0) + qty,
                              },
                            }));
                          }}
                          className="group bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span>Add to Cart</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                key="no-products"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Droplets className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No products found
                </h3>
                <p className="text-white">
                  Try adjusting your filters to see more products.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      {/* cart pop */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={cartRef}
              className="bg-white p-6 rounded-xl max-w-md w-full shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold mb-4">Your Cart</h2>
              {Object.keys(cart).length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
              ) : (
                <>
                  <ul className="space-y-4 mb-4">
                    {Object.entries(cart).map(
                      ([productId, { product, quantity }]) => (
                        <li
                          key={product._id}
                          className="flex justify-between items-center gap-4"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold">{product.name}</h4>
                            <p className="text-sm text-gray-500">
                              {quantity} × Rs {product.price}
                            </p>
                          </div>

                          <span className="font-bold">
                            Rs {quantity * product.price}
                          </span>

                          <button
                            onClick={() => {
                              const updatedCart = { ...cart };
                              delete updatedCart[productId];
                              setCart(updatedCart);
                            }}
                            className="ml-2 text-sm text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </li>
                      )
                    )}
                  </ul>

                  <div className="flex justify-between items-center font-semibold mb-4">
                    <span>Total</span>
                    <span>
                      Rs{" "}
                      {Object.values(cart).reduce(
                        (total, { product, quantity }) =>
                          total + product.price * quantity,
                        0
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => setShowCart(false)}
                      className="text-gray-600 hover:underline"
                    >
                      Close
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                      Proceed to Payment
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find the perfect water for your lifestyle
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Spring Water",
                category: "spring",
                description:
                  "Pure, natural spring water from protected sources",
                image:
                  "https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
                products: products.filter((p) => p.category === "spring")
                  .length,
              },
              {
                name: "Sparkling Water",
                category: "sparkling",
                description: "Refreshing sparkling water with natural bubbles",
                image:
                  "https://images.pexels.com/photos/2659475/pexels-photo-2659475.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
                products: products.filter((p) => p.category === "sparkling")
                  .length,
              },
              {
                name: "Alkaline Water",
                category: "alkaline",
                description: "pH balanced alkaline water for optimal health",
                image:
                  "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
                products: products.filter((p) => p.category === "alkaline")
                  .length,
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedType(category.category)} // ← This line enables filtering
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">
                      {category.products} products
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Products;
