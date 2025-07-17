import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const NeuralNetwork = () => {
  const groupRef = useRef();
  const linesRef = useRef([]);

  // Generate neural network nodes
  const nodes = useMemo(() => {
    const nodeArray = [];
    const layers = 5;
    const nodesPerLayer = [8, 12, 16, 12, 8];

    for (let layer = 0; layer < layers; layer++) {
      const nodeCount = nodesPerLayer[layer];
      const layerNodes = [];

      for (let node = 0; node < nodeCount; node++) {
        const x = (layer - layers / 2) * 8;
        const y = (node - nodeCount / 2) * 2;
        const z = (Math.random() - 0.5) * 4;

        layerNodes.push({
          position: [x, y, z],
          id: `${layer}-${node}`,
          layer,
          connections: [],
          activity: Math.random(),
        });
      }

      nodeArray.push(layerNodes);
    }

    // Create connections between layers
    for (let layer = 0; layer < layers - 1; layer++) {
      const currentLayer = nodeArray[layer];
      const nextLayer = nodeArray[layer + 1];

      currentLayer.forEach((node) => {
        // Connect to 3-5 random nodes in the next layer
        const connectionCount = Math.floor(Math.random() * 3) + 3;
        const shuffledNext = [...nextLayer].sort(() => Math.random() - 0.5);

        for (
          let i = 0;
          i < Math.min(connectionCount, shuffledNext.length);
          i++
        ) {
          node.connections.push(shuffledNext[i]);
        }
      });
    }

    return nodeArray.flat();
  }, []);

  // Generate connection lines
  const connections = useMemo(() => {
    const connectionArray = [];

    nodes.forEach((node) => {
      node.connections.forEach((targetNode) => {
        connectionArray.push({
          start: node.position,
          end: targetNode.position,
          strength: Math.random(),
          id: `${node.id}-${targetNode.id}`,
        });
      });
    });

    return connectionArray;
  }, [nodes]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Animate the entire network
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.2;
      groupRef.current.rotation.x = Math.cos(time * 0.15) * 0.1;

      // Animate individual nodes
      groupRef.current.children.forEach((child, index) => {
        if (child.userData.type === "node") {
          const nodeData = nodes[index];
          if (nodeData) {
            // Pulsing effect based on activity
            const pulse = Math.sin(time * 2 + nodeData.activity * 10) * 0.3 + 1;
            child.scale.setScalar(pulse);

            // Color change based on activity
            const hue = (nodeData.activity + time * 0.1) % 1;
            child.material.color.setHSL(hue * 0.3 + 0.5, 0.8, 0.6);
            child.material.emissive.setHSL(hue * 0.3 + 0.5, 0.8, 0.3);
          }
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -20]}>
      {/* Render nodes */}
      {nodes.map((node, index) => (
        <mesh
          key={node.id}
          position={node.position}
          userData={{ type: "node" }}
        >
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshPhongMaterial
            color={new THREE.Color().setHSL(
              node.activity * 0.3 + 0.5,
              0.8,
              0.6
            )}
            emissive={new THREE.Color().setHSL(
              node.activity * 0.3 + 0.5,
              0.8,
              0.3
            )}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Render connections */}
      {connections.map((connection) => (
        <ConnectionLine
          key={connection.id}
          start={connection.start}
          end={connection.end}
          strength={connection.strength}
        />
      ))}
    </group>
  );
};

const ConnectionLine = ({ start, end, strength }) => {
  const lineRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (lineRef.current) {
      // Animate line opacity based on strength and time
      const opacity =
        (Math.sin(time * 2 + strength * 10) * 0.3 + 0.7) * strength;
      lineRef.current.material.opacity = opacity;

      // Color animation
      const hue = (time * 0.1 + strength) % 1;
      lineRef.current.material.color.setHSL(hue * 0.4 + 0.4, 0.8, 0.5);
    }
  });

  const points = useMemo(
    () => [new THREE.Vector3(...start), new THREE.Vector3(...end)],
    [start, end]
  );

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#00ffff"
        transparent
        opacity={strength}
        blending={THREE.AdditiveBlending}
      />
    </line>
  );
};

export default NeuralNetwork;
