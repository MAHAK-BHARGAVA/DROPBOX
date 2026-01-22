// import { useState } from "react";
// import { FiChevronRight } from "react-icons/fi";
// import AccountSettings from "./AccountSettings";
// import StoragePanel from "./StoragePanel";

// export default function SettingsPanel({ user }) {

//   const [activeTab, setActiveTab] = useState(null);

//   if (activeTab) {
//     return (
//       <div className="p-4">

//         <button
//           onClick={() => setActiveTab(null)}
//           className="text-sm text-blue-500 mb-4"
//         >
//           ← Back
//         </button>

//         {activeTab === "Account" && <AccountSettings user={user} />}
//         {activeTab === "Storage" && <StoragePanel />}
//         {activeTab === "Help" && <div>Help & Support</div>}
//         {activeTab === "Logout" && <div>Logout</div>}
//       </div>
//     );
//   }

//   return (
//     <div className="w-full mt-6 space-y-3">

//       <MenuItem 
//         label="Account Settings"
//         onClick={() => setActiveTab("Account")}
//       />

//       <MenuItem 
//         label="Storage Management"
//         onClick={() => setActiveTab("Storage")}
//       />

//       <MenuItem 
//         label="Help & Support"
//         onClick={() => setActiveTab("Help")}
//       />

//       <MenuItem 
//         label="Logout"
//         onClick={() => setActiveTab("Logout")}
//       />

//     </div>
//   );
// }

// function MenuItem({ label, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       className="
//         flex justify-between items-center 
//         p-3 rounded cursor-pointer
//         hover:bg-gray-100
//       "
//     >
//       <span>{label}</span>
//       <FiChevronRight className="text-gray-400 text-xl" />
//     </div>
//   );
// }

import { useState } from "react";
import { FiChevronRight, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AccountSettings from "./AccountSettings";
import StoragePanel from "./StoragePanel";

export default function SettingsPanel({ user }) {
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  if (activeTab) {
    return (
      <div className="p-4 w-full max-w-full overflow-x-hidden">

        <button
          onClick={() => setActiveTab(null)}
          className="text-sm text-blue-500 mb-4"
        >
          ← Back
        </button>

        {activeTab === "Account" && <AccountSettings user={user} />}
        {activeTab === "Storage" && <StoragePanel />}
        {activeTab === "Help" && <div>Help & Support</div>}
      </div>
    );
  }

  return (
    <div className="w-full mt-6 space-y-3">

      <MenuItem
        label="Account Settings"
        onClick={() => setActiveTab("Account")}
      />

      <MenuItem
        label="Storage Management"
        onClick={() => setActiveTab("Storage")}
      />

      <MenuItem
        label="Help & Support"
        onClick={() => setActiveTab("Help")}
      />

      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="
          w-full flex justify-between items-center
          p-3 rounded
          bg-red-600 text-white
          hover:bg-red-700
          transition
        "
      >
        <span>Logout</span>
        <FiLogOut className="text-xl" />
      </button>

    </div>
  );
}

function MenuItem({ label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        flex justify-between items-center
        p-3 rounded cursor-pointer
        hover:bg-gray-100
      "
    >
      <span>{label}</span>
      <FiChevronRight className="text-gray-400 text-xl" />
    </div>
  );
}

