import React, { Suspense, lazy, useRef, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./Loader";
import StairsTransition from "./StairsTransition";

const Home = lazy(() => import("../../Pages/Home"));
const About = lazy(() => import("../../Pages/About"));
const Project = lazy(() => import("../../Pages/Project"));
const Contact = lazy(() => import("../../Pages/Contact"));

const pageVariants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: -20,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
  delay: 0.5,
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const isFirstLoad = useRef(true);
  useEffect(() => {
    isFirstLoad.current = false;
  }, []);
  return (
    <>
      {!isFirstLoad.current && <StairsTransition />}
      <AnimatePresence mode="wait">
        <Suspense fallback={<Loader />}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/about"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <About />
                </motion.div>
              }
            />
            <Route
              path="/projects"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Project />
                </motion.div>
              }
            />
            <Route
              path="/contact"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Contact />
                </motion.div>
              }
            />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;
