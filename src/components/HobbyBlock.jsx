import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Coffee } from "lucide-react";

const HobbyBlock = () => {
  const [hobbies, setHobbies] = useState([
    { id: 1, name: "Problem Solving", color: "bg-red-900/30 text-red-300" },
    {
      id: 2,
      name: "Open Source Contributing",
      color: "bg-green-900/30 text-green-300",
    },
    {
      id: 3,
      name: "Building Side Projects",
      color: "bg-blue-900/30 text-blue-300",
    },
    { id: 4, name: "Chess", color: "bg-yellow-900/30 text-yellow-300" },
    { id: 5, name: "Gaming", color: "bg-pink-900/30 text-pink-300" },
  ]);

  const [activeId, setActiveId] = useState(null);
  const containerRef = useRef(null);
  const [bounds, setBounds] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  // Function to update bounds based on container size
  const updateBounds = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Adjust bounds to keep elements fully visible within container
      setBounds({
        left: 10, // Add some padding from the left edge
        right: rect.width - 110, // Account for element width (~100px) + padding
        top: 10, // Add some padding from the top edge
        bottom: rect.height - 50, // Account for element height (~40px) + padding
      });
    }
  };

  useEffect(() => {
    // Initial bounds calculation
    updateBounds();

    // Update bounds when window resizes
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  // Recalculate bounds when component mounts and after render
  useEffect(() => {
    // Small delay to ensure container is fully rendered
    const timer = setTimeout(updateBounds, 100);
    return () => clearTimeout(timer);
  }, [hobbies]);

  // Handle click on hobby block
  const handleClick = (id) => {
    setActiveId(id);

    // Reset active ID after animation completes
    setTimeout(() => {
      setActiveId(null);
    }, 500);
  };

  return (
    <div className="col-span-12 md:col-span-8 bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 rounded-xl shadow-lg relative overflow-hidden">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onLayoutComplete={updateBounds}
        >
          <h3 className="text-xl font-bold mb-4 text-white font-cal-sans flex items-center">
            <Coffee className="mr-2 text-yellow-400" /> When I'm Not Coding
          </h3>

          <div
            ref={containerRef}
            className="relative mt-2 min-h-48 border border-zinc-700/30 rounded-lg p-4 overflow-hidden bg-zinc-800/50 backdrop-blur-sm"
            style={{ height: "220px" }}
          >
            {hobbies.map((hobby) => (
              <motion.span
                key={hobby.id}
                className={`inline-block px-4 py-2 rounded-lg text-sm cursor-grab active:cursor-grabbing ${hobby.color} m-1.5 shadow-lg hover:shadow-xl transition-shadow`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: activeId === hobby.id ? 10 : 0, // Move down when clicked
                  boxShadow:
                    activeId === hobby.id
                      ? "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                      : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                transition={{
                  duration: 0.3,
                  delay: Math.random() * 0.5,
                  y: { type: "spring", stiffness: 300, damping: 15 },
                }}
                drag
                dragConstraints={bounds}
                dragElastic={0.1}
                dragMomentum={false}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileDrag={{ scale: 1.1, zIndex: 10 }}
                whileTap={{ scale: 0.95, y: 10 }} // Google-like press down effect
                onClick={() => handleClick(hobby.id)}
              >
                {hobby.name}
              </motion.span>
            ))}
          </div>

          <div className="mt-3 text-zinc-400 text-xs flex items-center justify-between">
            <span className="text-purple-300">Click to see the effect</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HobbyBlock;
