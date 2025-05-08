import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Coffee } from "lucide-react";

const HobbyBlock = () => {
  const hobbies = [
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
  ];

  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const pillRefs = useRef({});
  const [pillSizes, setPillSizes] = useState({});

  // Update container and pill sizes when component mounts
  useEffect(() => {
    const updateSizes = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });

        // Update pill sizes
        const newPillSizes = {};
        hobbies.forEach((hobby) => {
          if (pillRefs.current[hobby.id]) {
            const pillRect = pillRefs.current[hobby.id].getBoundingClientRect();
            newPillSizes[hobby.id] = {
              width: pillRect.width,
              height: pillRect.height,
            };
          }
        });
        setPillSizes(newPillSizes);
      }
    };

    // Initial measurement
    setTimeout(updateSizes, 200);

    // Update on resize
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  return (
    <div className="col-span-12 md:col-span-8 bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 rounded-xl shadow-lg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold mb-4 text-white flex items-center">
          <Coffee className="mr-2 text-yellow-400" /> When I'm Not Coding
        </h3>

        <div
          ref={containerRef}
          className="relative mt-2 h-48 border border-zinc-700/30 rounded-lg p-4 overflow-hidden"
        >
          <div className="flex flex-wrap gap-3">
            {hobbies.map((hobby) => (
              <motion.div
                key={hobby.id}
                ref={(el) => (pillRefs.current[hobby.id] = el)}
                className={`inline-block px-4 py-2 rounded-lg text-sm cursor-grab active:cursor-grabbing ${hobby.color}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: Math.random() * 0.3 }}
                drag
                dragConstraints={containerRef}
                dragElastic={0}
                dragMomentum={false}
                whileHover={{ scale: 1.05 }}
                whileDrag={{
                  zIndex: 10,
                  transition: { duration: 0 },
                }}
                // Custom drag constraint logic
                _dragX={(_valueX, { offset }) => {
                  const id = hobby.id;
                  if (!containerSize.width || !pillSizes[id]) return offset.x;
                  const maxX = containerSize.width - pillSizes[id].width - 16; // 16px for padding
                  return offset.x < 0 ? 0 : offset.x > maxX ? maxX : offset.x;
                }}
                _dragY={(_valueY, { offset }) => {
                  const id = hobby.id;
                  if (!containerSize.height || !pillSizes[id]) return offset.y;
                  const maxY = containerSize.height - pillSizes[id].height - 16; // 16px for padding
                  return offset.y < 0 ? 0 : offset.y > maxY ? maxY : offset.y;
                }}
              >
                {hobby.name}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HobbyBlock;
