// import Mainsection from "../components/Mainsection";
// import Features from "../components/Features";
// import HowItWorks from "../components/HowItWorks";
// import Stats from "../components/Stats";
// import CTA from "../components/CTA";

// const HomePage = () => {
//   return (
//     <>
//       <Mainsection />

//       <Features />
//       <HowItWorks />
//       <Stats />
//       <CTA />
//     </>
//   );
// };

// export default HomePage;

import React from "react";
import Mainsection from "../components/Mainsection";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import CTA from "../components/CTA";

const HomePage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <Mainsection />

      {/* Features Section */}
      <Features />

      {/* How It Works */}
      <HowItWorks />

      {/* Stats */}
      <Stats />

      {/* Call to Action */}
      <CTA />
    </div>
  );
};

export default HomePage;

