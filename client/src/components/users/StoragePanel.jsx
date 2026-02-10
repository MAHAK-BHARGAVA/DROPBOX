import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function StoragePanel() {
  const [usage, setUsage] = useState(null);
  const [largestFiles, setLargestFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStorageData();
  }, []);

  async function fetchStorageData() {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/storage/summary",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setUsage(res.data.usage);
      setLargestFiles(res.data.largestFiles || []);
    } catch (err) {
      alert("Failed to load storage data");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <p className="text-sm text-gray-500">
        Loading storage...
      </p>
    );
  }

  if (!usage) {
    return (
      <p className="text-sm text-red-500">
        Storage data unavailable
      </p>
    );
  }

  const percent = Math.min(
    (usage.used / usage.limit) * 100,
    100
  );

  return (
    <div
      className="
        w-full
        space-y-6
        max-h-[70vh]
        overflow-y-auto
        overflow-x-hidden
        pr-2
        pb-20
      "
    >
      {/* HEADER */}
      <h2 className="text-xl font-semibold text-gray-900">
        Storage Management
      </h2>

      {/* STORAGE BAR */}
      <div>
        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className="h-3 rounded-full bg-blue-600 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="text-sm mt-2 text-gray-600">
          {formatFileSize(usage.used)} of {formatFileSize(usage.limit)} used
        </p>

        <p className="text-xs text-gray-500 mt-1">Plan: {usage.plan}</p>
      </div>

      {/* UPGRADE CTA */}
      {usage.plan === "Free" && (
        <button
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-4
            py-2
            rounded
            w-full
            transition
          "
        >
          Upgrade Storage
        </button>
      )}

      {/* STORAGE BREAKDOWN */}
      <div>
        <h3 className="font-medium mb-2 text-gray-900">Storage Breakdown</h3>

        <ul className="text-sm text-gray-600 space-y-1">
          <li>Files: {formatFileSize(usage.files)}</li>
          <li>
            <Link
              to="/trash"
              className="flex justify-between items-center text-blue-600 hover:underline"
            >
              <span>Trash</span>
              <span>{formatFileSize(usage.trash)}</span>
            </Link>

            <p className="text-xs text-gray-500 mt-1">
              Files in trash are auto-deleted after 30 days
            </p>
          </li>

          <li>Shared: {formatFileSize(usage.shared)}</li>
        </ul>
      </div>

      {/* LARGEST FILES */}
      <div>
        <h3 className="font-medium mb-2 text-gray-900">Largest Files</h3>

        {largestFiles.length === 0 ? (
          <p className="text-sm text-gray-500">No large files</p>
        ) : (
          <ul className="space-y-2">
            {largestFiles.map((file) => (
              <li
                key={file._id}
                className="
                  flex
                  justify-between
                  items-center
                  gap-2
                  text-sm
                  border-b
                  pb-1
                "
              >
                <span
                  className="
                    truncate
                    max-w-[180px]
                    text-gray-700
                  "
                  title={file.originalName}
                >
                  {file.originalName}
                </span>

                <span className="text-gray-500 shrink-0">
                  {formatFileSize(file.size)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* UTIL */
export function formatFileSize(bytes) {
  if (bytes === 0) return "0 KB";

  const k = 1024;
  const sizes = ["KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}



