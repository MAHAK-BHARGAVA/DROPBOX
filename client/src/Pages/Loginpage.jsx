import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import axios from "axios"; // ❌ Commented out — no backend use

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Simulate login manually (frontend-only)
    try {
      // Commenting out real API call
      /*
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
      */

      // ✅ Fake frontend login validation
      if (formData.email === "test@example.com" && formData.password === "1234") {
        // Save a dummy token to mimic authentication
        localStorage.setItem("token", "dummy_frontend_token_12345");
        alert("✅ Logged in successfully (frontend only)");
        navigate("/");
      } else {
        setError("Invalid email or password (frontend check only)");
      }
    } catch (err) {
      // Handle frontend error (no axios errors here)
      setError("Something went wrong during login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Log In
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

