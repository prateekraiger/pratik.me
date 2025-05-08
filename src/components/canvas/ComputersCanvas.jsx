import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  Environment,
  ContactShadows,
} from "@react-three/drei";

import CanvasLoader from "./Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      {/* Ambient light for overall scene illumination */}
      <ambientLight intensity={0.3} />

      {/* Hemisphere light for natural outdoor-like lighting */}
      <hemisphereLight intensity={0.5} groundColor="black" color="#915EFF" />

      {/* Main spotlight for dramatic lighting */}
      <spotLight
        position={[-20, 50, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={2048}
        color="#915EFF"
      />

      {/* Additional point lights for better model definition */}
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#915EFF" />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#915EFF" />

      {/* Contact shadows for better grounding */}
      <ContactShadows
        position={[0, -4, 0]}
        opacity={0.3}
        scale={10}
        blur={2.5}
        far={4}
      />

      {/* The 3D model */}
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.5 : 0.65}
        position={isMobile ? [0, -1, -1.5] : [0, -1.5, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{
        position: isMobile ? [12, 1.5, 2.5] : [15, 2, 3],
        fov: isMobile ? 35 : 30,
      }}
      gl={{
        preserveDrawingBuffer: true,
        antialias: true,
        toneMappingExposure: 1.2,
        outputEncoding: 3001, // sRGBEncoding
      }}
      className="w-full h-full"
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <Computers isMobile={isMobile} />
        <Environment preset="city" />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
