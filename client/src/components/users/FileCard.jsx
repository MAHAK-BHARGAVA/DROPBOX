import { useRef } from "react";
import { FaFolder } from "react-icons/fa";

export default function FileCard({
  file,
  activeMenu,
  setActiveMenu,
  closePlusMenu
}) {

  const isFolder = file.type === "folder";

  const fileType = file.originalName
    ? file.originalName.split(".").pop().toUpperCase()
    : file.filename.split(".").pop().toUpperCase();

  const menuRef = useRef(null);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("fileId", file.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const fileId = e.dataTransfer.getData("fileId");
    console.log("Move file", fileId, "to folder", file.id);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    closePlusMenu();

    const menuWidth = 220;
    const menuHeight = 260;

    let x = e.clientX + 5;
    let y = e.clientY + 5;

    // PREVENT GOING OUTSIDE SCREEN
    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 10;
    }

    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 10;
    }

    setActiveMenu({
      id: file._id,
      x,
      y
    });
  };

  const isOpen = activeMenu?.id === file._id;

  return (
    <>
      <div
        draggable={!isFolder}
        onDragStart={handleDragStart}
        onDragOver={isFolder ? (e) => e.preventDefault() : undefined}
        onDrop={isFolder ? handleDrop : undefined}
        onContextMenu={handleRightClick}
        className="
          group bg-[#1c2b39] p-4 rounded-xl
          flex justify-between items-center
          cursor-pointer hover:bg-[#0047ab]
          transition duration-200 transform hover:scale-105
        "
        onClick={() => {
          setActiveMenu(null);
          if (!isFolder) {
            window.open(`http://localhost:5000/${file.path}`);
          }
        }}
      >

        <div className="flex gap-4 items-center">

          <div className="
            w-12 h-12 flex items-center justify-center
            rounded-lg bg-red-500 transition-transform
            group-hover:scale-110
          ">
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
              {isFolder ? "Folder" : "Uploaded"} •{" "}
              {file.uploadedAt
                ? new Date(file.uploadedAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="ml-auto flex space-x-2 opacity-0 group-hover:opacity-100 transition">
          <button className="text-gray-400 hover:text-white">✏️</button>
          <button className="text-gray-400 hover:text-white">🗑️</button>
          <button className="text-gray-400 hover:text-white">⬇️</button>
          <button className="text-gray-400 hover:text-white">🔗</button>
        </div>

        <button className="text-gray-400 text-xl ml-2">⋮</button>
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: activeMenu.y,
            left: activeMenu.x
          }}
          className="bg-[#2b3b4f] text-white rounded-lg shadow-xl w-52 z-50"
        >
          <MenuBtn text="⬇️ Download" />
          <MenuBtn text="✏️ Rename" />
          <MenuBtn text="📄 Make a copy" />
          <MenuBtn text="🔗 Share" />

          {isFolder && <MenuBtn text="📁 Add to folder" />}

          <MenuBtn text="🗑️ Move to bin" />
          <MenuBtn text="ℹ️ File info" />
        </div>
      )}
    </>
  );
}

function MenuBtn({ text }) {
  return (
    <button className="w-full text-left px-4 py-2 hover:bg-[#0047ab]">
      {text}
    </button>
  );
}


