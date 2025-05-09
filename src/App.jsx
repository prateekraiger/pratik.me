import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";
import SmoothCursor from "./components/SmoothCursor.jsx";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Main background gradient */}
        <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]"></div>
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,#915EFF_0%,transparent_50%)] opacity-20"></div>
        <Navbar />
        <SmoothCursor /> {/* SmoothCursor is used here */}
        {/* Main Content with AnimatedRoutes */}
        <main className="flex-grow w-full pt-20 md:pt-24 px-4 md:px-8 relative mb-20">
          <div className="max-w-[1920px] mx-auto">
            <AnimatedRoutes />
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
