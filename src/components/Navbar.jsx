import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100">
      <Link to="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <span>🛒</span>
        <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
          ShopEase
        </span>
      </Link>

      <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products, brands, categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3 top-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </form>

      <div className="flex items-center gap-6 font-medium text-sm">
        <Link
          to="/"
          className="text-gray-700 hover:text-yellow-600 transition"
        >
          Home
        </Link>

        <Link
          to="/products"
          className="text-gray-700 hover:text-yellow-600 transition"
        >
          Products
        </Link>

        <Link
          to="/cart"
          className="relative text-gray-700 hover:text-yellow-600 transition flex items-center gap-1"
        >
          <span>🛒 Cart</span>
          {totalItems > 0 && (
            <span className="bg-yellow-500 text-gray-900 font-bold text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
            <span className="text-gray-800 font-semibold">
              👋 Hi, {user.name.split(" ")[0]}
            </span>
            <button
              onClick={logout}
              className="text-xs text-red-600 hover:text-red-700 font-semibold border border-red-200 hover:bg-red-50 px-2.5 py-1 rounded transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-gray-700 hover:text-yellow-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;