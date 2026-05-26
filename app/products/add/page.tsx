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
  const [size, setSize] = useState<{ size: string; stock: number }[]>([]);
  const [price, setPrice] = useState<number | "">("");
  const [discount, setDiscount] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [occasion, setOccasion] = useState<string[]>([]);
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

    const finalStock = size.length > 0
      ? size.reduce((acc, curr) => acc + curr.stock, 0)
      : Number(stock || 0);

    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("category", category);
    form.append("price", String(price));
    form.append("discount", String(discount || 0));
    form.append("stock", String(finalStock));
    form.append("size", JSON.stringify(size));
    form.append("occasion", JSON.stringify(occasion));
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

            {/* Occasion */}
<div>
  <label className="block mb-2 font-semibold text-gray-800">
    Occasion
  </label>

  <div className="flex flex-wrap gap-3">
    {[
      "WORK WEAR",
      "SUMMER MOMENTS",
      "EVERYDAY EASE",
      "COTTON DAYS",
      "MEHENDI",
      "HALDI",
      "SANGEET",
      "THE SHAADI EDIT",
      "FESTIVE COLLECTION",
      "GIFTING",
      "NEW IN",
      "BEST SELLER",
    ].map((o) => (
      <label
        key={o}
        className={`px-4 py-2 rounded-full cursor-pointer border ${
          occasion.includes(o)
            ? "bg-purple-600 text-white border-purple-600"
            : "border-purple-300 hover:bg-purple-100"
        } transition`}
      >
        <input
          type="checkbox"
          value={o}
          checked={occasion.includes(o)}
          onChange={(e) =>
            e.target.checked
              ? setOccasion([...occasion, o])
              : setOccasion(occasion.filter((item) => item !== o))
          }
          className="hidden"
        />
        {o}
      </label>
    ))}
  </div>
</div>

            {/* Sizes */}
            <div>
              <label className="block mb-2 font-semibold text-gray-800">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-3 mb-4">
                {["XS", "S", "M", "L", "XL", "XXL"].map((s) => {
                  const isChecked = size.some((item) => item.size === s);
                  return (
                    <label
                      key={s}
                      className={`px-4 py-2 rounded-full cursor-pointer border ${
                        isChecked
                          ? "bg-pink-600 text-white border-pink-600"
                          : "border-pink-300 hover:bg-pink-100"
                      } transition`}
                    >
                      <input
                        type="checkbox"
                        value={s}
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSize([...size, { size: s, stock: 10 }]);
                          } else {
                            setSize(size.filter((item) => item.size !== s));
                          }
                        }}
                        className="hidden"
                      />
                      {s}
                    </label>
                  );
                })}
              </div>

              {size.length > 0 && (
                <div className="mt-4 p-4 border border-pink-100 rounded-xl bg-pink-50/30 space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Set Stock for Selected Sizes:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {size.map((sz) => (
                      <div key={sz.size} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-pink-150 shadow-xs">
                        <span className="font-bold text-gray-800 w-10 text-center">{sz.size}</span>
                        <input
                          type="number"
                          min="0"
                          value={sz.stock}
                          onChange={(e) => {
                            const newStock = Math.max(0, parseInt(e.target.value) || 0);
                            const updated = size.map((item) =>
                              item.size === sz.size ? { ...item, stock: newStock } : item
                            );
                            setSize(updated);
                          }}
                          className="w-full border border-pink-200 rounded p-1 text-sm focus:ring-1 focus:ring-pink-400 focus:outline-none"
                          placeholder="Stock"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {/* Price */}
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

              {/* Discount */}
              <div>
                <label className="block mb-1 font-semibold text-gray-800">
                  Discount (%)
                </label>

                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  placeholder="0"
                  className="w-full border border-pink-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                />

                {/* ⭐ Live Final Price Preview */}
                {price && discount !== "" && (
                  <p className="text-sm text-green-600 mt-1">
                    Final Price: ₹
                    {Math.round(price - (price * Number(discount)) / 100)}
                  </p>
                )}
              </div>

              {/* Stock */}
              <div>
                <label className="block mb-1 font-semibold text-gray-800">
                  Stock
                </label>
                <input
                  type="number"
                  value={size.length > 0 ? size.reduce((acc, curr) => acc + curr.stock, 0) : stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  disabled={size.length > 0}
                  placeholder="Available stock"
                  className={`w-full border border-pink-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none ${
                    size.length > 0 ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
                  }`}
                />
                {size.length > 0 && (
                  <p className="text-[10px] text-gray-400 mt-1">Calculated from size stocks.</p>
                )}
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
