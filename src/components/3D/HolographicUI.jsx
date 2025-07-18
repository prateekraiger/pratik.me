import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const HolographicPanel = ({ position, rotation, text, color = "#00ffff" }) => {
  const panelRef = useRef();
  const textRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (panelRef.current) {
      panelRef.current.material.opacity = Math.sin(time * 2) * 0.1 + 0.3;
      panelRef.current.rotation.y += 0.005;
    }

    if (textRef.current) {
      textRef.current.position.y = Math.sin(time * 3) * 0.05;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <RoundedBox ref={panelRef} args={[4, 2, 0.1]} radius={0.1} smoothness={4}>
        <meshPhongMaterial
          color={color}
          transparent
          opacity={0.3}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </RoundedBox>

      <Text
        ref={textRef}
        position={[0, 0, 0.1]}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>

      {/* Glowing border effect */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(4.1, 2.1, 0.1)]} />
        <lineBasicMaterial color={color} transparent opacity={0.8} />
      </lineSegments>
    </group>
  );
};

const FloatingOrb = ({ position, color = "#ff00ff" }) => {
  const orbRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (orbRef.current) {
      orbRef.current.rotation.x += 0.01;
      orbRef.current.rotation.y += 0.02;
      orbRef.current.position.y = position[1] + Math.sin(time * 2) * 0.5;

      const scale = Math.sin(time * 3) * 0.2 + 1;
      orbRef.current.scale.setScalar(scale);
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(Math.sin(time * 4) * 0.3 + 1.5);
    }
  });

  return (
    <group position={position}>
      {/* Main orb */}
      <mesh ref={orbRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshPhongMaterial
          color={color}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>

      {/* Point light */}
      <pointLight color={color} intensity={2} distance={20} decay={2} />
    </group>
  );
};

const DataStream = ({ start, end, color = "#00ff00" }) => {
  const streamRef = useRef();
  const particlesRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        // Move particles along the stream
        const progress = (time * 2 + i * 0.1) % 1;
        positions[i] = start[0] + (end[0] - start[0]) * progress;
        positions[i + 1] = start[1] + (end[1] - start[1]) * progress;
        positions[i + 2] = start[2] + (end[2] - start[2]) * progress;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const streamParticles = React.useMemo(() => {
    const count = 20;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const progress = i / count;
      positions[i * 3] = start[0] + (end[0] - start[0]) * progress;
      positions[i * 3 + 1] = start[1] + (end[1] - start[1]) * progress;
      positions[i * 3 + 2] = start[2] + (end[2] - start[2]) * progress;
    }

    return positions;
  }, [start, end]);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={streamParticles.length / 3}
          array={streamParticles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.2}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const HolographicUI = () => {
  return (
    <group>
      {/* Floating panels */}
      <HolographicPanel
        position={[-15, 5, -10]}
        rotation={[0, 0.3, 0]}
        text="SYSTEM ONLINE"
        color="#00ffff"
      />

      <HolographicPanel
        position={[15, -3, -8]}
        rotation={[0, -0.4, 0]}
        text="NEURAL NETWORK"
        color="#ff00ff"
      />

      <HolographicPanel
        position={[0, 8, -15]}
        rotation={[0.2, 0, 0]}
        text="QUANTUM CORE"
        color="#ffff00"
      />

      {/* Floating orbs */}
      <FloatingOrb position={[-10, 0, 5]} color="#915EFF" />
      <FloatingOrb position={[12, 6, -5]} color="#00ffff" />
      <FloatingOrb position={[0, -8, 8]} color="#ff00ff" />

      {/* Data streams connecting orbs */}
      <DataStream start={[-10, 0, 5]} end={[12, 6, -5]} color="#00ff00" />

      <DataStream start={[12, 6, -5]} end={[0, -8, 8]} color="#ff6600" />

      <DataStream start={[0, -8, 8]} end={[-10, 0, 5]} color="#6600ff" />
    </group>
  );
};

export default HolographicUI;
