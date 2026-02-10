// import { useState, useEffect } from "react";
// import { 
//   FiUser, FiCamera, FiLock, 
//   FiShield, FiGlobe, FiSun, FiMoon 
// } from "react-icons/fi";

// export default function AccountSettings({ user }) {

//   const [showNameModal, setShowNameModal] = useState(false);
//   const [showPasswordModal, setShowPasswordModal] = useState(false);

//   const [name, setName] = useState(user?.name || "MAHAK");
//   const [newName, setNewName] = useState("");

//   const [profilePic, setProfilePic] = useState(null);
//   const [twoFA, setTwoFA] = useState(false);
//   const [language, setLanguage] = useState("English");

//   /* THEME */
//   // const [theme, setTheme] = useState(
//   //   localStorage.getItem("theme") || "light"
//   // );

//   // useEffect(() => {
//   //   document.body.className = theme;
//   // }, [theme]);

//   // function toggleTheme() {
//   //   const newTheme = theme === "light" ? "dark" : "light";
//   //   setTheme(newTheme);
//   //   localStorage.setItem("theme", newTheme);
//   // }

//   function handleImageUpload(e) {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePic(URL.createObjectURL(file));
//     }
//   }

//   function saveName() {
//     if (newName.trim()) {
//       setName(newName);
//       setShowNameModal(false);
//     }
//   }

//   return (
//     <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">

//       <h2 className="text-lg font-semibold">
//         Account Settings
//       </h2>

//       <SettingItem 
//         icon={<FiUser />}
//         title="Change Name"
//         desc={`Current: ${name}`}
//         onClick={() => setShowNameModal(true)}
//       />

//       <SettingItem 
//         icon={<FiCamera />}
//         title="Update Profile Picture"
//         desc="Upload a new photo"
//       >
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="mt-2 text-sm"
//         />

//         {profilePic && (
//           <img
//             src={profilePic}
//             alt="Preview"
//             className="w-20 h-20 rounded-full mt-2 object-cover"
//           />
//         )}
//       </SettingItem>

//       <SettingItem 
//         icon={<FiLock />}
//         title="Change Password"
//         desc="Update your password"
//         onClick={() => setShowPasswordModal(true)}
//       />

//       <SettingItem 
//         icon={<FiShield />}
//         title="Manage 2FA"
//         desc={twoFA ? "Enabled" : "Disabled"}
//       >
//         <label className="inline-flex items-center mt-2 cursor-pointer">
//           <input
//             type="checkbox"
//             checked={twoFA}
//             onChange={() => setTwoFA(!twoFA)}
//             className="sr-only"
//           />
//           <div className="w-11 h-6 bg-gray-300 rounded-full relative">
//             <div
//               className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition
//               ${twoFA ? "right-0.5" : "left-0.5"}`}
//             ></div>
//           </div>
//         </label>
//       </SettingItem>

//       <SettingItem 
//         icon={<FiGlobe />}
//         title="Language Preference"
//         desc={`Selected: ${language}`}
//       >
//         <select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//           className="mt-2 border p-2 rounded text-sm"
//         >
//           <option>English</option>
//           <option>Hindi</option>
//           <option>French</option>
//           <option>Spanish</option>
//         </select>
//       </SettingItem>

//       {/* THEME */}
//       {/* <SettingItem
//         icon={theme === "light" ? <FiSun /> : <FiMoon />}
//         title="Theme"
//         desc={theme === "light" ? "Light Mode" : "Dark Mode"}
//       >
//         <label className="inline-flex items-center mt-2 cursor-pointer">
//           <input
//             type="checkbox"
//             checked={theme === "dark"}
//             onChange={toggleTheme}
//             className="sr-only"
//           />

//           <div className="w-11 h-6 bg-gray-300 rounded-full relative">
//             <div
//               className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition
//               ${theme === "dark" ? "right-0.5" : "left-0.5"}`}
//             ></div>
//           </div>
//         </label>
//       </SettingItem> */}

//       {/* NAME MODAL */}
//       {showNameModal && (
//         <Modal title="Change Name" onClose={() => setShowNameModal(false)}>
//           <input
//             type="text"
//             placeholder="Enter new name"
//             value={newName}
//             onChange={(e) => setNewName(e.target.value)}
//             className="border p-2 w-full rounded mb-4"
//           />
//           <button
//             onClick={saveName}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Save
//           </button>
//         </Modal>
//       )}

//       {/* PASSWORD MODAL */}
//       {showPasswordModal && (
//         <Modal title="Change Password" onClose={() => setShowPasswordModal(false)}>
//           <input
//             type="password"
//             placeholder="Old Password"
//             className="border p-2 w-full rounded mb-3"
//           />
//           <input
//             type="password"
//             placeholder="New Password"
//             className="border p-2 w-full rounded mb-3"
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             className="border p-2 w-full rounded mb-4"
//           />

//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Update Password
//           </button>
//         </Modal>
//       )}

//     </div>
//   );
// }

// /* SETTING ROW */
// function SettingItem({ icon, title, desc, onClick, children }) {
//   return (
//     <div
//       onClick={onClick}
//       className="card p-4 rounded-lg hover:opacity-90 cursor-pointer"
//     >
//       <div className="flex items-center gap-4">
//         <div className="text-xl text-blue-500">
//           {icon}
//         </div>

//         <div>
//           <p className="font-medium">{title}</p>
//           <p className="text-sm opacity-70">
//             {desc}
//           </p>
//         </div>
//       </div>

//       {children}
//     </div>
//   );
// }

// /* MODAL */
// function Modal({ title, onClose, children }) {
//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

//       <div className="card p-6 rounded-lg w-80">

//         <h3 className="font-semibold mb-4">
//           {title}
//         </h3>

//         {children}

//         <button
//           onClick={onClose}
//           className="mt-4 text-sm opacity-70"
//         >
//           Cancel
//         </button>

//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import { 
  FiUser, FiCamera, FiLock, 
  FiShield, FiGlobe 
} from "react-icons/fi";
import ImageCropper from "./ImageCropper";

export default function AccountSettings({ user }) {

  const [showNameModal, setShowNameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [name, setName] = useState(user?.name || "?");
  const [newName, setNewName] = useState("");

  const [profilePic, setProfilePic] = useState(null);
  const [twoFA, setTwoFA] = useState(false);
  const [language, setLanguage] = useState("English");

  const [loading, setLoading] = useState(false);

  const [rawImage, setRawImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  /* PASSWORD STATES */
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  setRawImage(URL.createObjectURL(file));
  setShowCropper(true);
}

async function uploadCroppedImage(blob) {

  const formData = new FormData();
    formData.append("photo", blob, "avatar.jpg");

  await axios.put(
    "http://localhost:5000/api/user/update-photo",
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  window.location.reload();
}


async function getCroppedBlob(imageSrc, crop) {
  const img = new Image();
  img.src = imageSrc;
  await img.decode();

  const canvas = document.createElement("canvas");
  canvas.width = crop.width;
  canvas.height = crop.height;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    img,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise(resolve => {
    canvas.toBlob(resolve, "image/jpeg");
  });
}


  /* ======================
     SAVE NAME
  ====================== */
  async function saveName() {
    if (!newName.trim()) return;

    try {
      setLoading(true);

      const res = await axios.put(
        "http://localhost:5000/api/user/update-name",
        { name: newName },
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setName(res.data.user.name);
      setShowNameModal(false);
      setNewName("");

    } catch (err) {
      alert(err.response?.data?.message || "Failed to update name");
    } finally {
      setLoading(false);
    }
  }

  /* ======================
     UPDATE PASSWORD
  ====================== */
  async function updatePassword() {

    if (!oldPassword || !newPassword || !confirmPassword) {
      return alert("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      await axios.put(
        "http://localhost:5000/api/user/update-password",
        {
          oldPassword,
          newPassword
        },
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Password updated successfully");

      setShowPasswordModal(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err) {
      alert(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-2 pb-20">

      <h2 className="text-xl font-semibold text-gray-900">
        Account Settings
      </h2>

      {/* CHANGE NAME */}
      <SettingItem 
        icon={<FiUser />}
        title="Change Name"
        desc={`Current: ${name}`}
        onClick={() => setShowNameModal(true)}
      />

      {/* PROFILE PHOTO */}
      <SettingItem 
        icon={<FiCamera />}
        title="Update Profile Picture"
        desc="Upload a new photo"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-3 text-sm"
        />

        {profilePic && (
          <img
            src={profilePic}
            alt="Preview"
            className="w-20 h-20 rounded-full mt-3 object-cover border"
          />
        )}
      </SettingItem>

      {/* PASSWORD */}
      <SettingItem 
        icon={<FiLock />}
        title="Change Password"
        desc="Update your password"
        onClick={() => setShowPasswordModal(true)}
      />

      {/* 2FA */}
      <SettingItem 
        icon={<FiShield />}
        title="Manage 2FA"
        desc={twoFA ? "Enabled" : "Disabled"}
      >
        <label className="inline-flex items-center mt-3 cursor-pointer">
          <input
            type="checkbox"
            checked={twoFA}
            onChange={() => setTwoFA(!twoFA)}
            className="sr-only"
          />

          <div className={`w-11 h-6 rounded-full relative transition
            ${twoFA ? "bg-blue-600" : "bg-gray-300"}`}>

            <div
              className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition
              ${twoFA ? "right-0.5" : "left-0.5"}`}
            ></div>
          </div>
        </label>
      </SettingItem>

      {/* LANGUAGE */}
      <SettingItem 
        icon={<FiGlobe />}
        title="Language Preference"
        desc={`Selected: ${language}`}
      >
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-3 border px-3 py-2 rounded w-full"
        >
          <option>English</option>
          <option>Hindi</option>
          <option>French</option>
          <option>Spanish</option>
        </select>
      </SettingItem>

      {/* NAME MODAL */}
      {showNameModal && (
        <Modal title="Change Name" onClose={() => setShowNameModal(false)}>
          <input
            type="text"
            placeholder="Enter new name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border px-3 py-2 w-full rounded mb-4"
          />

          <button
            onClick={saveName}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </Modal>
      )}

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <Modal title="Change Password" onClose={() => setShowPasswordModal(false)}>

          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border px-3 py-2 w-full rounded mb-3"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border px-3 py-2 w-full rounded mb-3"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border px-3 py-2 w-full rounded mb-4"
          />

          <button
            onClick={updatePassword}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </Modal>
      )}

      {/* IMAGE CROPPER MODAL */}
{showCropper && (
  <Modal title="Crop Image" onClose={() => setShowCropper(false)}>

    <ImageCropper
      image={rawImage}
      onCropDone={async (area) => {
        const blob = await getCroppedBlob(rawImage, area);
        uploadCroppedImage(blob);
      }}
    />

  </Modal>
)}


    </div>
  );
}

/* SETTING ROW */
function SettingItem({ icon, title, desc, onClick, children }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border rounded-xl p-4 
                 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="text-xl text-blue-500">
          {icon}
        </div>

        <div>
          <p className="font-medium">
            {title}
          </p>
          <p className="text-sm text-gray-500">
            {desc}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}

/* MODAL */
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/40 
                    flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-80 shadow-xl">

        <h3 className="font-semibold mb-4 text-lg">
          {title}
        </h3>

        {children}

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}

