import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Sidebar renders only when open. It's an expanded dashboard panel with an inside close (X).
const Sidebar = ({ isOpen = false, onToggle }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/files/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // Refresh file list or show success message
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleNewFolder = async () => {
    const folderName = prompt("Enter folder name:");
    if (!folderName) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/files/folder",
        { name: folderName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh folder list or show success message
    } catch (error) {
      console.error("Folder creation failed:", error);
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-full fixed left-0 top-16 transition-transform duration-300 shadow-lg z-20 flex flex-col">
      <div className="p-4 relative">
        {/* Close button inside sidebar when expanded */}
        <button
          onClick={() => onToggle && onToggle()}
          aria-label="Close dashboard"
          className="absolute right-3 top-3 p-1.5 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <nav className="space-y-6">
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-2">
              Dashboard
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/files"
                  className="flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  My Files
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-2">Storage</h3>
            <div className="px-2">
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Used Space</span>
                  <span>60%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-400">6GB of 10GB used</p>
            </div>
          </div>

          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-2">
              Quick Actions
            </h3>
            <ul className="space-y-2">
              <li>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md ${
                    isUploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isUploading}
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Upload File
                </button>
              </li>
              <li>
                <button
                  onClick={handleNewFolder}
                  className="w-full flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  New Folder
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
