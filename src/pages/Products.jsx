import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import fallbackProducts from "../data/products";
import { API_BASE_URL } from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(fallbackProducts);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Using local fallback products due to fetch notice:", err.message);
        setProducts(fallbackProducts);
        setLoading(false);
      });
  }, []);

  const categories = [
    "All",
    "Audio",
    "Smartphones",
    "Laptops",
    "Gaming",
    "Wearables",
    "Accessories",
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        (product.category &&
          product.category.toLowerCase() === selectedCategory.toLowerCase());

      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "low-to-high") return a.price - b.price;
      if (sortBy === "high-to-low") return b.price - a.price;
      return 0;
    });

  const clearSearch = () => {
    setSearchParams({});
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              🛍 Products Page
            </h1>
            <p className="text-gray-600 mt-1">
              Check out our amazing products!
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="default">Featured</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Search Banner if active */}
        {searchQuery && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg px-4 py-3 mb-6 flex items-center justify-between">
            <span>
              Showing results for <strong>"{searchQuery}"</strong>
            </span>
            <button
              onClick={clearSearch}
              className="text-xs font-semibold text-yellow-900 underline hover:text-yellow-700"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-yellow-400 text-gray-900 shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-yellow-400 border-t-transparent mb-4"></div>
            <p className="text-gray-500 font-medium">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center my-8">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              We couldn't find any products matching your search criteria or selected category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                clearSearch();
              }}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2.5 rounded-lg transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;