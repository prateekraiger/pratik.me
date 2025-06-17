import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

// Enhanced ProjectCard with better visibility and proper image display
export const ProjectCard = forwardRef(
  ({ title, image, link, customClass, ...rest }, ref) => (
    <a
      ref={ref}
      {...rest}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`absolute top-1/2 left-1/2 rounded-2xl overflow-hidden shadow-2xl [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] cursor-pointer hover:scale-[1.03] transition-transform duration-300 ${
        customClass ?? ""
      } ${rest.className ?? ""}`.trim()}
      style={{
        boxShadow:
          "0 12px 40px 0 rgba(0, 0, 0, 0.4), 0 4px 16px 0 rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        ...rest.style,
      }}
    >
      {/* Card Header - better contrast and visibility */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-md px-4 py-3 flex items-center gap-3 border-b border-white/20">
        <span className="inline-block w-3 h-3 rounded-full bg-emerald-400 shadow-lg animate-pulse"></span>
        <h3 className="text-white font-bold text-lg tracking-wide text-left truncate drop-shadow-lg">
          {title}
        </h3>
      </div>

      {/* Card Content - Full opacity image with better overlay */}
      <div className="relative h-full w-full">
        {/* Background Image - Full opacity and proper sizing */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 transition-all duration-500"
          style={{
            backgroundImage: `url(${image})`,
            filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
          }}
        />

        {/* Subtle overlay for text readability without hiding the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Content overlay area */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <p className="text-sm font-medium opacity-90">Click to explore</p>
          </div>
        </div>
      </div>
    </a>
  )
);
ProjectCard.displayName = "ProjectCard";

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
  // Smoother animation configuration
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

  useEffect(() => {
    let ctx = gsap.context(() => {
      const total = refs.length;

      // Initial placement with proper opacity
      refs.forEach((r, i) => {
        const slot = makeSlot(i, cardDistance, verticalDistance, total);
        placeNow(r.current, slot, skewAmount);
        // Ensure top card is fully visible
        if (i === 0) {
          gsap.set(r.current, { opacity: 1, scale: 1 });
        }
      });

      const swap = () => {
        if (order.current.length < 2) return;

        const [front, ...rest] = order.current;
        const elFront = refs[front].current;
        const tl = gsap.timeline();
        tlRef.current = tl;

        // Phase 1: Smooth card exit with arc motion
        tl.to(elFront, {
          y: "+=500",
          x: "+=300",
          rotationZ: -25,
          rotationX: 15,
          scale: 0.85,
          opacity: 0.6,
          duration: config.durDrop,
          ease: "power2.in",
        });

        // Phase 2: Promote other cards smoothly
        tl.addLabel("promote", `-=${config.durDrop * 0.6}`);
        rest.forEach((idx, i) => {
          const el = refs[idx].current;
          const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);

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

        // Phase 3: Smoothly position card for return (off-screen preparation)
        const backSlot = makeSlot(
          refs.length - 1,
          cardDistance,
          verticalDistance,
          refs.length
        );

        tl.addLabel("prepare", `promote+=${config.durMove * 0.5}`);

        // Set up the returning card's properties
        tl.call(
          () => {
            gsap.set(elFront, { zIndex: backSlot.zIndex });
          },
          undefined,
          "prepare"
        );

        // Position card completely off-screen in a natural arc
        tl.set(
          elFront,
          {
            x: backSlot.x + 400, // Start from right side
            y: backSlot.y + 300, // Start from below
            z: backSlot.z - 200, // Further back
            rotationZ: 35,
            rotationX: -10,
            scale: 0.8,
            opacity: 0.3,
          },
          "prepare"
        );

        // Phase 4: Smooth return animation with natural arc
        tl.addLabel("return", "prepare+=0.1");

        tl.to(
          elFront,
          {
            x: backSlot.x,
            y: backSlot.y,
            z: backSlot.z,
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 0.9,
            opacity: 0.95,
            duration: config.durReturn,
            ease: "power2.out",
          },
          "return"
        );

        // Final adjustment to ensure proper positioning
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
        const swap = () => {
          if (order.current.length < 2) return;
          const [front, ...rest] = order.current;
          const elFront = refs[front].current;
          const tl = gsap.timeline();
          tlRef.current = tl;

          tl.to(elFront, {
            y: "+=600",
            x: "+=200",
            rotationZ: -15,
            rotationY: 10,
            scale: 0.9,
            opacity: 0.8,
            duration: config.durDrop,
            ease: config.ease,
          });

          tl.addLabel("promote", `-=${config.durDrop * 0.7}`);
          rest.forEach((idx, i) => {
            const el = refs[idx].current;
            const slot = makeSlot(
              i,
              cardDistance,
              verticalDistance,
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
                duration: config.durMove,
                ease: config.ease,
              },
              `promote+=${i * 0.08}`
            );
          });

          const backSlot = makeSlot(
            refs.length - 1,
            cardDistance,
            verticalDistance,
            refs.length
          );
          tl.addLabel(
            "return",
            `promote+=${config.durMove * config.returnDelay}`
          );
          tl.call(
            () => {
              gsap.set(elFront, { zIndex: backSlot.zIndex });
            },
            undefined,
            "return"
          );
          tl.set(
            elFront,
            {
              x: backSlot.x,
              z: backSlot.z,
              rotationZ: 0,
              rotationY: 0,
              scale: 0.9,
            },
            "return"
          );
          tl.to(
            elFront,
            {
              y: backSlot.y,
              opacity: 1,
              scale: 0.95,
              duration: config.durReturn,
              ease: config.ease,
            },
            "return"
          );
          tl.call(() => {
            order.current = [...rest, front];
          });
        };
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
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    easing,
    childArr.length,
  ]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: {
            width,
            height,
            opacity: 1, // Ensure full opacity
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
    <div
      ref={container}
      className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[1400px] overflow-visible
      max-[768px]:translate-x-[15%] max-[768px]:translate-y-[20%] max-[768px]:scale-[0.85]
      max-[480px]:translate-x-[20%] max-[480px]:translate-y-[20%] max-[480px]:scale-[0.7]"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
