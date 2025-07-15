import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothCursor from "./components/common/SmoothCursor.jsx";
import AnimatedRoutes from "./components/Loaders/AnimatedRoutes";
import Loader from "./components/Loaders/Loader";
import PerformanceMonitor from "./components/common/PerformanceMonitor";
import { initSmoothScroll } from "./utils/animations";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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
    <Router>
      <PerformanceMonitor />
      <div className="min-h-screen flex flex-col">
        {/* Main background gradient */}
        <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] bg-gradient"></div>
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,#915EFF_0%,transparent_50%)] opacity-20"></div>
        <Navbar />
        <SmoothCursor />
        {/* Main Content with AnimatedRoutes */}
        <motion.main
          className="flex-grow w-full pt-20 md:pt-24 px-4 md:px-8 relative"
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        >
          <Footer />
        </motion.div>
      </div>
    </Router>
  );
};

export default App;
