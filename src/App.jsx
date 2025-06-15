import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";
import SmoothCursor from "./components/SmoothCursor.jsx";
import Loader from "./components/Loader";

const App = () => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800); // Show loader for 1.8s
    return () => clearTimeout(timer);
  }, []);
  if (loading) return <Loader />;
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Main background gradient */}
        <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]"></div>
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,#915EFF_0%,transparent_50%)] opacity-20"></div>
        <Navbar />
        <SmoothCursor />
        {/* Main Content with AnimatedRoutes */}
        <motion.main
          className="flex-grow w-full pt-20 md:pt-24 px-4 md:px-8 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="max-w-[1920px] mx-auto"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatedRoutes />
          </motion.div>
        </motion.main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
