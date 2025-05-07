import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
} from "@react-three/drei";

// Your 3D Model component that will load your existing 3D file
const LaptopModel = ({ mousePosition }) => {
  const { scene } = useGLTF("/public/desktop_pc/scene.gltf");

  // Apply mouse movement to model rotation
  useEffect(() => {
    if (scene) {
      scene.rotation.y = mousePosition.x * 0.2;
      scene.rotation.x = mousePosition.y * 0.1;
    }
  }, [mousePosition, scene]);

  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
};

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Track mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track scroll position for animation effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-violet-900">
      {/* Background particles effect */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4}px`,
              height: `${Math.random() * 4}px`,
              opacity: Math.random() * 0.7,
              animation: `twinkle ${2 + Math.random() * 8}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-4 min-h-screen flex flex-col md:flex-row items-center justify-center relative z-10">
        {/* Text section */}
        <div
          className="w-full md:w-1/2 text-white space-y-6 pt-20 md:pt-0"
          style={{
            transform: `translateY(${-scrollY * 0.1}px)`,
          }}
        >
          <h1
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400"
            style={{
              transform: `translateX(${mousePosition.x * -20}px)`,
            }}
          >
            Creative Developer
          </h1>
          <p
            className="text-xl md:text-2xl max-w-lg font-light"
            style={{
              transform: `translateX(${mousePosition.x * -10}px)`,
            }}
          >
            Turning ideas into interactive digital experiences with code,
            creativity, and innovation.
          </p>
          <div className="flex space-x-4 mt-8">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition duration-300 transform hover:scale-105">
              View Projects
            </button>
            <button className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-medium transition duration-300 transform hover:scale-105 hover:bg-white hover:text-blue-900">
              Contact Me
            </button>
          </div>
        </div>

        {/* 3D model section */}
        <div
          className="w-full md:w-1/2 h-96 flex justify-center items-center py-10 md:py-0"
          style={{
            transform: `translateY(${-scrollY * 0.05}px) translateX(${
              mousePosition.x * 30
            }px)`,
          }}
        >
          <div className="relative w-full h-full max-w-md">
            {/* Glow effect behind the model */}
            <div className="absolute inset-0 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

            {/* 3D Canvas using react-three-fiber */}
            <Canvas
              camera={{ position: [0, 0, 8], fov: 50 }}
              style={{ width: "100%", height: "100%" }}
              className="z-10 relative"
            >
              <ambientLight intensity={0.5} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
                castShadow
              />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />

              <Suspense fallback={null}>
                <LaptopModel mousePosition={mousePosition} />
                <Environment preset="city" />
                <ContactShadows
                  position={[0, -1.5, 0]}
                  opacity={0.4}
                  scale={10}
                  blur={1.5}
                  far={4}
                />
              </Suspense>

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0% {
            opacity: 0.1;
          }
          100% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
