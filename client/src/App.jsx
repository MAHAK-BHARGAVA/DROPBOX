import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/Loginpage";
import SignupPage from "./Pages/SignupPage";
import FilesPage from "./Pages/FilesPage";
import UserPage from "./Pages/UserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Layout */}
        <Route path="/" element={<Layout />}>

          <Route index element={<HomePage />} />

          <Route
            path="files"
            element={
                <FilesPage />
            }
          />

        </Route>

        <Route
            path="UserPage"
            element={
                <UserPage />
            }
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


