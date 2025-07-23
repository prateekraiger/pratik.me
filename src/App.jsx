import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AnimeNavbar from "./components/AnimeNavbar";
import Footer from "./components/Footer";
import SmoothCursor from "./components/common/SmoothCursor.jsx";
import AnimatedRoutes from "./components/Loaders/AnimatedRoutes";
import Loader from "./components/Loaders/Loader";
import PerformanceMonitor from "./components/common/PerformanceMonitor";
import { initSmoothScroll } from "./utils/animations";

// 3D Components
import { ThreeDProvider, useThreeD } from "./contexts/ThreeDContext";
import ThreeDToggle from "./components/3D/ThreeDToggle";
import ThreeDScene from "./components/3D/ThreeDScene";
import ThreeDLoader from "./components/3D/ThreeDLoader";
import ThreeDDock from "./components/ui/ThreeDDock";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Main App Content Component (needs to be inside ThreeDProvider)
const AppContent = () => {
  const { isLoading, is3DEnabled } = useThreeD();

  return (
    <Router>
      <PerformanceMonitor />
      <div className="min-h-screen flex flex-col">
        {/* 3D Scene Background */}
        <ThreeDScene />

        {/* 3D Loading Screen */}
        <ThreeDLoader isLoading={isLoading} />

        {/* Main background gradient */}
        <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] bg-gradient"></div>
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,#915EFF_0%,transparent_50%)] opacity-20"></div>

        <AnimeNavbar />
        <SmoothCursor />

        {/* 3D Mode Popup removed as per user request */}

        {/* 3D Toggle Button */}
        <ThreeDToggle />

        {/* Main Content with AnimatedRoutes */}
        <motion.main
          className={`flex-grow w-full px-4 md:px-8 relative z-10 ${
            is3DEnabled ? "pt-4 md:pt-8" : "pt-20 md:pt-24"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <motion.div
            className="max-w-[1920px] mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <AnimatedRoutes />
          </motion.div>
        </motion.main>
        {/* Footer - Hidden in 3D mode */}
        {!is3DEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="relative z-10"
          >
            <Footer />
          </motion.div>
        )}

        {/* 3D Dock - Only shows when 3D mode is enabled */}
        <ThreeDDock />
      </div>
    </Router>
  );
};

const App = () => {
  const [loading, setLoading] = React.useState(true);
  const [showApp, setShowApp] = React.useState(false);

  React.useEffect(() => {
    if (!loading) {
      // Wait for loader fade-out before showing app
      const timer = setTimeout(() => setShowApp(true), 400);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Initialize smooth scroll and animations
  useEffect(() => {
    if (showApp) {
      initSmoothScroll();

      // Refresh ScrollTrigger on route changes
      const refreshScrollTrigger = () => {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      };

      window.addEventListener("popstate", refreshScrollTrigger);
      return () => window.removeEventListener("popstate", refreshScrollTrigger);
    }
  }, [showApp]);

  if (!showApp) {
    return <Loader onFinish={() => setLoading(false)} />;
  }

  return (
    <ThreeDProvider>
      <AppContent />
    </ThreeDProvider>
  );
};

export default App;
