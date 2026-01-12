import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpTrayIcon,
  LinkIcon,
  ArrowPathIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";

const Mainsection = () => {
  const navigate = useNavigate();
  const goToLogin = () => navigate("/login");

  return (
    <>
      {/* HERO GRID */}
      <main className="w-full py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div className="pl-12 pr-4 md:pl-24 md:pr-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Organize your <br /> files effortlessly
          </h1>

          <p className="mt-4 text-gray-600 text-base md:text-lg">
            Everything you need in one workspace.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Feature icon={ArrowUpTrayIcon} text="Upload" onClick={goToLogin} />
            <Feature icon={LinkIcon} text="Share" onClick={goToLogin} />
            <Feature icon={ArrowPathIcon} text="Sync" onClick={goToLogin} />
            <Feature icon={CloudIcon} text="Access Anywhere" onClick={goToLogin} />
          </div>

          {/* Get Started Button */}
          <button
            onClick={goToLogin}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
          >
            Get Started
          </button>
        </div>

        {/* RIGHT CONTENT - SVG */}
        <div className="w-full">
           <svg
            viewBox="0 0 1200 800"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f0f4ff" />
                <stop offset="100%" stopColor="#e8f0ff" />
              </linearGradient>

              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="8" stdDeviation="20" floodColor="rgba(0,0,0,0.15)" />
              </filter>

              <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="15" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient id="docxGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>
              <linearGradient id="xlsxGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#065f46" />
              </linearGradient>
              <linearGradient id="pdfGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
              <linearGradient id="jpgGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
              <linearGradient id="cssGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>

              <radialGradient id="searchGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background */}
            <rect width="1200" height="800" fill="url(#bgGradient)" rx="20" />

            {/* File list panel */}
            <g filter="url(#shadow)">
              <rect x="50" y="50" width="400" height="320" rx="20" ry="20" fill="white" />
              <text x="90" y="100" fontFamily="Arial" fontSize="22" fill="#111">Projects</text>

              <rect x="310" y="80" width="120" height="40" rx="10" ry="10" fill="#007bff" />
              <text x="350" y="105" fontFamily="Arial" fontSize="16" fill="white">Upload</text>

              <text x="90" y="160" fontFamily="Arial" fontSize="22" fill="#111">Photos</text>
              <rect x="90" y="170" width="200" height="6" rx="3" ry="3" fill="#d0d4e0" />

              <text x="90" y="210" fontFamily="Arial" fontSize="22" fill="#111">Work</text>
              <rect x="90" y="220" width="180" height="6" rx="3" ry="3" fill="#d0d4e0" />

              <text x="90" y="260" fontFamily="Arial" fontSize="22" fill="#111">Documents</text>
              <rect x="90" y="270" width="150" height="6" rx="3" ry="3" fill="#d0d4e0" />
            </g>

            {/* Floating file icons */}
            <g filter="url(#glowFilter)">
              <rect x="500" y="150" width="80" height="100" rx="12" ry="12" fill="url(#docxGradient)" />
              <text x="520" y="200" fontFamily="Arial" fontSize="20" fill="white">DOCX</text>

              <rect x="600" y="130" width="80" height="100" rx="12" ry="12" fill="url(#xlsxGradient)" />
              <text x="620" y="180" fontFamily="Arial" fontSize="20" fill="white">XLSX</text>

              <rect x="700" y="170" width="80" height="100" rx="12" ry="12" fill="url(#pdfGradient)" />
              <text x="720" y="220" fontFamily="Arial" fontSize="20" fill="white">PDF</text>

              <rect x="650" y="250" width="80" height="100" rx="12" ry="12" fill="url(#jpgGradient)" />
              <text x="670" y="300" fontFamily="Arial" fontSize="20" fill="white">JPG</text>

              <rect x="550" y="270" width="80" height="100" rx="12" ry="12" fill="url(#cssGradient)" />
              <text x="570" y="320" fontFamily="Arial" fontSize="20" fill="white">CSS</text>
            </g>

            {/* Search bar */}
            <g filter="url(#shadow)">
              <rect x="50" y="400" width="500" height="60" rx="30" ry="30" fill="white" />
              <text x="90" y="440" fontFamily="Arial" fontSize="20" fill="#111">Ask Assistant</text>

              <circle cx="90" cy="430" r="25" fill="url(#searchGlow)" />
              <polygon points="110,430 100,440 100,420" fill="#111" />

              <circle cx="540" cy="430" r="28" fill="url(#searchGlow)" />
              <polygon points="535,420 555,430 535,440" fill="white" />
            </g>
          </svg>
        </div>
      </main>

      <section className="bg-[#f7f6f3] py-12 w-full">
        <div className="w-full m-0 p-0">
          <h2 className="text-3xl md:text-[48px] font-medium tracking-tight text-[#1e1919] text-center">
            All the tools you need in one plan
          </h2>

          <p className="mt-3 md:mt-4 text-[16px] md:text-[18px] leading-[26px] md:leading-7 text-[#1e1919] text-center">
            Store and share files. Sign and send documents. Seamlessly collaborate on creative media. All in one place.
          </p>
        </div>
      </section>
    </>
  );
};

// Updated Feature component
const Feature = ({ icon: Icon, text, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center space-x-2 md:space-x-3 text-blue-600 font-medium text-sm md:text-base cursor-pointer hover:underline"
  >
    <Icon className="w-4 h-4 md:w-5 md:h-5" />
    <span>{text}</span>
  </div>
);

export default Mainsection;



