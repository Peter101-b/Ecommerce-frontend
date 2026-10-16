import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

import headphones from "../assets/images/wireless-headphone.jpg";
import mouse from "../assets/images/gaming-mouse.jpg";
import iphone17 from "../assets/images/iphone-17-promax.jpg";
import samsungGalaxyS25Ultra from "../assets/images/samsung-galaxy-s25-ultra.jpg";
import appleWatchSeries11 from "../assets/images/apple-watch-series-11.jpg";
import macbookpro2024 from "../assets/images/macbook-pro-2024.jpg";
import sonyPlaystation5 from "../assets/images/sony-playstation-5.jpg";
import xboxseriesz from "../assets/images/xbox-series-z.jpg";
import asusroggaminglaptop from "../assets/images/asus-rog-gaming-laptop.jpg";
import appleairpodpro3 from "../assets/images/apple-airpod-pro-3.jpg";
import samsunggalaxybudspro3 from "../assets/images/samsung-galaxy-buds-pro-3.jpg";
import jblspeaker from "../assets/images/jbl-speaker.jpg";

export const imageMap = {
  "wireless-headphone.jpg": headphones,
  "gaming-mouse.jpg": mouse,
  "iphone-17-promax.jpg": iphone17,
  "samsung-galaxy-s25-ultra.jpg": samsungGalaxyS25Ultra,
  "apple-watch-series-11.jpg": appleWatchSeries11,
  "macbook-pro-2024.jpg": macbookpro2024,
  "sony-playstation-5.jpg": sonyPlaystation5,
  "xbox-series-z.jpg": xboxseriesz,
  "asus-rog-gaming-laptop.jpg": asusroggaminglaptop,
  "apple-airpod-pro-3.jpg": appleairpodpro3,
  "samsung-galaxy-buds-pro-3.jpg": samsunggalaxybudspro3,
  "jbl-speaker.jpg": jblspeaker,
};

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const productId = product._id || product.id;
  const productImage =
    typeof product.image === "string" && imageMap[product.image]
      ? imageMap[product.image]
      : product.image || headphones;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full border border-gray-100">
      {/* Product Image */}
      <Link to={`/products/${productId}`} className="overflow-hidden">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-64 object-cover hover:scale-105 transition duration-300"
        />
      </Link>

      {/* Product Information */}
      <div className="p-5 text-center flex flex-col flex-grow">
        {/* Category / New Badge */}
        <div className="flex items-center justify-center gap-2 mb-3">
          {product.category && (
            <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
          )}
          <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
            NEW
          </span>
        </div>

        {/* Product Name */}
        <Link
          to={`/products/${productId}`}
          className="text-gray-900 no-underline hover:text-yellow-500 transition"
        >
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <p className="text-yellow-400 text-sm mb-3">⭐⭐⭐⭐⭐</p>

        {/* Price */}
        <h4 className="text-xl font-bold text-green-600 mb-5">
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(product.price)}
        </h4>

        {/* Add To Cart */}
        <button
          onClick={handleAddToCart}
          className={`mt-auto w-full font-semibold py-3 rounded-lg transition duration-200 cursor-pointer ${
            added
              ? "bg-green-600 text-white"
              : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
          }`}
        >
          {added ? "✓ Added to Cart!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;