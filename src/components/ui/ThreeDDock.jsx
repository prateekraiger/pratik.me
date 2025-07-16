import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveMenu } from "./modern-mobile-menu";
import { useThreeD } from "../../contexts/ThreeDContext";
import { Home, User, FolderOpen, Mail } from "lucide-react";

const menuItems = [
  { label: "home", icon: Home, path: "/" },
  { label: "about", icon: User, path: "/about" },
  { label: "projects", icon: FolderOpen, path: "/projects" },
  { label: "contact", icon: Mail, path: "/contact" },
];

const ThreeDDock = () => {
  const { is3DEnabled, setPage } = useThreeD();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleItemClick = (item, index) => {
    setPage(item.label);
    navigate(item.path);
  };

  // Handle scroll-based visibility
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDifference = Math.abs(currentScrollY - lastScrollY);

    // Only trigger if scroll difference is significant (prevents jittery behavior)
    if (scrollDifference < 5) return;

    // Show dock when scrolling up, hide when scrolling down
    if (currentScrollY < lastScrollY || currentScrollY < 50) {
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    if (is3DEnabled) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [is3DEnabled, handleScroll]);

  // Only show dock when 3D mode is enabled
  if (!is3DEnabled) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-4 left-0 right-0 pointer-events-none z-[9999] flex justify-center items-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 100,
        }}
        exit={{ opacity: 0, y: 100 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.4,
        }}
      >
        <div className="pointer-events-auto">
          <InteractiveMenu
            items={menuItems}
            accentColor="#915EFF"
            onItemClick={handleItemClick}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThreeDDock;
