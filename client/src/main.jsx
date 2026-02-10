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

import { Toaster } from "react-hot-toast"; // ✅ add this

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ✅ Toast container (global) */}
    <Toaster position="bottom-left" />

    {/* Your app */}
    <App />
  </React.StrictMode>
);
