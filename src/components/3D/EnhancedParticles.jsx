import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const EnhancedParticles = ({ count = 1000 }) => {
  const mesh = useRef();
  const light = useRef();

  // Create particle positions and attributes
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Position
      temp[i * 3] = (Math.random() - 0.5) * 100;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 100;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 100;

      // Colors - create a beautiful gradient
      const hue = Math.random() * 0.3 + 0.6; // Blue to purple range
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Sizes
      sizes[i] = Math.random() * 2 + 0.5;
    }

    return { positions: temp, colors, sizes };
  }, [count]);

  // Animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (mesh.current) {
      // Rotate the entire particle system
      mesh.current.rotation.x = time * 0.1;
      mesh.current.rotation.y = time * 0.05;

      // Animate individual particles
      const positions = mesh.current.geometry.attributes.position.array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // Create wave motion
        positions[i3 + 1] += Math.sin(time + positions[i3] * 0.01) * 0.01;

        // Boundary check
        if (positions[i3 + 1] > 50) positions[i3 + 1] = -50;
        if (positions[i3 + 1] < -50) positions[i3 + 1] = 50;
      }

      mesh.current.geometry.attributes.position.needsUpdate = true;
    }

    // Animate the light
    if (light.current) {
      light.current.position.x = Math.sin(time * 0.5) * 30;
      light.current.position.z = Math.cos(time * 0.5) * 30;
      light.current.intensity = Math.sin(time * 2) * 0.5 + 1;
    }
  });

  return (
    <group>
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.colors.length / 3}
            array={particles.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particles.sizes.length}
            array={particles.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.5}
          transparent
          opacity={0.8}
          vertexColors
          blending={THREE.AdditiveBlending}
          sizeAttenuation={true}
        />
      </points>

      {/* Dynamic lighting */}
      <pointLight
        ref={light}
        color="#915EFF"
        intensity={1}
        distance={100}
        decay={2}
      />
    </group>
  );
};

export default EnhancedParticles;
