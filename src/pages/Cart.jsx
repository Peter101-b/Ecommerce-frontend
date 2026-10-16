import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { imageMap } from "../components/ProductCard";
import headphones from "../assets/images/wireless-headphone.jpg";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    clearCart();
  };

  if (checkoutSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-lg border border-gray-100">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            ✓
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Thank you for shopping with ShopEase! Your order has been placed and will be delivered shortly.
          </p>
          <Link
            to="/products"
            onClick={() => setCheckoutSuccess(false)}
            className="block w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-xl transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
        <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center shadow-sm border border-gray-100">
          <p className="text-6xl mb-4">🛒</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your Shopping Cart is Empty
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-xl transition"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            🛒 Shopping Cart ({cart.length} items)
          </h1>
          <button
            onClick={clearCart}
            className="text-xs text-red-600 hover:text-red-700 font-semibold border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const itemId = item._id || item.id;
              const itemImage =
                typeof item.image === "string" && imageMap[item.image]
                  ? imageMap[item.image]
                  : item.image || headphones;

              return (
                <div
                  key={itemId}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-5 justify-between"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={itemImage}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-100"
                    />
                    <div>
                      <Link
                        to={`/products/${itemId}`}
                        className="font-bold text-gray-900 hover:text-yellow-600 text-lg transition line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm font-semibold text-green-600 mt-1">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() =>
                          updateQuantity(itemId, item.quantity - 1)
                        }
                        className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(itemId, item.quantity + 1)
                        }
                        className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <p className="font-bold text-gray-900 text-base min-w-24 text-right">
                      {formatCurrency(item.price * item.quantity)}
                    </p>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(itemId)}
                      className="text-gray-400 hover:text-red-500 p-1 transition"
                      title="Remove Item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Tax</span>
                <span className="font-semibold text-gray-900">₦0.00</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-900">
                <span>Total Amount</span>
                <span className="text-green-600">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3.5 rounded-xl shadow-md transition duration-200 cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;