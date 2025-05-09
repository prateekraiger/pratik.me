import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  Environment,
  ContactShadows,
} from "@react-three/drei";

import CanvasLoader from "./Loader";

// Preload the model to avoid jank when it first appears
useGLTF.preload("./desktop_pc/scene.gltf");

const Computers = ({ isMobile }) => {
  // Use draco compression if your model supports it
  const computer = useGLTF("./desktop_pc/scene.gltf");

  // Optimize the scene when it loads
  useEffect(() => {
    if (computer.scene) {
      // Reduce shadow quality for better performance
      computer.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false;
          child.receiveShadow = false;

          // Simplify materials for better performance
          if (child.material) {
            child.material.envMapIntensity = 0.5;
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [computer.scene]);

  return (
    <mesh>
      {/* Reduced lighting for better performance */}
      <ambientLight intensity={0.2} />
      <hemisphereLight intensity={0.3} groundColor="black" color="#915EFF" />

      {/* Simplified spotlight with no shadows */}
      <spotLight
        position={[-20, 50, 10]}
        angle={0.15}
        penumbra={1}
        intensity={0.8}
        castShadow={false}
        color="#915EFF"
      />

      {/* Simplified shadows with lower resolution */}
      <ContactShadows
        position={[0, -4, 0]}
        opacity={0.2}
        scale={10}
        blur={2}
        far={4}
        resolution={128}
      />

      {/* The 3D model with optimized settings */}
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.35 : 0.6}
        position={isMobile ? [0, -1.5, -1.5] : [0, -1.5, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      frameloop="demand" // Only render when needed
      shadows={false} // Disable shadows for performance
      dpr={[1, 1.2]} // Reduced pixel ratio for better performance
      camera={{
        position: isMobile ? [10, 1.5, 2.5] : [15, 2, 3], // Different camera position for mobile
        fov: isMobile ? 35 : 25, // Wider FOV on mobile for better visibility
        near: 0.1,
        far: 100,
      }}
      gl={{
        preserveDrawingBuffer: true,
        antialias: false, // Disable antialiasing for performance
        powerPreference: "high-performance",
        alpha: true, // Enable alpha for transparent background
        depth: true,
        stencil: false, // Disable stencil for performance
        failIfMajorPerformanceCaveat: true, // Added to fail gracefully on low-end devices
      }}
      performance={{ min: 0.3 }} // Allow ThreeJS to reduce quality for performance
      className="w-full h-full"
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={isMobile ? 0.2 : 0.3} // Slower rotation on mobile
          enableDamping={false} // Disable damping for performance
        />
        <Computers isMobile={isMobile} />
        <Environment preset="city" />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
