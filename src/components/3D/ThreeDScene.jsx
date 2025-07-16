import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useThreeD } from "../../contexts/ThreeDContext";

const ThreeDScene = () => {
  const { is3DEnabled, currentPage } = useThreeD();
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const objectsRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!is3DEnabled || !mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create 3D objects based on page
    createPageObjects(scene, currentPage);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x915eff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x915eff, 0.8, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    camera.position.z = 15;

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Animate objects
      objectsRef.current.forEach((obj, index) => {
        if (obj.userData.type === "floating") {
          obj.rotation.x += 0.01;
          obj.rotation.y += 0.01;
          obj.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        }

        if (obj.userData.type === "interactive") {
          obj.rotation.x = mouse.y * 0.2;
          obj.rotation.y = mouse.x * 0.2;
        }
      });

      // Camera movement based on mouse
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [is3DEnabled, currentPage]);

  const createPageObjects = (scene, page) => {
    objectsRef.current = [];

    switch (page) {
      case "home":
        createHomeObjects(scene);
        break;
      case "about":
        createAboutObjects(scene);
        break;
      case "projects":
        createProjectObjects(scene);
        break;
      case "contact":
        createContactObjects(scene);
        break;
      default:
        createDefaultObjects(scene);
    }
  };

  const createHomeObjects = (scene) => {
    // Floating geometric shapes
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.8, 32, 32),
      new THREE.ConeGeometry(0.8, 1.5, 8),
      new THREE.TorusGeometry(0.8, 0.3, 16, 100),
      new THREE.OctahedronGeometry(1),
    ];

    const materials = [
      new THREE.MeshPhongMaterial({
        color: 0x915eff,
        transparent: true,
        opacity: 0.8,
        wireframe: false,
      }),
      new THREE.MeshPhongMaterial({
        color: 0x7c3aed,
        transparent: true,
        opacity: 0.7,
        wireframe: true,
      }),
      new THREE.MeshPhongMaterial({
        color: 0x4f46e5,
        transparent: true,
        opacity: 0.6,
      }),
    ];

    // Create floating objects
    for (let i = 0; i < 8; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      );

      mesh.userData.type = "floating";
      scene.add(mesh);
      objectsRef.current.push(mesh);
    }

    // Central interactive object
    const centralGeometry = new THREE.IcosahedronGeometry(2, 1);
    const centralMaterial = new THREE.MeshPhongMaterial({
      color: 0x915eff,
      transparent: true,
      opacity: 0.9,
      wireframe: false,
    });
    const centralMesh = new THREE.Mesh(centralGeometry, centralMaterial);
    centralMesh.position.set(8, 0, 0);
    centralMesh.userData.type = "interactive";
    scene.add(centralMesh);
    objectsRef.current.push(centralMesh);

    // Particle system
    createParticleSystem(scene);
  };

  const createAboutObjects = (scene) => {
    // Create book-like objects and educational symbols
    const bookGeometry = new THREE.BoxGeometry(1.5, 2, 0.3);
    const bookMaterial = new THREE.MeshPhongMaterial({ color: 0x915eff });

    for (let i = 0; i < 5; i++) {
      const book = new THREE.Mesh(bookGeometry, bookMaterial);
      book.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      );
      book.userData.type = "floating";
      scene.add(book);
      objectsRef.current.push(book);
    }
  };

  const createProjectObjects = (scene) => {
    // Create code-like structures and tech objects
    const codeGeometry = new THREE.BoxGeometry(3, 0.1, 2);
    const codeMaterial = new THREE.MeshPhongMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.7,
    });

    for (let i = 0; i < 6; i++) {
      const codeBlock = new THREE.Mesh(codeGeometry, codeMaterial);
      codeBlock.position.set(
        (Math.random() - 0.5) * 18,
        i * 2 - 5,
        (Math.random() - 0.5) * 6
      );
      codeBlock.userData.type = "floating";
      scene.add(codeBlock);
      objectsRef.current.push(codeBlock);
    }
  };

  const createContactObjects = (scene) => {
    // Create communication-themed objects
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xff6b6b,
      transparent: true,
      opacity: 0.8,
    });

    for (let i = 0; i < 4; i++) {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6
      );
      sphere.userData.type = "floating";
      scene.add(sphere);
      objectsRef.current.push(sphere);
    }
  };

  const createDefaultObjects = (scene) => {
    // Default minimal objects
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0x915eff });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.userData.type = "floating";
    scene.add(sphere);
    objectsRef.current.push(sphere);
  };

  const createParticleSystem = (scene) => {
    const particleCount = 100;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x915eff,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    objectsRef.current.push(particleSystem);
  };

  if (!is3DEnabled) return null;

  return (
    <motion.div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
      style={{
        background: "transparent",
      }}
    />
  );
};

export default ThreeDScene;
