import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useThreeD } from "../../contexts/ThreeDContext";
import EnhancedParticles from "./EnhancedParticles";
import HolographicUI from "./HolographicUI";
import NeuralNetwork from "./NeuralNetwork";
import AnimatedBackground from "./AnimatedBackground";

const ThreeDScene = () => {
  const { is3DEnabled, currentPage } = useThreeD();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (is3DEnabled) {
      // Simulate loading time for 3D assets
      const timer = setTimeout(() => setIsLoaded(true), 500);
      return () => clearTimeout(timer);
    }
  }, [is3DEnabled]);

  if (!is3DEnabled) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#915EFF" />
        <pointLight position={[0, 0, 10]} intensity={0.8} color="#915EFF" />
        <pointLight position={[-10, 5, 5]} intensity={0.6} color="#00ffff" />
        <pointLight position={[10, -5, 5]} intensity={0.6} color="#ff00ff" />

        {/* Enhanced Particle Systems */}
        <Suspense fallback={null}>
          <EnhancedParticles count={800} />
        </Suspense>

        {/* Holographic UI Elements */}
        <Suspense fallback={null}>
          <HolographicUI />
        </Suspense>

        {/* Page-specific content */}
        {currentPage === "home" && <HomeScene />}
        {currentPage === "about" && <AboutScene />}
        {currentPage === "projects" && <ProjectsScene />}
        {currentPage === "contact" && <ContactScene />}

        {/* Camera controls with mouse interaction */}
        <CameraController />
      </Canvas>
    </motion.div>
  );
};

// Camera controller for mouse interaction
const CameraController = () => {
  useFrame((state) => {
    const mouse = state.mouse;
    state.camera.position.x += (mouse.x * 3 - state.camera.position.x) * 0.02;
    state.camera.position.y += (-mouse.y * 3 - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
};

// Home scene components
const HomeScene = () => {
  return (
    <group>
      {/* Animated shader background */}
      <Suspense fallback={null}>
        <AnimatedBackground />
      </Suspense>

      {/* Neural network visualization */}
      <Suspense fallback={null}>
        <NeuralNetwork />
      </Suspense>

      {/* Other 3D elements */}
      <HolographicTunnel />
      <FloatingTechElements />
      <EnergyOrbs />
      <DigitalRain />
      <RotatingRings />
    </group>
  );
};

const HolographicTunnel = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((ring, i) => {
        ring.rotation.z += 0.02 + i * 0.001;
        ring.position.z += 0.1;
        if (ring.position.z > 20) {
          ring.position.z = -60;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 20 }, (_, i) => (
        <mesh key={i} position={[0, 0, -i * 3 - 10]}>
          <ringGeometry args={[2 + i * 0.5, 2.5 + i * 0.5, 32]} />
          <meshBasicMaterial
            color={new THREE.Color().setHSL(0.7 + i * 0.02, 0.8, 0.5)}
            transparent
            opacity={0.3 - i * 0.01}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

const FloatingTechElements = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((mesh, i) => {
        mesh.rotation.x += (Math.random() - 0.5) * 0.02;
        mesh.rotation.y += (Math.random() - 0.5) * 0.02;
        mesh.rotation.z += (Math.random() - 0.5) * 0.02;
        mesh.position.y += Math.sin(time + i * 0.5) * 0.01;
      });
    }
  });

  const elements = [
    { geometry: [2, 0.1, 1], color: "#00ffff", type: "box" },
    { geometry: [1.5, 1], color: "#ff00ff", type: "plane" },
    { geometry: [0.5, 0.5, 2, 8], color: "#ffff00", type: "cylinder" },
  ];

  return (
    <group ref={groupRef}>
      {Array.from({ length: 12 }, (_, i) => {
        const element = elements[i % elements.length];
        const position = [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
        ];

        return (
          <mesh key={i} position={position}>
            {element.type === "box" && <boxGeometry args={element.geometry} />}
            {element.type === "plane" && (
              <planeGeometry args={element.geometry} />
            )}
            {element.type === "cylinder" && (
              <cylinderGeometry args={element.geometry} />
            )}
            <meshPhongMaterial
              color={element.color}
              transparent
              opacity={0.6}
              emissive={element.color}
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const EnergyOrbs = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((orb, i) => {
        const pulse = Math.sin(time * (0.02 + Math.random() * 0.03)) * 0.3 + 1;
        orb.scale.setScalar(pulse);
        orb.rotation.y += 0.02;
        orb.position.y += Math.sin(time * 0.5 + i) * 0.005;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 6 }, (_, i) => {
        const position = [
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 12,
        ];
        const hue = Math.random();

        return (
          <mesh key={i} position={position}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshPhongMaterial
              color={new THREE.Color().setHSL(hue, 0.8, 0.6)}
              transparent
              opacity={0.7}
              emissive={new THREE.Color().setHSL(hue, 0.8, 0.3)}
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const DigitalRain = () => {
  const pointsRef = useRef();

  useFrame(() => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.2;
        if (positions[i] < -20) {
          positions[i] = 30;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const rainCount = 200;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = Math.random() * 30 + 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.2} transparent opacity={0.8} color="#00ff00" />
    </points>
  );
};

const RotatingRings = () => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((ring, i) => {
        ring.rotation.z += 0.005 + i * 0.002;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 3 }, (_, i) => (
        <mesh
          key={i}
          position={[0, (i - 1) * 4, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[8 + i * 3, 0.2, 16, 100]} />
          <meshPhongMaterial
            color={new THREE.Color().setHSL(0.6 + i * 0.1, 0.8, 0.5)}
            transparent
            opacity={0.4}
            emissive={new THREE.Color().setHSL(0.6 + i * 0.1, 0.8, 0.2)}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

// Placeholder scenes for other pages
const AboutScene = () => (
  <group>
    {Array.from({ length: 5 }, (_, i) => (
      <mesh
        key={i}
        position={[
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8,
        ]}
      >
        <boxGeometry args={[1.5, 2, 0.3]} />
        <meshPhongMaterial color="#915EFF" />
      </mesh>
    ))}
  </group>
);

const ProjectsScene = () => (
  <group>
    {Array.from({ length: 6 }, (_, i) => (
      <mesh
        key={i}
        position={[
          (Math.random() - 0.5) * 18,
          i * 2 - 5,
          (Math.random() - 0.5) * 6,
        ]}
      >
        <boxGeometry args={[3, 0.1, 2]} />
        <meshPhongMaterial color="#00ff88" transparent opacity={0.7} />
      </mesh>
    ))}
  </group>
);

const ContactScene = () => (
  <group>
    {Array.from({ length: 4 }, (_, i) => (
      <mesh
        key={i}
        position={[
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
        ]}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial color="#ff6b6b" transparent opacity={0.8} />
      </mesh>
    ))}
  </group>
);

export default ThreeDScene;
