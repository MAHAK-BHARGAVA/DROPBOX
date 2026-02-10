import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import FilesPage from "./Pages/FilesPage";
import UserPage from "./Pages/UserPage";
import ProfilePage from "./Pages/ProfilePage"; // mobile profile
import TrashPage from "./Pages/TrashPage"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="files" element={<FilesPage />} />
        </Route>

        <Route>
          <Route path="user" element={<UserPage />} />
          <Route path="profile" element={<ProfilePage  />} />\
          <Route path="/trash" element={<TrashPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;






