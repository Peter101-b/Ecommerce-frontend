import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
        <h1 className="text-7xl font-black text-yellow-500 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-500 text-sm mb-6">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-xl transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;