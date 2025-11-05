import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = () => {
  // Sidebar open state: initially closed so only header hamburger is visible
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [headerHamburgerVisible, setHeaderHamburgerVisible] = useState(true);

  const handleHeaderClick = () => {
    // When header hamburger clicked: hide the header hamburger and open the sidebar
    setHeaderHamburgerVisible(false);
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    // When in-sidebar close (X) clicked: close sidebar and show header hamburger
    setIsSidebarOpen(false);
    setHeaderHamburgerVisible(true);
  };

  // Check auth token to adjust main background for unauthenticated visitors
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const mainBgClass = token ? "" : "bg-black text-white";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        showHamburger={headerHamburgerVisible}
        onHeaderClick={handleHeaderClick}
      />

      <div className="flex">
        {/* Render sidebar only when open */}
        {isSidebarOpen && (
          <Sidebar isOpen={isSidebarOpen} onToggle={handleSidebarClose} />
        )}

        <main
          className={`flex-1 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          } p-6 transition-all duration-300 ${mainBgClass}`}
        >
          <Outlet />
        </main>
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
