import { useState, useEffect } from "react";
import axios from "axios";
import SettingsPanel from "./SettingsPanel"
export default function ProfileMenu({ isOpen, onClose, user }) {
  console.log(user); 
  if (!isOpen) return null;

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

  const initial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : "?";

  return (

    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50">

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 text-xl"
      >
        ✕
      </button>

      {user ? (
        <div className="flex flex-col items-center mt-12 px-6">

   {/* Avatar */}
<div className="w-20 h-20 rounded-full mb-4 overflow-hidden">

  {user?.profilePhoto && user.profilePhoto !== "/default-avatar.png" ? (
   <img
  src={`http://localhost:5000${user.profilePhoto}`}
  className="w-full h-full object-cover rounded-full"
/>

  ) : (
    <div
      className={`w-full h-full flex items-center justify-center 
                  text-white text-2xl font-bold 
                  ${avatarColor || "bg-gray-400"}`}
    >
      {user?.name
        ? user.name.charAt(0).toUpperCase()
        : "U"}
    </div>
  )}

</div>
          {/* Info */}
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500 mt-1">
            Account: {user.accountType}
          </p>
          

          {/* Storage */}
          {/* <div className="w-full mt-6">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${
                    (user.storageUsed / user.storageTotal) * 100
                  }%`,
                }}
              />
            </div>

            <p className="text-sm mt-1 text-gray-700">
              {user.storageUsed} GB of {user.storageTotal} GB used
            </p>
          </div> */}
         <SettingsPanel onClose={onClose} user={user} />
        </div>
      ) : (
        <p className="mt-12 text-center text-gray-500">
          Loading profile...
        </p>
      )}
    </div>
  );
}


