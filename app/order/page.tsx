"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import AdminNavbar from "@/components/AdminNavbar";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
}

interface Order {
  _id: string;
  name: string;
  phone: string;
  totalAmount: number;
  orderStatus: string;
  items: OrderItem[];
  postal: string;
  address: string;
  city: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    API.get("/orders/all")
      .then((res) => setOrders(res.data.orders))
      .catch((err) => console.error(err));
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await API.put(`/orders/update/${id}`, {
        orderStatus: status,
      });

      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, orderStatus: status } : o)),
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };
  return (
    <>
      {" "}
      <AdminNavbar />{" "}
      <div className="bg-gradient-to-b from-pink-50 to-white min-h-screen py-10 px-4 pt-28">
        {" "}
        <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">
          {" "}
          🧾 All Orders{" "}
        </h2>{" "}
        {orders.length === 0 ? (
          <p className="text-center text-gray-600">No orders found.</p>
        ) : (
          <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {" "}
            {orders.map((o) => (
              <div
                key={o._id}
                className="bg-white p-6 rounded-2xl shadow-md border border-pink-100 hover:shadow-lg transition-shadow duration-300"
              >
                {" "}
                <div className="mb-4">
                  {" "}
                  <h3 className="text-lg font-bold text-black">
                    👤 {o.name}
                  </h3>{" "}
                  <p className="text-gray-700">
                    {" "}
                    📞 <span className="font-medium">{o.phone}</span>{" "}
                  </p>{" "}
                  <p className="text-gray-700">
                    {" "}
                    📍 {o.address}, {o.city} ({o.postal}){" "}
                  </p>{" "}
                  <p className="mt-1 font-semibold text-pink-600">
                    {" "}
                    💰 Total: ₹{o.totalAmount}{" "}
                  </p>{" "}
                </div>{" "}
                <div className="mb-4">
                  {" "}
                  <label className="font-semibold text-gray-800">
                    Status:
                  </label>{" "}
                  <select
                    value={o.orderStatus}
                    onChange={(e) => handleStatusChange(o._id, e.target.value)}
                    className="ml-2 border border-pink-300 p-2 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none text-black"
                  >
                    {" "}
                    <option>Pending</option> <option>Processing</option>{" "}
                    <option>Shipped</option> <option>Delivered</option>{" "}
                    <option>Cancelled</option>{" "}
                  </select>{" "}
                </div>{" "}
                {/* Order items */}{" "}
                <div>
                  {" "}
                  <h4 className="font-semibold mb-2 text-gray-800">
                    {" "}
                    Items ({o.items.length}){" "}
                  </h4>{" "}
                  <ul className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-100 pr-2">
                    {" "}
                    {o.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between bg-pink-50 rounded-xl p-2 hover:bg-pink-100 transition"
                      >
                        {" "}
                        <div className="flex items-center gap-3">
                          {" "}
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-lg border border-pink-100"
                            />
                          )}{" "}
                          <div>
                            {" "}
                            <p className="text-black font-medium">
                              {" "}
                              {item.name}{" "}
                            </p>{" "}
                            <p className="text-sm text-gray-600">
                              {" "}
                              Qty: {item.quantity}{" "}
                            </p>{" "}
                            <p className="text-sm text-gray-600">
                              {" "}
                              Size: {item.size}{" "}
                            </p>{" "}
                          </div>{" "}
                        </div>{" "}
                        <p className="font-semibold text-pink-600">
                          {" "}
                          ₹{item.price * item.quantity}{" "}
                        </p>{" "}
                      </li>
                    ))}{" "}
                  </ul>{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>
        )}{" "}
      </div>{" "}
    </>
  );
}
