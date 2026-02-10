import { useRef , useState } from "react";
import { FaFolder } from "react-icons/fa";
import axios from "axios";

export default function FileCard({
  file,
  activeMenu,
  setActiveMenu,
  closePlusMenu,
  refreshFiles,
  onMoved,   
  draggedFileId,
  setDraggedFileId,
  hoveredFolderId,
  setHoveredFolderId,
  onRenameClick,
  onMoveToBin,
  onInfo,
  onShare
  //onPreviewClick,
}) {
  const [isRemoving, setIsRemoving] = useState(false);
  const isFolder = file.type === "folder";

  const fileType = file.originalName
    ? file.originalName.split(".").pop().toUpperCase()
    : file.filename.split(".").pop().toUpperCase();

  const menuRef = useRef(null);
  const token = localStorage.getItem("token");

  /* =====================
     DRAG HANDLERS
  ===================== */

  const handleDragStart = (e) => {
    setDraggedFileId(file._id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("fileId", file._id);
  };

  const handleDragEnd = () => {
    setDraggedFileId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (isFolder) {
      setHoveredFolderId(file._id);
    }
  };

  const handleDragLeave = () => {
    setHoveredFolderId(null);
  };

  const handleDrop = async (e) => {
    e.preventDefault();

    const fileId = e.dataTransfer.getData("fileId");
    setHoveredFolderId(null);

    if (!fileId || fileId === file._id) return;

    try {
      await axios.post(
        "http://localhost:5000/api/files/move",
        { fileId, targetFolderId: file._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // ✅ Animate then remove
     setIsRemoving(true);

     setTimeout(() => {
     onMoved(fileId);
    }, 250);
      refreshFiles();
    } catch (err) {
      console.error("Move failed");
    }
  };

  /* =====================
     CONTEXT MENU
  ===================== */

  const handleRightClick = (e) => {
    e.preventDefault();
    closePlusMenu();

    const menuWidth = 220;
    const menuHeight = 260;

    let x = e.clientX + 5;
    let y = e.clientY + 5;

    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 10;
    }

    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 10;
    }

    setActiveMenu({
      id: file._id,
      x: x,
      y: y
    });
  };

 const handleClick = (e) => {
  if (draggedFileId) return;

  // close context menu only
  setActiveMenu(null);

  // ❌ DO NOTHING on click for files (no download, no preview)
};

const handleDownload = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/files/download/${file._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: "blob"
      }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = file.originalName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    setActiveMenu(null);
  } catch (err) {
    alert("Download failed");
  }
};

  /* =====================
     UI STATES
  ===================== */

  const isDragging = draggedFileId === file._id;
  const isHovered = hoveredFolderId === file._id && isFolder;
  const isOpen = activeMenu?.id === file._id;

  return (
    <>
      <div
        draggable={!isFolder}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={isFolder ? handleDragOver : undefined}
        onDragLeave={isFolder ? handleDragLeave : undefined}
        onDrop={isFolder ? handleDrop : undefined}
        onDoubleClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // onPreviewClick(file);
        }}
        onContextMenu={handleRightClick}
        onClick={handleClick}
        className={`
        group p-4 rounded-xl flex justify-between items-center
        transition-all duration-300 cursor-pointer

         ${isDragging ? "opacity-40 scale-95" : ""}
         ${isRemoving ? "opacity-0 scale-90" : ""}   // ✅ ADD
         ${
           isHovered
             ? "bg-blue-700 ring-2 ring-blue-400"
             : "bg-[#1c2b39] hover:bg-[#0047ab]"
         }
       `}
      >
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-red-500">
            {isFolder ? (
              <FaFolder className="text-white text-2xl" />
            ) : (
              <span className="text-white font-semibold text-sm">
                {fileType}
              </span>
            )}
          </div>

          <div>
            <p className="font-medium text-white">
              {file.originalName || file.filename}
            </p>

            <p className="text-xs text-gray-300">
              {isFolder ? "Folder" : "Uploaded"}{" "}
              {file.uploadedAt
                ? new Date(file.uploadedAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        <button className="text-gray-400 text-xl">⋮</button>
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          style={{ position: "fixed", top: activeMenu.y, left: activeMenu.x }}
          className="bg-[#2b3b4f] text-white rounded-lg shadow-xl w-52 z-50"
        >
          <MenuBtn text="⬇️ Download" onClick={handleDownload} />
          <MenuBtn text="✏️ Rename" onClick={() => onRenameClick(file)} />
          <MenuBtn
            text="🗑️ Move to bin"
            onClick={(e) => {
              e.stopPropagation();

              // capture coordinates immediately
              const rect = e.currentTarget.getBoundingClientRect();

              onMoveToBin(file, rect);
            }}
          />
          <MenuBtn text="🔗 Share" onClick={() => onShare(file)} />
          {isFolder && <MenuBtn text="📁 Add to folder" />}
          <MenuBtn text="ℹ️ File info" onClick={() => onInfo(file)} />
          {/* <MenuBtn text="👁️ Preview" onClick={() => onPreviewClick(file)} /> */}
        </div>
      )}
    </>
  );
} 

function MenuBtn({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 hover:bg-[#0047ab]"
    >
      {text}
    </button>
  );
}

