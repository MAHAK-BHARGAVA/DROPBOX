import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios"; // Make sure this exists

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setLoading(true);

   try {
  const response = await api.post("/api/auth/login", formData);

  if (response.status !== 200) {
    setErrors(response.data.message || "Login failed");
    setLoading(false);
    return;
  }

  localStorage.setItem("token", response.data.token);
  localStorage.setItem("userId", response.data.user.id);
  localStorage.setItem("name", response.data.user.name);
  localStorage.setItem("email", response.data.user.email);
 navigate("/user", { replace: true });
}catch (err) {
      const data = err.response?.data;

      if (data?.errors) {
        // express-validator errors (array)
        setErrors(data.errors);
      } else if (data?.message) {
        // single backend message
        setErrors([data.message]);
      } else {
        setErrors(["login failed. Please try again."]);
      }
    }
 finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Log In
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>

          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded text-sm">
              {errors.map((err, index) => (
                <div key={index}>• {err}</div>
              ))}
            </div>
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
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
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
