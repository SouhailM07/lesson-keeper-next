"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const SnowfallBackground = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const windAudio = new Audio("/windSound.m4a");
    windAudio.volume = 0.2;
    windAudio.loop = true;

    // Attempt to play the audio with a workaround
    const playAudio = () => {
      windAudio.play().catch((err) => console.warn("Autoplay blocked:", err));
    };

    // Try playing the audio when the user interacts with the page
    const handleUserInteraction = () => {
      playAudio();
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    // Play audio if possible without interaction
    playAudio();

    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Snowflakes setup
    const snowGeometry = new THREE.BufferGeometry();
    const snowCount = 1000;
    const positions = new Float32Array(snowCount * 3);
    const velocities = new Float32Array(snowCount);

    for (let i = 0; i < snowCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 30 + 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      velocities[i] = Math.random() * 0.02 + 0.01;
    }

    snowGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const snowTexture = new THREE.TextureLoader().load(
      "https://threejs.org/examples/textures/sprites/circle.png"
    );

    const snowMaterial = new THREE.PointsMaterial({
      map: snowTexture,
      color: 0xffffff,
      size: 0.2,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const snowParticles = new THREE.Points(snowGeometry, snowMaterial);
    scene.add(snowParticles);

    // Snow animation
    const animateSnow = () => {
      const positions = snowGeometry.attributes.position.array;
      for (let i = 0; i < snowCount; i++) {
        positions[i * 3 + 1] -= velocities[i];
        if (positions[i * 3 + 1] < -5) {
          positions[i * 3] = (Math.random() - 0.5) * 50;
          positions[i * 3 + 1] = Math.random() * 30 + 20;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
      }
      snowGeometry.attributes.position.needsUpdate = true;
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      animateSnow();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  return (
    <div
      className="overflow-hidden absolute inset-0 w-full h-full z-[-1]"
      ref={mountRef}
    ></div>
  );
};

export default SnowfallBackground;
