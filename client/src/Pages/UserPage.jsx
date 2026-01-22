import React, { useEffect, useState } from "react";
import Header from "../components/users/Header";
import FileDashboard from "../components/users/FileDashboard";

const UserPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:5000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setUser(data);

      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">

      <Header user={user} />

      <FileDashboard />

    </div>
  );
};

export default UserPage;

