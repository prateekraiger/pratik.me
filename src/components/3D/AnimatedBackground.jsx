import React, { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Custom shader material for animated background
const AnimatedBackgroundMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(),
    uMouse: new THREE.Vector2(),
    uColorA: new THREE.Color("#915EFF"),
    uColorB: new THREE.Color("#00ffff"),
    uColorC: new THREE.Color("#ff00ff"),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;

    varying vec2 vUv;
    varying vec3 vPosition;

    // Noise function
    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    // Smooth noise
    float smoothNoise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    // Fractal noise
    float fractalNoise(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 0.0;

      for (int i = 0; i < 4; i++) {
        value += amplitude * smoothNoise(st);
        st *= 2.0;
        amplitude *= 0.5;
      }

      return value;
    }

    void main() {
      vec2 st = vUv;

      // Create flowing patterns
      vec2 flow = vec2(
        sin(st.x * 3.0 + uTime * 0.5) * 0.1,
        cos(st.y * 2.0 + uTime * 0.3) * 0.1
      );

      st += flow;

      // Generate noise patterns
      float noise1 = fractalNoise(st * 2.0 + uTime * 0.1);
      float noise2 = fractalNoise(st * 3.0 - uTime * 0.15);
      float noise3 = fractalNoise(st * 1.5 + uTime * 0.08);

      // Create color mixing based on noise
      vec3 color = mix(uColorA, uColorB, noise1);
      color = mix(color, uColorC, noise2 * 0.7);

      // Add energy waves
      float wave1 = sin(st.x * 10.0 + uTime * 2.0) * 0.5 + 0.5;
      float wave2 = cos(st.y * 8.0 + uTime * 1.5) * 0.5 + 0.5;
      float waves = wave1 * wave2 * 0.3;

      color += waves * uColorB;

      // Add mouse interaction
      float mouseInfluence = 1.0 - distance(st, uMouse) * 2.0;
      mouseInfluence = max(0.0, mouseInfluence);
      color += mouseInfluence * uColorC * 0.5;

      // Create depth effect
      float depth = noise3 * 0.3 + 0.7;
      color *= depth;

      // Add glow effect
      float glow = smoothstep(0.0, 1.0, noise1 + noise2) * 0.2;
      color += glow;

      // Final alpha for transparency
      float alpha = (noise1 + noise2 + noise3) * 0.3 + 0.1;
      alpha = clamp(alpha, 0.1, 0.4);

      gl_FragColor = vec4(color, alpha);
    }
  `
);

extend({ AnimatedBackgroundMaterial });

const AnimatedBackground = () => {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uMouse.set(
        state.mouse.x * 0.5 + 0.5,
        state.mouse.y * 0.5 + 0.5
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -30]} scale={[100, 100, 1]}>
      <planeGeometry args={[1, 1]} />
      <animatedBackgroundMaterial
        ref={materialRef}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export default AnimatedBackground;
