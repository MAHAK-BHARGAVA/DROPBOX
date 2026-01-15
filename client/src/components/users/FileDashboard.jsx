import { useEffect, useState, useRef } from "react";
import axios from "axios";
import FileCard from "./FileCard";

export default function FileDashboard() {

  const [files, setFiles] = useState([]);
  const [tab, setTab] = useState("suggested");
  const [view, setView] = useState("list");
  const [showMenu, setShowMenu] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/files/my-files",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setFiles(res.data);
  };

  /* ================= ACTIONS ================= */

  // Upload file
  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await axios.post(
      "http://localhost:5000/api/files/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    fetchFiles();
    setShowMenu(false);
  };

  // Scan
  const handleScan = () => {
    alert("Camera scan feature coming next 🚀");
  };

  // Create folder
  const createFolder = async (folderName) => {
    await axios.post(
      "http://localhost:5000/api/files/create-folder",
      { name: folderName },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    fetchFiles();
  };

  return (

    
    <div className="p-5 relative">

      {/* Files */}
      <div className="space-y-3">
        {files.map(file => (
          <FileCard key={file._id} file={file} />
        ))}
      </div>

      {/* Hidden input */}
      <input
        type="file"
        ref={fileInputRef}
        hidden
        onChange={onFileChange}
      />

      {/* Floating + Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="fixed bottom-6 right-6 bg-blue-600 p-4 rounded-full text-xl shadow-lg"
      >
        +
      </button>

      {/* Action Menu */}
      {showMenu && (
        <div className="fixed bottom-20 right-6 bg-[#67696b] rounded-xl shadow-lg w-48">

          <button
            onClick={handleUpload}
            className="w-full text-left px-4 py-3 hover:bg-[#1866da]"
          >
            📤 Upload file
          </button>

          <button
            onClick={handleScan}
            className="w-full text-left px-4 py-3 hover:bg-[#1866da]"
          >
            📷 Scan
          </button>

          <button
            onClick={() => {
              setShowFolderModal(true);
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-3 hover:bg-[#1866da]"
          >
            📁 New folder
          </button>

        </div>
      )}

      {/* Create Folder Modal */}
      {showFolderModal && (
        <FolderModal
          onClose={() => setShowFolderModal(false)}
          onCreate={createFolder}
        />
      )}

    </div>
  );
}

/* ================= MODAL ================= */

function FolderModal({ onClose, onCreate }) {
  const [name, setName] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-[#1e293b] p-6 rounded-xl w-80">

        <h2 className="text-lg mb-4">Create folder</h2>

        <input
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Folder name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">

          <button onClick={onClose}>Cancel</button>

          <button
            onClick={() => {
              onCreate(name);
              onClose();
            }}
            className="bg-blue-600 px-4 py-1 rounded"
          >
            Create
          </button>

        </div>
      </div>
    </div>
  );
}