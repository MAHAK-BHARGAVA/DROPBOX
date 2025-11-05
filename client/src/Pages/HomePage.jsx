import React from "react";

const HomePage = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headingClass = token
    ? "text-4xl font-bold text-gray-800 mb-4"
    : "text-4xl font-bold text-white mb-4";
  const paragraphClass = token
    ? "text-xl text-gray-600 mb-8"
    : "text-xl text-gray-200 mb-8";
  const primaryBtnClass = token
    ? "bg-blue-600 text-white"
    : "bg-white text-blue-600";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className={headingClass}>Welcome to Dropbox Clone</h1>
        <p className={paragraphClass}>
          Store, share, and collaborate on files and folders from any mobile
          device, tablet, or computer
        </p>
        <div className="flex justify-center gap-4">
          <button
            className={`${primaryBtnClass} px-6 py-3 rounded-lg hover:bg-gray-100 transition`}
          >
            Get Started
          </button>
          <button
            className={
              token
                ? "border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
                : "border border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition"
            }
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
