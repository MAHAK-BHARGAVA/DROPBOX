import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({
  isSidebarCollapsed,
  showHamburger = true,
  onHeaderClick,
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white">
      <div className="flex items-center gap-4">
        {/* Sidebar toggle placed in header */}
        {showHamburger && (
          <button
            onClick={() => onHeaderClick && onHeaderClick()}
            className="p-2 rounded-md hover:bg-blue-500 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

        <Link to="/" className="text-2xl font-bold hover:text-white">
          Dropbox
        </Link>
      </div>

      <div className="flex gap-4">
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Log Out
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
