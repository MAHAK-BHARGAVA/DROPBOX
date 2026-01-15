import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import GetStarted from "./Pages/GetStarted";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
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
              <ProtectedRoute>
                <FilesPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
