import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACK_END_LINK } from "../config";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  size: string;
  stock: number;
  category: string;
};

type Order = {
  _id: string;
  status: string;
  totalAmount: number;
  products: {
    product: Product;
    quantity: number;
  }[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
};

const AdminPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  // Product form state
  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    category: "",
    size: "",
    stock: 0,
  });

  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("data");

    if (!userId) {
      navigate("/login");
      return;
    }

    axios.get(`${BACK_END_LINK}/api/users/${userId}`).then((res) => {
      if (res.data.isAdmin) {
        setIsAdmin(true);
        setUser(res.data);
        fetchData();
      } else {
        navigate("/");
      }
    });
  }, []);

  const fetchData = async () => {
    const productRes = await axios.get(`${BACK_END_LINK}/api/products`);
    const orderRes = await axios.get(`${BACK_END_LINK}/api/orders`);
    setProducts(productRes.data);
    setOrders(orderRes.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProductId) {
      await axios.put(
        `${BACK_END_LINK}/api/products/${editingProductId}`,
        form
      );
    } else {
      await axios.post(`${BACK_END_LINK}/api/products`, form);
    }
    setForm({});
    setEditingProductId(null);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${BACK_END_LINK}/api/products/${id}`);
    fetchData();
  };

  const updateOrderStatus = async (id: string, status: string) => {
    const userId = user?._id;
    if (!userId) return;

    await axios.put(
      `${BACK_END_LINK}/api/orders/${id}/status`,
      { status },
      { headers: { userId } }
    );
    fetchData();
  };

  if (!isAdmin) return null;

  return (
    <div className="pt-24 bg-blue-500">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-500 to-white">
        <h1 className="text-3xl text-center font-bold mb-6">Admin Dashboard</h1>
      </section>
      <div className="p-10 bg-gray-100 min-h-screen">
        {/* Product Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow mb-10"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingProductId ? "Edit Product" : "Add Product"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={form.imageUrl || ""}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price || ""}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Categorey"
              value={form.category || ""}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Size"
              value={form.size || ""}
              onChange={(e) => setForm({ ...form, size: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock || ""}
              onChange={(e) =>
                setForm({ ...form, stock: Number(e.target.value) })
              }
              className="border p-2 rounded"
            />
            <textarea
              placeholder="Description"
              value={form.description || ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border p-2 rounded col-span-2"
            ></textarea>
          </div>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editingProductId ? "Update" : "Add"}
          </button>
        </form>

        {/* Product List */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <div className="grid gap-4">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white p-4 rounded shadow flex justify-between"
              >
                <div>
                  <h3 className="font-bold">{p.name}</h3>
                  <p>{p.description}</p>
                  <p>
                    Rs {p.price} | {p.size} | Stock: {p.stock}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-sm bg-yellow-400 px-2 py-1 rounded"
                    onClick={() => {
                      setForm(p);
                      setEditingProductId(p._id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-sm bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Orders */}
        <section>
          <h2 className="text-xl font-bold mb-4">Customer Orders</h2>
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o._id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between">
                  <span>Order ID: {o._id}</span>
                  <select
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                    className="border rounded px-2"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <p className="text-sm mt-2">
                  Address: {o.shippingAddress.address}, {o.shippingAddress.city}
                </p>
                <p className="text-sm">Total: Rs {o.totalAmount}</p>
                <ul className="text-sm mt-2 list-disc ml-6">
                  {o.products.map((item, i) => (
                    <li key={i}>
                      {item.product
                        ? `${item.product.name} × ${item.quantity}`
                        : "Product no longer exists"}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
