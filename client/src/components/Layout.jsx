import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "../../index.css";

export default function Layout() {
    return (
        <div className="dark">
            <Header />
            {/* <Sidebar /> */}
            <main className="min-h-[calc(100% - 70px)] w-full bg-primary dark:bg-primary-dark">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
}
