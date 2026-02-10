// import { useState } from "react";
// import ProfileMenu from "./ProfileMenu";

// export default function Header({ user}) {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   const initial = user?.name
//     ? user.name.charAt(0).toUpperCase()
//     : "?";

//   const colors = [
//     "bg-pink-500",
//     "bg-blue-500",
//     "bg-green-500",
//     "bg-purple-500",
//     "bg-yellow-500",
//     "bg-red-500",
//     "bg-indigo-500",
//   ];

//   const getColor = (name) => {
//     if (!name) return "bg-gray-400";
//     let hash = 0;
//     for (let i = 0; i < name.length; i++) {
//       hash = name.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     return colors[Math.abs(hash) % colors.length];
//   };

//   const avatarColor = getColor(user?.name);

//   return (
//     <header className="flex items-center justify-between gap-3 p-3 bg-gray-100 shadow-md">

//       {/* Menu */}
//       <button className="text-xl font-bold px-2">☰</button>

//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search files and folders"
//         className="flex-1 px-4 py-2 rounded-full bg-blue-600 text-white
//                    focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />

//       {/* Avatar */}
//       <div 
//         onClick={() => setIsProfileOpen(true)}
//         className={`
//           w-10 h-10 
//           ${avatarColor}
//           flex items-center justify-center
//           text-white font-bold text-lg
//           cursor-pointer
//           transition-transform duration-300
//           hover:scale-110
//           w-10 h-10 rounded-full mb-4 overflow-hidden
//         `}
//       >
//         {user?.profilePhoto && user.profilePhoto !== "/default-avatar.png" ? (
//     <img
//       src={`http://localhost:5000${user.profilePhoto}`}
//       alt="Avatar"
//       className="w-full h-full object-cover"
//     />
//   ) : (
//     <div
//       className={`
//         w-full h-full
//         ${avatarColor || "bg-gray-400"}
//         rounded-full 
//         flex items-center justify-center
//         text-white font-bold text-lg
//       `}
//     >
//       {initial}
//     </div>
//   )}
//       </div>

//       {/* Profile Panel */}
//       <ProfileMenu
//         isOpen={isProfileOpen}
//         onClose={() => setIsProfileOpen(false)}
//         user={user}
//       />
//     </header>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import ProfileMenu from "./ProfileMenu";

export default function Header({ user }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const initial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : "?";

  const colors = [
    "bg-pink-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-indigo-500",
  ];

  const getColor = (name) => {
    if (!name) return "bg-gray-400";
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const avatarColor = getColor(user?.name);

  /* 🔍 SEARCH (DEBOUNCED) */
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/files/search?q=${query}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setResults(res.data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <header className="relative flex items-center gap-3 p-3 bg-gray-100 shadow-md">

      {/* Menu */}
      <button className="text-xl font-bold px-2">☰</button>

      {/* Search */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search files and folders"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full px-4 py-2 rounded-full
            bg-blue-600 text-white
            placeholder-blue-200
            focus:outline-none
            focus:ring-2 focus:ring-blue-400
          "
        />

        {/* SEARCH RESULTS */}
        {query && (
          <div className="
            absolute top-12 left-0 w-full
            bg-white rounded-lg shadow-lg
            max-h-80 overflow-y-auto
            z-50
          ">
            {loading && (
              <p className="p-3 text-sm text-gray-500">
                Searching...
              </p>
            )}

            {!loading && results.length === 0 && (
              <p className="p-3 text-sm text-gray-500">
                No results found
              </p>
            )}

            {!loading && results.map((file) => (
              <div
                key={file._id}
                className="
                  px-4 py-2 cursor-pointer
                  hover:bg-gray-100
                  flex justify-between text-sm
                "
              >
                <span className="truncate">
                  {file.originalName}
                </span>
                <span className="text-gray-400">
                  {file.isFolder ? "Folder" : "File"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Avatar */}
      <div
        onClick={() => setIsProfileOpen(true)}
        className="
          w-10 h-10 rounded-full
          flex items-center justify-center
          text-white font-bold
          cursor-pointer
        "
      >
        {user?.profilePhoto && user.profilePhoto !== "/default-avatar.png" ? (
          <img
            src={`http://localhost:5000${user.profilePhoto}`}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div
            className={`w-full h-full ${avatarColor} rounded-full flex items-center justify-center`}
          >
            {initial}
          </div>
        )}
      </div>

      <ProfileMenu
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
      />
    </header>
  );
}



