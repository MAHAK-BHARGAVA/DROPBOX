// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import GetStarted from "./Pages/GetStarted";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Loginpage";
import SignupPage from "./Pages/SignupPage";
import Layout from "./components/Layout";
import HomePage from "./Pages/HomePage";
import FilesPage from "./Pages/FilesPage";

import { Toaster } from "react-hot-toast"; // ✅ add this

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ✅ Toast container (global) */}
    <Toaster position="bottom-left" />

    {/* Your app */}
    <App />
    <BrowserRouter>
      <Routes>
        {/* Login and Signup as top-level routes (not rendered inside Layout) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      

        {/* App layout for the main application pages */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
            <Route path="/upload-file" element={<GetStarted/>} />
          <Route
            path="files"
            element={
          
                <FilesPage />
              
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
