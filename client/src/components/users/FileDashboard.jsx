import { useEffect, useState, useRef } from "react";
import axios from "axios";
import FileCard from "./FileCard";
import jsPDF from "jspdf";

export default function FileDashboard() {

  const [files, setFiles] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);

  // GLOBAL CONTEXT MENU STATE
  const [activeMenu, setActiveMenu] = useState(null);

  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/files/my-files",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setFiles(res.data);
  };

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
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchFiles();
    setShowMenu(false);
  };

  const handleScan = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });

      setStream(mediaStream);
      setShowCamera(true);

      setTimeout(() => {
        videoRef.current.srcObject = mediaStream;
      }, 100);

    } catch {
      alert("Camera permission denied");
    }
  };

  const captureImage = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "scanned-doc.png");

      await axios.post(
        "http://localhost:5000/api/files/upload",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      closeCamera();
      fetchFiles();
      alert("Scanned document uploaded!");
    });
  };

  const closeCamera = () => {
    stream.getTracks().forEach(t => t.stop());
    setShowCamera(false);
  };

  const createFolder = async (folderName) => {
    if (!folderName.trim()) return;

    await axios.post(
      "http://localhost:5000/api/files/create-folder",
      { name: folderName },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchFiles();
    setShowFolderModal(false);
  };

  // CLOSE CONTEXT MENU ON OUTSIDE CLICK
  useEffect(() => {
    const close = () => setActiveMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div className="p-5 relative">

      <div className="space-y-3">
        {files.map(file => (
          <FileCard
            key={file._id}
            file={file}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            closePlusMenu={() => setShowMenu(false)}
          />
        ))}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        hidden
        onChange={onFileChange}
      />

      {/* PLUS BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
          setActiveMenu(null);
        }}
        className="fixed bottom-6 right-6 bg-blue-600 p-4 rounded-full text-xl shadow-lg"
      >
        +
      </button>

      {/* PLUS MENU */}
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

      {/* CAMERA */}
      {showCamera && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">

          <video
            ref={videoRef}
            autoPlay
            className="w-full max-w-md rounded-xl"
          />

          <canvas ref={canvasRef} hidden />

          <div className="flex gap-4 mt-4">

            <button
              onClick={captureImage}
              className="bg-blue-600 px-6 py-2 rounded text-white"
            >
              Capture
            </button>

            <button
              onClick={closeCamera}
              className="bg-red-600 px-6 py-2 rounded text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showFolderModal && (
        <FolderModal
          onClose={() => setShowFolderModal(false)}
          onCreate={createFolder}
        />
      )}

    </div>
  );
}

function FolderModal({ onClose, onCreate }) {
  const [name, setName] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-[#3f7fe7] p-6 rounded-xl w-80">

        <h2 className="text-lg mb-4">Create folder</h2>

        <input
          className="w-full p-2 rounded bg-white text-black"
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



