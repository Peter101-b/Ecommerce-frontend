import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { imageMap } from "../components/ProductCard";
import fallbackProducts from "../data/products";
import headphones from "../assets/images/wireless-headphone.jpg";
import { API_BASE_URL } from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found on server");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        const localMatch = fallbackProducts.find(
          (p) => String(p.id) === String(id) || String(p._id) === String(id)
        );
        if (localMatch) {
          setProduct(localMatch);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-yellow-400 border-t-transparent mb-4"></div>
          <p className="text-gray-500 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md">
          <p className="text-5xl mb-4">⚠️</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/products"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2.5 rounded-lg transition"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const productImage =
    typeof product.image === "string" && imageMap[product.image]
      ? imageMap[product.image]
      : product.image || headphones;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          to="/products"
          className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-yellow-600 mb-6 transition"
        >
          ← Back to Products
        </Link>

        {/* Product Details Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
          {/* Left: Product Image */}
          <div className="flex items-center justify-center bg-gray-50 rounded-xl p-4 overflow-hidden border border-gray-100">
            <img
              src={productImage}
              alt={product.name}
              className="max-h-96 w-full object-contain rounded-lg hover:scale-105 transition duration-300"
            />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category */}
              {product.category && (
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                  {product.category}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</span>
                <span className="text-sm font-medium text-gray-500">
                  (4.9 / 5 customer reviews)
                </span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-green-600 mb-6">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(product.price)}
              </div>

              {/* Description */}
              <div className="border-t border-b border-gray-100 py-4 mb-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                  Product Overview
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {product.description ||
                    "Experience premium build quality and exceptional performance with this official item from ShopEase."}
                </p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                <span className="text-sm font-semibold text-gray-700">
                  In Stock ({product.stock ?? 20} available)
                </span>
              </div>
            </div>

            {/* Actions */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <label className="text-sm font-semibold text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-semibold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-xl font-bold text-lg transition duration-200 cursor-pointer shadow-md ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                }`}
              >
                {added ? "✓ Added to Cart!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;