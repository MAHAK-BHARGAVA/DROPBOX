import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return <p className="mt-12 text-center text-gray-500">Loading profile...</p>;
  }

  const avatarColor = getColor(user.name);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
        {/* Avatar */}
        <div
          className={`w-24 h-24 rounded-full mb-4 flex items-center justify-center text-white text-3xl font-bold overflow-hidden`}
        >
          {user.profilePhoto ? (
            <img
              src={user.profilePhoto}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center ${avatarColor}`}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : "?"}
            </div>
          )}
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-500 mt-1">Account: {user.accountType}</p>

        {/* Storage Bar */}
        <div className="w-full mt-6">
          <div className="w-full bg-gray-200 h-3 rounded-full">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{
                width: `${(user.storageUsed / user.storageTotal) * 100}%`,
              }}
            ></div>
          </div>
          <p className="text-sm mt-1 text-gray-700">
            {user.storageUsed} GB of {user.storageTotal} GB used
          </p>
        </div>
      </div>
    </div>
  );
}
