import { useEffect, useState, useRef } from "react";
import axios from "axios";
import FileCard from "./FileCard";
import { toast } from "react-hot-toast";

export default function FileDashboard() {
  /* ============================
     RENAME STATE
  ============================ */
  const [renameValue, setRenameValue] = useState("");
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  /* ============================
     FILE STATE
  ============================ */
  const [files, setFiles] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [draggedFileId, setDraggedFileId] = useState(null);
  const [hoveredFolderId, setHoveredFolderId] = useState(null);

  /* ============================
     CAMERA STATE
  ============================ */
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);

  /* ============================
     CONTEXT MENU
  ============================ */
  const [activeMenu, setActiveMenu] = useState(null);

  // preview 
  // const [previewFileData, setPreviewFileData] = useState(null);

  // FILE INFO
  const [infoFile, setInfoFile] = useState(null);

  // share 
  const [shareFile, setShareFile] = useState(null);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const token = localStorage.getItem("token");

  /* ============================
     FETCH FILES
  ============================ */
  useEffect(() => {
    fetchFiles();
  }, []);

//   const previewFile = (file) => {
//   setPreviewFileData(file);
//   setActiveMenu(null); // close context menu
// };

  const fetchFiles = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/files/my-files",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFiles(res.data);
    } catch {
      console.error("Failed to fetch files");
    }
  };

  /* ============================
     PLUS MENU
  ============================ */
  const closePlusMenu = () => setShowMenu(false);

  // const closePreview = () => setPreviewFileData(null);

  /* ============================
     FILE UPLOAD
  ============================ */
  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "http://localhost:5000/api/files/upload",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchFiles();
      closePlusMenu();
    } catch {
      alert("Upload failed");
    }
  };

  /* ============================
     CREATE FOLDER
  ============================ */
  const createFolder = async (name) => {
    if (!name.trim()) return;

    try {
      await axios.post(
        "http://localhost:5000/api/files/create-folder",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchFiles();
      setShowFolderModal(false);
    } catch {
      alert("Folder creation failed");
    }
  };

  /* ============================
     CAMERA
  ============================ */
  const handleScan = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setShowCamera(true);
      setTimeout(() => (videoRef.current.srcObject = mediaStream), 100);
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
      formData.append("file", blob, "scanned.png");

      await axios.post(
        "http://localhost:5000/api/files/upload",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      closeCamera();
      fetchFiles();
    });
  };

  const closeCamera = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setShowCamera(false);
  };

  /* ============================
     FILE MOVE
  ============================ */
  const handleFileMoved = (fileId) => {
    setFiles((prev) => prev.filter((f) => f._id !== fileId));
  };

  /* ============================
     RENAME LOGIC (FIXED)
  ============================ */
  const openRenameModal = (file) => {
  const fullName = file.originalName || file.filename;

  const lastDotIndex = fullName.lastIndexOf(".");
  const baseName =
    lastDotIndex !== -1 ? fullName.slice(0, lastDotIndex) : fullName;
  const extension =
    lastDotIndex !== -1 ? fullName.slice(lastDotIndex) : "";

  setSelectedFile({ ...file, _extension: extension });
  setRenameValue(baseName);
  setRenameModalOpen(true);
  setActiveMenu(null);
};


 const renameFile = async () => {
  if (!renameValue.trim() || !selectedFile) return;

  const finalName = renameValue + (selectedFile._extension || "");

  try {
    const res = await axios.put(
      `http://localhost:5000/api/files/rename/${selectedFile._id}`,
      { name: finalName },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const updatedFile = res.data;

    setFiles((prev) =>
      prev.map((f) => (f._id === updatedFile._id ? updatedFile : f))
    );

    setRenameModalOpen(false);
    setSelectedFile(null);
  } catch {
    alert("Rename failed");
  }
};

/* ============================
   MOVE TO BIN 
============================ */
// const moveToBin = async (file) => {
//   try {
//     // Optimistic UI: remove instantly
//     setFiles((prev) => prev.filter((f) => f._id !== file._id));
//     setActiveMenu(null);

//     // Backend call (we’ll implement later)
//     await axios.put(
//       `http://localhost:5000/api/files/trash/${file._id}`,
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//   } catch (err) {
//     alert("Move to bin failed");
//     fetchFiles(); // rollback
//   }
// };

/* ============================
   TRASH / RESTORE HELPERS
============================ */

const trashFile = async (fileId) => {
  return axios.put(
    `http://localhost:5000/api/files/trash/${fileId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const restoreFile = async (fileId) => {
  await axios.put(
    `http://localhost:5000/api/files/restore/${fileId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  // ✅ now UI updates
  fetchFiles();
};


const moveToBin = async (file, rect) => {
  const x = rect.left + rect.width / 2;
  const y = rect.top - 8;

  setFiles(prev => prev.filter(f => f._id !== file._id));

  let trashed = true;

  toast.custom(
    (t) => (
      <div
        style={{
          position: "fixed",
          left: x,
          top: y,
          transform: "translate(-50%, -100%)",
          zIndex: 9999
        }}
        className="bg-[#1c2b39] text-white px-4 py-2 rounded-lg shadow-xl flex gap-3 items-center"
      >
        <span>Moved to trash</span>

        <button
          className="text-blue-400 font-semibold"
          onClick={async () => {
            trashed = false;
            await restoreFile(file._id);
            toast.dismiss(t.id);
          }}
        >
          UNDO
        </button>
      </div>
    ),
    { duration: 8000 }
  );

  // ⏳ wait before trashing
  setTimeout(async () => {
    if (trashed) {
      await trashFile(file._id);
    }
  }, 500);
};

// FILE INFO
const openFileInfo = (file) => {
  setInfoFile(file);
  setActiveMenu(null);
};

// share file
const shareFileHandler = (file) => {
  setShareFile(file);
  setActiveMenu(null);
};

  /* ============================
     RENDER
  ============================ */
  return (
    <div className="p-5 relative">
      {/* FILE LIST */}
      <div className="space-y-3">
        {files.map((file) => (
          <FileCard
            key={file._id}
            file={file}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            closePlusMenu={closePlusMenu}
            draggedFileId={draggedFileId}
            setDraggedFileId={setDraggedFileId}
            hoveredFolderId={hoveredFolderId}
            setHoveredFolderId={setHoveredFolderId}
            refreshFiles={fetchFiles}
            onMoved={handleFileMoved}
            onRenameClick={openRenameModal}
            onMoveToBin={moveToBin}
            onInfo={openFileInfo}
            onShare={shareFileHandler}
            // onPreviewClick={previewFile}
          />
        ))}
      </div>

      <input type="file" hidden ref={fileInputRef} onChange={onFileChange} />
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
          <video ref={videoRef} autoPlay className="w-full max-w-md" />
          <canvas ref={canvasRef} hidden />
          <div className="flex gap-4 mt-4">
            <button onClick={captureImage} className="btn-blue">
              Capture
            </button>
            <button onClick={closeCamera} className="btn-red">
              Close
            </button>
          </div>
        </div>
      )}

      {/* FOLDER MODAL */}
      {showFolderModal && (
        <FolderModal
          onCreate={createFolder}
          onClose={() => setShowFolderModal(false)}
        />
      )}

      {/* RENAME MODAL */}
      {renameModalOpen && (
        <RenameModal
          value={renameValue}
          setValue={setRenameValue}
          onClose={() => {
            setRenameModalOpen(false);
            setSelectedFile(null);
          }}
          onConfirm={renameFile}
        />
      )}
      
      {/* FILE INFO MODAL */}
      {infoFile && (
        <FileInfoModal file={infoFile} onClose={() => setInfoFile(null)} />
      )}

       {/* SHARE MODAL */}
      {shareFile && <ShareModal file={shareFile} onClose={() => setShareFile(null)} />}

      {/* {previewFileData && (
        <PreviewModal file={previewFileData} onClose={closePreview} />
      )} */}
    </div>
  );
}

/* ============================
   MODALS
============================ */
function FolderModal({ onCreate, onClose }) {
  const [name, setName] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-80">
        <h2 className="text-lg font-semibold mb-4">Create Folder</h2>
        <input
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => onCreate(name)} className="btn-blue">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

function RenameModal({ value, setValue, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-[420px] shadow-2xl animate-scaleIn">
        
        {/* TITLE */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Rename file
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Enter a new name for this file
        </p>

        {/* INPUT */}
        <input
          className="
            hookup
            w-full px-4 py-2.5 rounded-lg
            border border-gray-300 dark:border-gray-700
            bg-gray-50 dark:bg-gray-800
            text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition
          "
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onConfirm();
            if (e.key === "Escape") onClose();
          }}
        />

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-lg
              text-gray-600 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              px-5 py-2 rounded-lg
              bg-blue-600 text-white font-medium
              hover:bg-blue-700
              focus:ring-2 focus:ring-blue-400
              transition
            "
          >
            Rename
          </button>
        </div>
      </div>
    </div>
  );
}

function FileInfoModal({ file, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-lg font-semibold mb-4">File info</h2>

        <div className="space-y-2 text-sm">
          <p><b>Name:</b> {file.originalName || file.filename}</p>
          <p><b>Type:</b> {file.type}</p>
          <p><b>Size:</b> {(file.size / 1024).toFixed(2)} KB</p>
          <p><b>Uploaded:</b> {new Date(file.uploadedAt).toLocaleString()}</p>
          <p><b>Status:</b> {file.isPublic ? "Public" : "Private"}</p>
        </div>

        <button onClick={onClose} className="mt-4 btn-blue w-full">
          Close
        </button>
      </div>
    </div>
  );
}

function ShareModal({ file, onClose }) {
  const [access, setAccess] = useState(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAccess();
  }, []);

  const fetchAccess = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/files/${file._id}/access`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setAccess(res.data);
  };

  const addUser = async () => {
    await axios.post(
      `http://localhost:5000/api/files/${file._id}/share`,
      { email, role },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEmail("");
    fetchAccess();
  };

  const togglePublic = async () => {
    await axios.put(
      `http://localhost:5000/api/files/share/${file._id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchAccess();
  };

  if (!access) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[420px]">

        {/* HEADER */}
        <h2 className="text-lg font-semibold mb-4">
          Share “{file.originalName}”
        </h2>

        {/* ADD PEOPLE */}
        <div className="flex gap-2 mb-4">
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Add people by email"
            className="flex-1 border p-2 rounded"
          />
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
          </select>
          <button onClick={addUser} className="btn-blue">
            Add
          </button>
        </div>

        {/* PEOPLE WITH ACCESS */}
        <div className="mb-4">
          <p className="text-sm font-semibold mb-2">People with access</p>

          <div className="text-sm">
            <div className="flex justify-between py-1">
              <span>{access.owner.email}</span>
              <span className="text-gray-500">Owner</span>
            </div>

            {access.sharedWith.map(u => (
              <div key={u.user._id} className="flex justify-between py-1">
                <span>{u.user.email}</span>
                <span className="text-gray-500">{u.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GENERAL ACCESS */}
        <div className="border-t pt-3">
          <p className="text-sm font-semibold mb-1">General access</p>

          {access.isPublic ? (
            <>
              <p className="text-sm text-green-600">
                Anyone with the link
              </p>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${window.location.origin}/public/${file.shareToken}`
                  )
                }
                className="btn-blue mt-2 w-full"
              >
                Copy link
              </button>
            </>
          ) : (
            <p className="text-sm text-gray-500">
              Restricted
            </p>
          )}

          <button
            onClick={togglePublic}
            className="mt-2 text-blue-600 text-sm"
          >
            {access.isPublic ? "Turn off link sharing" : "Turn on link sharing"}
          </button>
        </div>

        <button onClick={onClose} className="mt-4 w-full">
          Done
        </button>
      </div>
    </div>
  );
}


// function PreviewModal({ file, onClose }) {
//   const token = localStorage.getItem("token");
//   const [fileUrl, setFileUrl] = useState(null);

//   useEffect(() => {
//     if (!file) return;

//     let url;

//     const fetchFile = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/files/download/${file._id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             responseType: "blob",
//           }
//         );

//         url = URL.createObjectURL(new Blob([res.data]));
//         setFileUrl(url);
//       } catch (err) {
//         alert("Failed to fetch file for preview");
//       }
//     };

//     fetchFile();

//     return () => {
//       if (url) URL.revokeObjectURL(url);
//     };
//   }, [file]);

//   if (!file) return null;

//   const ext = (file.originalName || file.filename).split(".").pop().toLowerCase();

//   return (
//     <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
//       <div className="bg-white dark:bg-gray-900 rounded-xl w-11/12 h-5/6 p-4 overflow-auto relative">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-xl font-bold"
//         >
//           ✖
//         </button>

//         {/* IMAGE FILES */}
//         {["jpg", "jpeg", "png", "gif"].includes(ext) && fileUrl && (
//           <img
//             src={fileUrl}
//             alt="preview"
//             className="max-w-full max-h-full mx-auto"
//           />
//         )}

//         {/* PDF FILES */}
//         {ext === "pdf" && fileUrl && (
//           <iframe
//             src={fileUrl}
//             title="PDF Preview"
//             className="w-full h-full"
//           />
//         )}

//         {/* SVG FILES */}
//         {ext === "svg" && fileUrl && (
//           <iframe
//             src={fileUrl}
//             title="SVG Preview"
//             className="w-full h-full"
//           />
//         )}

//         {/* WORD / DOCX FILES */}
//         {["doc", "docx"].includes(ext) && (
//           <p className="text-center mt-10 text-gray-600">
//             Word preview is not supported. Please download the file to view.
//           </p>
//         )}

//         {/* OTHER FILE TYPES */}
//         {!["jpg","jpeg","png","gif","pdf","svg","doc","docx"].includes(ext) && (
//           <p className="text-center mt-10 text-gray-600">
//             Preview not available for this file type
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
