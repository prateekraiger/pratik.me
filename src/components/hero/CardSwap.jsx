import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

// Card animation variants
const cardVariants = {
  initial: {
    scale: 0.95,
    opacity: 0,
    y: 20,
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1,
      velocity: 2,
    },
  },
  hover: {
    scale: 1.03,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      mass: 0.5,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 20,
    },
  },
};

// Enhanced ProjectCard with better visibility and proper image display
export const ProjectCard = forwardRef(
  ({ title, image, link, customClass, ...rest }, ref) => (
    <motion.a
      ref={ref}
      {...rest}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`absolute top-1/2 left-1/2 rounded-2xl overflow-hidden shadow-2xl [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] cursor-pointer ${
        customClass ?? ""
      } ${rest.className ?? ""}`}
      {...cardExitAnimation}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      style={{
        boxShadow:
          "0 12px 40px 0 rgba(0, 0, 0, 0.4), 0 4px 16px 0 rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        ...rest.style,
      }}
    >
      {/* Card Header with Framer Motion */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-md px-4 py-3 flex items-center gap-3 border-b border-white/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        <motion.span
          className="inline-block w-3 h-3 rounded-full bg-emerald-400 shadow-lg"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.h3
          className="text-white font-bold text-lg tracking-wide text-left truncate drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h3>
      </motion.div>

      {/* Card Content with Framer Motion */}
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Image with Motion */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${image})`,
            filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
          }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        />

        {/* Subtle overlay with Motion */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />

        {/* Content overlay area with Motion */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <motion.div
            className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-white/10"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.3)" }}
          >
            <motion.p
              className="text-sm font-medium"
              initial={{ opacity: 0.9 }}
              whileHover={{ opacity: 1 }}
            >
              Click to explore
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.a>
  )
);

ProjectCard.displayName = "ProjectCard";
ProjectCard.defaultProps = {
  customClass: "",
};

const cardExitAnimation = {
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

// Enhanced animation helpers
const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.2, // Reduced z-depth for better visibility
  zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
    opacity: 1, // Ensure full opacity
  });

const CardSwap = ({
  width = 280,
  height = 380,
  cardDistance = 25,
  verticalDistance = 35,
  delay = 4000,
  pauseOnHover = true,
  onCardClick,
  skewAmount = 2,
  easing = "power2.out",
  children,
}) => {
  const config = {
    ease: "power2.inOut", // Smooth, natural easing
    durDrop: 0.8, // Faster drop
    durMove: 1.2, // Smooth promotion
    durReturn: 1.0, // Quick return
    promoteOverlap: 0.6,
    returnDelay: 0.15,
  };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);

  // State for responsive dimensions
  const [currentWidth, setCurrentWidth] = useState(width);
  const [currentHeight, setCurrentHeight] = useState(height);
  const [currentCardDistance, setCurrentCardDistance] = useState(cardDistance);
  const [currentVerticalDistance, setCurrentVerticalDistance] =
    useState(verticalDistance);

  // Helper function to calculate responsive values
  const calculateResponsiveValues = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) {
      // Small mobile
      setCurrentWidth(width * 0.6);
      setCurrentHeight(height * 0.6);
      setCurrentCardDistance(cardDistance * 0.6);
      setCurrentVerticalDistance(verticalDistance * 0.6);
    } else if (screenWidth < 768) {
      // Medium mobile/tablet
      setCurrentWidth(width * 0.8);
      setCurrentHeight(height * 0.8);
      setCurrentCardDistance(cardDistance * 0.8);
      setCurrentVerticalDistance(verticalDistance * 0.8);
    } else {
      // Desktop
      setCurrentWidth(width);
      setCurrentHeight(height);
      setCurrentCardDistance(cardDistance);
      setCurrentVerticalDistance(verticalDistance);
    }
  };

  // Use useLayoutEffect for initial render to prevent flash of unstyled content
  useLayoutEffect(() => {
    calculateResponsiveValues();
  }, []);

  // Use useEffect for subsequent resizes
  useEffect(() => {
    window.addEventListener("resize", calculateResponsiveValues);
    return () => {
      window.removeEventListener("resize", calculateResponsiveValues);
    };
  }, []);

  // Define swap function once at this scope
  const swap = () => {
    if (order.current.length < 2) return;

    const [front, ...rest] = order.current;
    const elFront = refs[front].current;
    const tl = gsap.timeline();
    tlRef.current = tl;

    // Phase 1: Smooth card exit with arc motion
    tl.to(elFront, {
      y: `+=${currentHeight * 2}`, // Move further down relative to card height
      x: `+=${currentWidth * 2}`, // Move further right relative to card width
      rotationZ: -45, // More rotation
      rotationX: 25, // More rotation
      scale: 0.1, // Disappear almost completely
      opacity: 0, // Fully transparent
      duration: config.durDrop + 0.2, // Slightly longer duration for smoother disappearance
      ease: "power2.in",
    });

    // Phase 2: Promote other cards smoothly
    tl.addLabel("promote", `-=${config.durDrop * 0.6}`);
    rest.forEach((idx, i) => {
      const el = refs[idx].current;
      const slot = makeSlot(
        i,
        currentCardDistance,
        currentVerticalDistance,
        refs.length
      );

      tl.set(el, { zIndex: slot.zIndex }, "promote");
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          scale: i === 0 ? 1 : 0.95,
          opacity: 1,
          rotationZ: 0,
          rotationY: 0,
          rotationX: 0,
          duration: config.durMove,
          ease: "power2.out",
        },
        `promote+=${i * 0.06}`
      );
    });

    // Phase 3: Prepare the card for return - now it only sets zIndex and initial hidden state
    const backSlot = makeSlot(
      refs.length - 1,
      currentCardDistance,
      currentVerticalDistance,
      refs.length
    );

    tl.addLabel("prepare", `promote+=${config.durMove * 0.5}`);

    // Set up the returning card\'s properties and hide it at the target position
    tl.call(
      () => {
        gsap.set(elFront, { zIndex: backSlot.zIndex });
      },
      undefined,
      "prepare"
    );

    // Set the returning card to its final position but hidden, before the animation starts
    tl.set(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        rotationZ: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 0.1, // Start very small
        opacity: 0, // Start fully transparent
      },
      "prepare+=0.01"
    ); // A tiny delay to ensure zIndex is set first

    // Phase 4: Smooth return animation with natural arc
    tl.addLabel("return", "prepare+=0.1");

    tl.to(
      elFront,
      {
        scale: 0.95, // Return to normal scale
        opacity: 1, // Fade back in
        duration: config.durReturn,
        ease: "power2.out",
      },
      "return"
    );

    // Final adjustment to ensure proper positioning (no change needed here for this effect)
    tl.to(
      elFront,
      {
        scale: 0.95,
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
      },
      "return+=0.6"
    );

    tl.call(() => {
      order.current = [...rest, front];
    });
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const total = refs.length;

      // Initial placement with proper opacity
      refs.forEach((r, i) => {
        const slot = makeSlot(
          i,
          currentCardDistance,
          currentVerticalDistance,
          total
        );
        placeNow(r.current, slot, skewAmount);
        // Ensure top card is fully visible
        if (i === 0) {
          gsap.set(r.current, { opacity: 1, scale: 1 });
        }
      });

      if (childArr.length > 1) {
        // Start animation after a brief delay
        gsap.delayedCall(1, swap);
        intervalRef.current = window.setInterval(swap, delay);
      }
    }, container);

    // Enhanced hover controls
    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
        // Subtle scale on hover
        gsap.to(node, { scale: 1.02, duration: 0.3, ease: "power2.out" });
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
        gsap.to(node, { scale: 1, duration: 0.3, ease: "power2.out" });
      };

      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);

      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
        ctx.revert();
      };
    }

    return () => {
      clearInterval(intervalRef.current);
      ctx.revert();
    };
  }, [
    currentCardDistance,
    currentVerticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    childArr.length,
    refs,
    order,
    config.durDrop,
    config.durMove,
    config.durReturn,
    config.ease,
    swap,
    currentWidth, // Added currentWidth to dependencies
    currentHeight, // Added currentHeight to dependencies
  ]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: {
            width: currentWidth,
            height: currentHeight,
            opacity: 1,
            ...(child.props.style ?? {}),
          },
          onClick: (e) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          },
        })
      : child
  );

  return (
    <motion.div
      ref={container}
      className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[1400px] overflow-visible
      max-[768px]:translate-x-[15%] max-[768px]:translate-y-[20%] max-[768px]:scale-[0.85]
      max-[480px]:translate-x-[20%] max-[480px]:translate-y-[20%] max-[480px]:scale-[0.7]"
      style={{ width: currentWidth, height: currentHeight }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      }}
    >
      <AnimatePresence mode="wait">{rendered}</AnimatePresence>
    </motion.div>
  );
};

export default CardSwap;
