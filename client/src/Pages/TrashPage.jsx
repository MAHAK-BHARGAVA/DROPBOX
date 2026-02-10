import { useEffect, useState } from "react";
import axios from "axios";
import TrashCard from "../components/users/TrashCard";

export default function TrashPage() {
  const [trashFiles, setTrashFiles] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTrash();
  }, []);

  const fetchTrash = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/files/trash",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTrashFiles(res.data);
  };

  const restoreFile = async (fileId) => {
    await axios.put(
      `http://localhost:5000/api/files/restore/${fileId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTrash();
  };

  const deleteForever = async (fileId) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/files/permanent/${fileId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    // update UI correctly
    setTrashFiles(prev => prev.filter(f => f._id !== fileId));
  } catch (err) {
    alert("Permanent delete failed");
  }
};



  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">🗑️ Trash</h1>

      {trashFiles.length === 0 && (
        <p className="text-gray-400">Trash is empty</p>
      )}

      <div className="space-y-3">
        {trashFiles.map((file) => (
          <TrashCard
            key={file._id}
            file={file}
            onRestore={restoreFile}
            onDelete={deleteForever}
          />
        ))}
      </div>
    </div>
  );
}
