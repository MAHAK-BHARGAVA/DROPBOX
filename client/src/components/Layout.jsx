// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import Footer from "./Footer";

// const Layout = () => {
//   // Sidebar open state: initially closed so only header hamburger is visible
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [headerHamburgerVisible, setHeaderHamburgerVisible] = useState(true);

//   const handleHeaderClick = () => {
//     // When header hamburger clicked: hide the header hamburger and open the sidebar
//     setHeaderHamburgerVisible(false);
//     setIsSidebarOpen(true);
//   };

//   const handleSidebarClose = () => {
//     // When in-sidebar close (X) clicked: close sidebar and show header hamburger
//     setIsSidebarOpen(false);
//     setHeaderHamburgerVisible(true);
//   };

//   // Check auth token to adjust main background for unauthenticated visitors
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   const mainBgClass = token ? "" : "bg-white text-blue";

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header
//         showHamburger={headerHamburgerVisible}
//         onHeaderClick={handleHeaderClick}
//       />

//       <div className="flex">
//         {/* Render sidebar only when open */}
//         {isSidebarOpen && (
//           <Sidebar isOpen={isSidebarOpen} onToggle={handleSidebarClose} />
//         )}

//         <main
//           className={`flex-1 ${
//             isSidebarOpen ? "ml-64" : "ml-0"
//           }  transition-all duration-300 ${mainBgClass}`}
//         >
//           <Outlet />
//         </main>
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default Layout;

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="p-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;

// import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import Footer from "./Footer";

// const Layout = () => {

//   const toggleDarkMode = () => {
//     document.documentElement.classList.toggle("dark");
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-black transition-colors">

//       {/* Dark Mode Toggle */}
//       {/* <button
//         onClick={toggleDarkMode}
//         className="fixed top-5 right-5 z-50
//         bg-gray-800 text-white px-4 py-2 rounded"
//       >
//         Toggle Dark
//       </button> */}

//       <Header />
      
//       <main className="p-6">
//         <Outlet />
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Layout;



