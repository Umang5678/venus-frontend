// "use client";
// import { useContext } from "react";
// import Link from "next/link";
// import { AuthContext } from "@/context/AuthContext";

// export default function AdminNavbar() {
//   const { user, logout } = useContext(AuthContext);
//   return (
//     <nav className="flex items-center justify-between p-4 bg-gray border-b">
//       <div className="flex items-center gap-4">
//         <Link href="/products" className="font-bold">
//           Admin
//         </Link>
//         <Link href="/products">Products</Link>
//         <Link href="/order">Order</Link>
//       </div>
//       <div className="flex items-center gap-4">
//         {user ? <span>{user.name}</span> : null}
//         <button onClick={logout} className="text-red-500">
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { Menu, X } from "lucide-react";

export default function AdminNavbar() {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const logout = () => {
    localStorage.removeItem("adminToken");

    window.location.href = "/login";
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-pink-100 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar Container */}
        <div className="flex justify-between items-center h-16">
          {/* === LEFT: Admin Links === */}
          <div className="flex items-center gap-6">
            <Link
              href="/products"
              className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition"
            >
              Admin Panel
            </Link>

            <div className="hidden md:flex items-center gap-6 text-black font-medium">
              <Link
                href="/products"
                className="hover:text-pink-600 transition-colors"
              >
                Products
              </Link>

              <Link
                href="/order"
                className="hover:text-pink-600 transition-colors"
              >
                Orders
              </Link>
            </div>
          </div>

          {/* === RIGHT: User Info + Logout === */}
          <div className="hidden md:flex items-center gap-4 text-black font-medium">
            {user && (
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                {user.name}
              </span>
            )}
            <button
              onClick={logout}
              className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700 transition-transform transform hover:scale-105 shadow-sm"
            >
              Logout
            </button>
          </div>

          {/* === MOBILE MENU TOGGLE === */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-pink-600 hover:text-pink-700 focus:outline-none"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* === MOBILE MENU === */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-pink-100 shadow-inner">
          <div className="flex flex-col items-center gap-4 py-4 text-black font-medium">
            <Link
              href="/products"
              className="hover:text-pink-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/order"
              className="hover:text-pink-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              Orders
            </Link>
            {user && (
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                {user.name}
              </span>
            )}
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
