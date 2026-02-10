import { FaFolder, FaTrashRestore, FaTimes } from "react-icons/fa";

export default function TrashCard({ file, onRestore, onDelete }) {
  const isFolder = file.type === "folder";

  return (
    <div className="flex justify-between items-center p-4 rounded-xl bg-[#1c2b39]">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-red-500 flex items-center justify-center rounded-lg">
          {isFolder ? (
            <FaFolder className="text-white text-2xl" />
          ) : (
            <span className="text-white text-sm font-semibold">
              {file.originalName.split(".").pop().toUpperCase()}
            </span>
          )}
        </div>

        <div>
          <p className="text-white font-medium">
            {file.originalName || file.filename}
          </p>
          <p className="text-xs text-gray-400">
            Trashed on{" "}
            {new Date(file.trashedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onRestore(file._id)}
          className="px-3 py-1 rounded bg-green-600 hover:bg-green-700"
        >
          <FaTrashRestore />
        </button>

        <button
          onClick={() => onDelete(file._id)}
          className="px-3 py-1 rounded bg-red-600 hover:bg-red-700"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
}
