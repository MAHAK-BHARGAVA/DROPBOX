import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isSidebarCollapsed, showHamburger = true, onHeaderClick }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow-md">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-4">
        {/* {showHamburger && (
          <button
            onClick={() => onHeaderClick && onHeaderClick()}
            className="p-2 rounded-md hover:bg-blue-500 focus:outline-none transition-colors"
            aria-label="Toggle sidebar"
          >
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )} */}

        {/* Dropbox Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/dropboxicon.svg"  // <-- Correct path since it's in public folder
            alt="Dropbox Logo"
            className="w-8 h-8 transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
          <span className="font-bold text-2xl transition-all duration-300 ease-in-out group-hover:drop-shadow-md group-hover:scale-105">
            Dropbox
          </span>
        </Link>
      </div>

      {/* Right: Auth Buttons */}
      <div className="flex items-center gap-3">
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            Log Out
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1 rounded-md hover:underline transition-all"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-4 py-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;



// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Header = ({
//   isSidebarCollapsed,
//   showHamburger = true,
//   onHeaderClick,
// }) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const toggleDarkMode = () => {
//     document.documentElement.classList.toggle("dark");
//   };

//   return (
//     <header className="
//       flex justify-between items-center px-6 py-4
//       bg-blue-600 text-white
//       dark:bg-gray-900
//       transition-colors
//     ">
//       <div className="flex items-center gap-4">
//         {showHamburger && (
//           <button
//             onClick={() => onHeaderClick && onHeaderClick()}
//             className="p-2 rounded-md hover:bg-blue-500 dark:hover:bg-gray-700"
//             aria-label="Toggle sidebar"
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         )}

//         <Link to="/" className="text-2xl font-bold hover:text-white">
//           Dropbox
//         </Link>
//       </div>

//       <div className="flex items-center gap-4">

//         {/* Dark Mode Toggle */}
//         <button
//           onClick={toggleDarkMode}
//           className="
//             bg-white text-blue-600
//             dark:bg-gray-800 dark:text-white
//             px-3 py-1 rounded
//             hover:bg-gray-100 dark:hover:bg-gray-700
//           "
//         >
//           Dark
//         </button>

//         {token ? (
//           <button
//             onClick={handleLogout}
//             className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
//           >
//             Log Out
//           </button>
//         ) : (
//           <>
//             <Link to="/login" className="hover:underline">
//               Log In
//             </Link>
//             <Link
//               to="/signup"
//               className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
//             >
//               Sign Up
//             </Link>
//           </>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
