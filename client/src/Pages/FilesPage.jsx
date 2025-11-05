import React, { useState, useEffect } from "react";

const FilesPage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Simulated local files (frontend-only)
  useEffect(() => {
    setLoading(true);
    // Simulate fetching files delay
    setTimeout(() => {
      // Example static data (mocked as if coming from API)
      const demoFiles = [
        {
          _id: "1",
          name: "Project_Plan.pdf",
          size: 2.3,
          createdAt: new Date(),
        },
        {
          _id: "2",
          name: "Design_Prototype.png",
          size: 4.1,
          createdAt: new Date(),
        },
        {
          _id: "3",
          name: "Meeting_Notes.txt",
          size: 0.5,
          createdAt: new Date(),
        },
      ];

      setFiles(demoFiles);
      setLoading(false);
    }, 1000);
  }, []);

  // ✅ Filtered file list based on search
  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Simulated file download
  const handleDownload = (fileName) => {
    alert(`⬇️ "${fileName}" downloaded successfully (frontend only)`);
  };

  // ----------------------------
  // Rendering UI
  // ----------------------------

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Files</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map((file) => (
          <div
            key={file._id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{file.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(file.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>

            {/* File Footer */}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">{file.size} MB</span>
              <button
                onClick={() => handleDownload(file.name)}
                className="text-blue-600 hover:text-blue-800"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No files found
        </div>
      )}
    </div>
  );
};

export default FilesPage;
