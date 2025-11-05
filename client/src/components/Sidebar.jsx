import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
// import axios from "axios"; // ❌ Commented out because we’re going frontend-only

const Sidebar = ({ isOpen = false, onToggle }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // ------------------------------
  // 📂 Simulated File Upload (Frontend)
  // ------------------------------
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    // ✅ Original API (commented out)
    /*
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/files/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Upload failed:", error);
    }
    */

    // ✅ Replace with frontend-only logic
    setTimeout(() => {
      setUploadedFiles((prev) => [...prev, file.name]);
      setIsUploading(false);
      alert(`✅ "${file.name}" uploaded successfully (frontend only)`);
    }, 1000);
  };

  // ------------------------------
  // 📁 Simulated Folder Creation (Frontend)
  // ------------------------------
  const handleNewFolder = async () => {
    const folderName = prompt("Enter folder name:");
    if (!folderName) return;

    // ✅ Original API (commented out)
    /*
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/files/folder",
        { name: folderName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Folder creation failed:", error);
    }
    */

    // ✅ Replace with frontend-only logic
    if (folders.includes(folderName)) {
      alert("⚠️ Folder already exists!");
      return;
    }
    setFolders((prev) => [...prev, folderName]);
    alert(`📁 Folder "${folderName}" created successfully (frontend only)`);
  };

  // ------------------------------
  // JSX UI Part (unchanged)
  // ------------------------------
  return (
    <div className="w-64 bg-gray-800 text-white h-full fixed left-0 top-16 shadow-lg z-20 flex flex-col">
      <div className="p-4 relative">
        {/* Close button */}
        <button
          onClick={() => onToggle && onToggle()}
          className="absolute right-3 top-3 p-1.5 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          ✖
        </button>

        <nav className="space-y-6">
          {/* Dashboard section */}
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-2">Dashboard</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="block px-2 py-2 hover:bg-gray-700 rounded-md">
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link to="/files" className="block px-2 py-2 hover:bg-gray-700 rounded-md">
                  📄 My Files
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-2">Quick Actions</h3>
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
                  className={`w-full px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md ${
                    isUploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload File"}
                </button>
              </li>
              <li>
                <button
                  onClick={handleNewFolder}
                  className="w-full px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
                >
                  + New Folder
                </button>
              </li>
            </ul>
          </div>

          {/* Show created items */}
          {(folders.length > 0 || uploadedFiles.length > 0) && (
            <div className="mt-4">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Your Items</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                {folders.map((folder, i) => (
                  <li key={i}>📁 {folder}</li>
                ))}
                {uploadedFiles.map((file, i) => (
                  <li key={i}>📄 {file}</li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

