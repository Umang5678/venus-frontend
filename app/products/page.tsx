// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import API from "@/lib/api";
// import AdminNavbar from "@/components/AdminNavbar";
// import Link from "next/link";
// import Image from "next/image";

// export default function ProductsPage() {
//   const router = useRouter();
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await API.get("/products");
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");

//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     fetchProducts();
//   }, []);

//   const handleDelete = async (id: string) => {
//     if (!confirm("Delete this product?")) return;
//     try {
//       await API.delete(`/products/${id}`);
//       setProducts((p) => p.filter((item) => item._id !== id));
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };
//   const handleEdit = async (id: string) => {
//     if (!confirm("Edit this product?")) return;
//     try {
//       await API.put(`/products/${id}`);
//       // Assuming you have a way to update the product in the state
//     } catch (err) {
//       alert("Edit failed");
//     }
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <div className="p-6 pt-28 bg-gradient-to-b from-pink-50 to-white min-h-screen text-black">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//           <h1 className="text-3xl font-bold text-pink-600">🛍️ Product List</h1>
//           <Link
//             href="/products/add"
//             className="bg-pink-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-pink-700 transition-transform transform hover:scale-105"
//           >
//             + Add Product
//           </Link>
//         </div>

//         {/* Loading / Empty states */}
//         {loading ? (
//           <p className="text-center text-gray-600 py-20">Loading...</p>
//         ) : products.length === 0 ? (
//           <p className="text-center text-gray-600 py-20">No products found.</p>
//         ) : (
//           <>
//             {/* 🖥️ Table view (for medium and large screens) */}
//             <div className="hidden md:block overflow-x-auto rounded-xl shadow-md border border-pink-100">
//               <table className="w-full text-left border-collapse bg-white">
//                 <thead className="bg-pink-100 text-black">
//                   <tr>
//                     <th className="p-3 font-semibold">Image</th>
//                     <th className="p-3 font-semibold">Name</th>
//                     <th className="p-3 font-semibold">Category</th>
//                     <th className="p-3 font-semibold">Price</th>
//                     <th className="p-3 font-semibold">Stock</th>
//                     <th className="p-3 text-center font-semibold">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {products.map((p) => (
//                     <tr
//                       key={p._id}
//                       className="border-t hover:bg-pink-50 transition"
//                     >
//                       <td className="p-3">
//                         {p.images?.[0] ? (
//                           <Image
//                             src={p.images[0]}
//                             alt={p.name}
//                             width={60}
//                             height={60}
//                             className="rounded-md object-cover border border-pink-100"
//                           />
//                         ) : (
//                           <span className="text-gray-400 italic">No Image</span>
//                         )}
//                       </td>
//                       <td className="p-3 font-medium">{p.name}</td>
//                       <td className="p-3">{p.category || "-"}</td>
//                       <td className="p-3 text-pink-600 font-semibold">
//                         ₹{p.price}
//                       </td>
//                       <td className="p-3">{p.stock}</td>
//                       <td className="p-3 text-center">
//                         <div className="flex justify-center gap-4">
//                           <button
//                             onClick={() => handleEdit(p._id)}
//                             className="text-blue-600 hover:underline font-medium"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(p._id)}
//                             className="text-red-600 hover:underline font-medium"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* 📱 Card view (for small screens) */}
//             <div className="grid md:hidden gap-6 mt-6">
//               {products.map((p) => (
//                 <div
//                   key={p._id}
//                   className="bg-white rounded-2xl shadow-md border border-pink-100 p-4 hover:shadow-lg transition"
//                 >
//                   <div className="flex items-center gap-4">
//                     {p.images?.[0] ? (
//                       <Image
//                         src={p.images[0]}
//                         alt={p.name}
//                         width={80}
//                         height={80}
//                         className="rounded-lg object-cover border border-pink-100"
//                       />
//                     ) : (
//                       <div className="w-20 h-20 bg-pink-50 flex items-center justify-center text-gray-400 rounded-lg border border-pink-100">
//                         No Img
//                       </div>
//                     )}
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-lg text-black">
//                         {p.name}
//                       </h3>
//                       <p className="text-sm text-gray-600">
//                         Category: {p.category || "-"}
//                       </p>
//                       <p className="text-sm text-gray-600">Stock: {p.stock}</p>
//                       <p className="text-pink-600 font-semibold">₹{p.price}</p>
//                     </div>
//                   </div>

//                   <div className="flex justify-end gap-3 mt-4">
//                     <button
//                       onClick={() => handleEdit(p._id)}
//                       className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(p._id)}
//                       className="px-3 py-1 rounded-full bg-red-600 text-white text-sm hover:bg-red-700 transition"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import AdminNavbar from "@/components/AdminNavbar";
import Link from "next/link";
import Image from "next/image";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    size: [] as any[],
    price: "",
    stock: "",
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      setProducts((p) => p.filter((item) => item._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };
  const handleEdit = (product: any) => {
    setEditingProduct(product);

    // Normalize sizes to { size, stock } objects.
    const normalizedSizes = (product.size || []).map((s: any) => {
      if (typeof s === "string") {
        return { size: s, stock: 10 };
      }
      return { size: s.size, stock: typeof s.stock === "number" ? s.stock : 10 };
    });

    setEditForm({
      name: product.name,
      description: product.description,
      size: normalizedSizes,
      price: product.price,
      stock: product.stock,
    });
  };

  return (
    <>
      <AdminNavbar />
      <div className="p-6 pt-28 bg-gradient-to-b from-pink-50 to-white min-h-screen text-black">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-pink-600">🛍️ Product List</h1>
          <Link
            href="/products/add"
            className="bg-pink-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-pink-700 transition-transform transform hover:scale-105"
          >
            + Add Product
          </Link>
        </div>

        {/* Loading / Empty states */}
        {loading ? (
          <p className="text-center text-gray-600 py-20">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600 py-20">No products found.</p>
        ) : (
          <>
            {/* 🖥️ Table view (for medium and large screens) */}
            <div className="hidden md:block overflow-x-auto rounded-xl shadow-md border border-pink-100">
              <table className="w-full text-left border-collapse bg-white">
                <thead className="bg-pink-100 text-black">
                  <tr>
                    <th className="p-3 font-semibold">Image</th>
                    <th className="p-3 font-semibold">Name</th>
                    <th className="p-3 font-semibold">Category</th>
                    <th className="p-3 font-semibold">Price</th>
                    <th className="p-3 font-semibold">Stock</th>
                    <th className="p-3 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr
                      key={p._id}
                      className="border-t hover:bg-pink-50 transition"
                    >
                      <td className="p-3">
                        {p.images?.[0] ? (
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            width={60}
                            height={60}
                            className="rounded-md object-cover border border-pink-100"
                          />
                        ) : (
                          <span className="text-gray-400 italic">No Image</span>
                        )}
                      </td>
                      <td className="p-3 font-medium">{p.name}</td>
                      <td className="p-3">{p.category || "-"}</td>
                      <td className="p-3 text-pink-600 font-semibold">
                        ₹{p.price}
                      </td>
                      <td className="p-3">{p.stock}</td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => handleEdit(p)}
                            className="text-blue-600 hover:underline font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="text-red-600 hover:underline font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 📱 Card view (for small screens) */}
            <div className="grid md:hidden gap-6 mt-6">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-2xl shadow-md border border-pink-100 p-4 hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-4">
                    {p.images?.[0] ? (
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover border border-pink-100"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-pink-50 flex items-center justify-center text-gray-400 rounded-lg border border-pink-100">
                        No Img
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-black">
                        {p.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Category: {p.category || "-"}
                      </p>
                      <p className="text-sm text-gray-600">Stock: {p.stock}</p>
                      <p className="text-pink-600 font-semibold">₹{p.price}</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-3 py-1 rounded-full bg-red-600 text-white text-sm hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg shadow-xl">
              <h2 className="text-xl font-bold mb-4 text-pink-600">
                Edit Product
              </h2>

              <div className="space-y-4">
                {/* Name */}
                <input
                  type="text"
                  placeholder="Product Name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />

                {/* Description */}
                <textarea
                  placeholder="Description"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />

                {/* Price */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                    className="w-full border p-2 rounded focus:ring-1 focus:ring-pink-400 focus:outline-none text-black"
                  />
                </div>

                {/* Sizes and Stock */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Sizes &amp; Stock
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((s) => {
                      const isChecked = editForm.size.some((item: any) => item.size === s);
                      return (
                        <label
                          key={s}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition ${
                            isChecked
                              ? "bg-pink-600 text-white border-pink-600"
                              : "border-pink-300 hover:bg-pink-100 text-gray-700"
                          }`}
                        >
                          <input
                            type="checkbox"
                            value={s}
                            checked={isChecked}
                            onChange={(e) => {
                              let updatedSizes = [...editForm.size];
                              if (e.target.checked) {
                                updatedSizes.push({ size: s, stock: 10 });
                              } else {
                                updatedSizes = updatedSizes.filter((item: any) => item.size !== s);
                              }
                              const calculatedStock = updatedSizes.reduce((acc: number, curr: any) => acc + curr.stock, 0);
                              setEditForm({
                                ...editForm,
                                size: updatedSizes,
                                stock: String(calculatedStock),
                              });
                            }}
                            className="hidden"
                          />
                          {s}
                        </label>
                      );
                    })}
                  </div>

                  {editForm.size.length > 0 && (
                    <div className="p-3 border border-pink-100 rounded-lg bg-pink-50/20 max-h-40 overflow-y-auto space-y-2">
                      {editForm.size.map((sz: any) => (
                        <div key={sz.size} className="flex items-center justify-between bg-white p-1.5 px-3 rounded border border-pink-100">
                          <span className="font-bold text-gray-700 text-xs">{sz.size}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-400">Stock:</span>
                            <input
                              type="number"
                              min="0"
                              value={sz.stock}
                              onChange={(e) => {
                                const newStock = Math.max(0, parseInt(e.target.value) || 0);
                                const updatedSizes = editForm.size.map((item: any) =>
                                  item.size === sz.size ? { ...item, stock: newStock } : item
                                );
                                const calculatedStock = updatedSizes.reduce((acc: number, curr: any) => acc + curr.stock, 0);
                                setEditForm({
                                  ...editForm,
                                  size: updatedSizes,
                                  stock: String(calculatedStock),
                                });
                              }}
                              className="w-16 border border-pink-200 rounded p-1 text-xs text-center focus:ring-1 focus:ring-pink-400 focus:outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Total Stock (Calculated automatically if sizes selected)
                  </label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={editForm.stock}
                    disabled={editForm.size.length > 0}
                    onChange={(e) =>
                      setEditForm({ ...editForm, stock: e.target.value })
                    }
                    className={`w-full border p-2 rounded focus:ring-1 focus:ring-pink-400 focus:outline-none text-black ${
                      editForm.size.length > 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    try {
                      await API.put(
                        `/products/${editingProduct._id}`,
                        editForm,
                      );

                      alert("Product updated");

                      setEditingProduct(null);

                      fetchProducts();
                    } catch {
                      alert("Update failed");
                    }
                  }}
                  className="px-4 py-2 bg-pink-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
