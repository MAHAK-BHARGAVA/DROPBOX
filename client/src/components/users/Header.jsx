export default function Header({ userName }) {
  // Get first letter
  const initial = userName ? userName.charAt(0).toUpperCase() : "";

  // Color palette (Google Drive style)
  const colors = [
    "bg-pink-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-indigo-500",
  ];

  // Generate color based on name safely
  const getColor = (name) => {
    if (!name) return "bg-gray-400"; // fallback color
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const avatarColor = getColor(userName);

  return (
    <div className="flex items-center gap-3 p-3">
      <button>☰</button>

      <input
        type="text"
        placeholder="Search files and folders"
        className="flex-1 px-4 py-2 rounded-full bg-blue-600 text-white"
      />

      {/* PROFILE ICON */}
      <div
        className={`w-8 h-8 ${avatarColor} rounded-full 
        flex items-center justify-center text-white font-semibold`}
      >
        {initial || "?"}
      </div>
    </div>
  );
}
