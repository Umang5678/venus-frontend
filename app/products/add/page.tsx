"use client";

import { useState } from "react";
import API from "@/lib/api";
import AdminNavbar from "@/components/AdminNavbar";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState<string[]>([]);
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    if (files.length > 3) {
      alert("You can upload maximum 3 images");
      return;
    }

    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) {
      alert("Name and price are required");
      return;
    }

    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("category", category);
    form.append("price", String(price));
    form.append("stock", String(stock || 0));
    form.append("size", JSON.stringify(size));
    images.forEach((file) => form.append("images", file));

    try {
      setLoading(true);
      await API.post("/products", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Product added successfully!");
      router.push("/products");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 pt-28">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-pink-100 p-8">
          <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">
            ➕ Add New Product
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 text-black animate-fadeIn"
          >
            {/* Name */}
            <div>
              <label className="block mb-1 font-semibold text-gray-800">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product name"
                className="w-full border border-pink-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-semibold text-gray-800">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product description"
                rows={3}
                className="w-full border border-pink-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-semibold text-gray-800">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full border border-pink-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              >
                <option value="" className="text-gray-800">
                  -- Select Category --
                </option>
                <option value="Chaniya Choli">Chaniya Choli</option>
                <option value="Kurti Pair">Kurti Pair</option>
                <option value="Gown Sets">Gown Sets</option>
              </select>
            </div>

            {/* Sizes */}
            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-3">
                {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                  <label
                    key={s}
                    className={`px-4 py-2 rounded-full cursor-pointer border ${
                      size.includes(s)
                        ? "bg-pink-600 text-white border-pink-600"
                        : "border-pink-300 hover:bg-pink-100"
                    } transition`}
                  >
                    <input
                      type="checkbox"
                      value={s}
                      checked={size.includes(s)}
                      onChange={(e) =>
                        e.target.checked
                          ? setSize([...size, s])
                          : setSize(size.filter((item) => item !== s))
                      }
                      className="hidden"
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>

            {/* Price & Stock */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold text-gray-800">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="Enter price"
                  className="w-full border border-pink-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-gray-800">
                  Stock
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  placeholder="Available stock"
                  className="w-full border border-pink-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                Product Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={onFiles}
                className="w-full border border-pink-200 rounded-xl p-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              />

              {previewUrls.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg border border-pink-200"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          const newImages = [...images];
                          const newPreviews = [...previewUrls];

                          newImages.splice(index, 1);
                          newPreviews.splice(index, 1);

                          setImages(newImages);
                          setPreviewUrls(newPreviews);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 text-white py-3 rounded-full font-semibold hover:bg-pink-700 transition-transform transform hover:scale-105 shadow-md"
            >
              {loading ? "Uploading..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
