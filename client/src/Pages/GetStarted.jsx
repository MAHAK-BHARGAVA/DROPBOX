import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaFileAlt, FaDownload } from "react-icons/fa";
import axios from "axios";

const GetStarted = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/files");
      setFiles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    // try {
    //   await axios.post("http://localhost:5000/api/upload", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    //   fetchFiles();
    // } catch (err) {
    //   console.error(err);
    // } finally {
    //   setUploading(false);
    // }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-12 px-6">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Your Dropbox Files</h1>
        <p className="text-gray-600 mt-2">
          Upload, manage, and download your files easily.
        </p>
      </div>

      {/* Upload Box (centered) */}
      <div className="flex flex-col items-center justify-center mb-12">
        <label className="flex flex-col items-center justify-center bg-white border-2 border-dashed border-blue-400 rounded-2xl w-80 h-44 cursor-pointer hover:border-blue-600 hover:shadow-lg transition duration-300">
          <FaCloudUploadAlt className="text-blue-600 text-4xl mb-3" />
          <span className="text-gray-700 font-medium">
            {uploading ? "Uploading..." : "Click to Upload File"}
          </span>
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
        <p className="text-sm text-gray-500 mt-3">
          Supported formats: PDF, PNG, JPG, DOCX, etc.
        </p>
      </div>

      {/* Files Grid */}
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.length > 0 ? (
          files.map((file) => (
            <div
              key={file._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-3 mb-3">
                <FaFileAlt className="text-blue-600" size={28} />
                <h2 className="font-semibold text-gray-800 truncate">
                  {file.originalName}
                </h2>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                {(file.size / 1024).toFixed(2)} KB
              </p>
              <p className="text-xs text-gray-400 mb-3">
                Uploaded on {new Date(file.createdAt).toLocaleDateString()}
              </p>
              <a
                href={file.fileUrl}
                download
                className="text-blue-600 hover:underline text-sm flex items-center"
              >
                <FaDownload className="mr-1" /> Download
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No files uploaded yet. Upload your first file above!
          </p>
        )}
      </div>
    </div>
  );
};

export default GetStarted;
