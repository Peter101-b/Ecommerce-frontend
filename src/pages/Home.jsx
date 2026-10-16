import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import fallbackProducts from "../data/products";
import { API_BASE_URL } from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch");
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(fallbackProducts);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.warn("Using fallback products on Home page:", error.message);
        setProducts(fallbackProducts);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gray-900 text-white mx-4 mt-8 rounded-2xl px-6 py-20 text-center max-w-7xl md:mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to ShopEase
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover high quality electronics, laptops, smartphones, and accessories at unbeatable prices.
        </p>

        <Link
          to="/products"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3.5 rounded-xl shadow-md transition duration-200"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Featured Products
          </h2>

          <Link
            to="/products"
            className="text-yellow-600 hover:text-yellow-700 font-bold flex items-center gap-1 transition"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-yellow-400 border-t-transparent mb-4"></div>
            <p className="text-gray-500 text-lg font-medium">
              Loading products...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;