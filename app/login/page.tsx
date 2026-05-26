"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

export default function AdminLogin() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/admin/login", form);

      const data = res.data;

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        router.push("/products");
      } else {
        alert(data.message);
      }
    } catch (err: any) {
      if (!process.env.NEXT_PUBLIC_API_URL) {
        alert(
          "Login Failed!\n\n" +
          "The environment variable 'NEXT_PUBLIC_API_URL' is not configured in Vercel.\n" +
          "Please set NEXT_PUBLIC_API_URL to your Express backend URL (e.g., https://your-backend-service.onrender.com) in your Vercel project settings, then redeploy."
        );
      } else {
        alert(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-80 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-pink-600">
          Admin Login
        </h2>

        <input
          name="email"
          type="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded text-pink-300"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 rounded text-pink-300"
        />

        <button className="bg-pink-600 text-white p-2 rounded hover:bg-pink-700">
          Login
        </button>
      </form>
    </div>
  );
}
