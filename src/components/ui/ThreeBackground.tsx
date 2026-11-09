'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  className?: string;
  bubbleCount?: number;
  interactive?: boolean;
}

export default function ThreeBackground({
  className = 'absolute inset-0 pointer-events-none overflow-hidden z-0',
  bubbleCount = 30,
  interactive = true,
}: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting for soap bubble iridescence & highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x6ec5b8, 2.5); // Mint primary
    dirLight1.position.set(15, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2.0); // Sky blue
    dirLight2.position.set(-15, -10, 10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xa78bfa, 2.0, 50); // Soft violet sheen
    pointLight.position.set(0, 0, 15);
    scene.add(pointLight);

    // Bubble definitions
    interface BubbleData {
      mesh: THREE.Mesh;
      baseSpeedY: number;
      wobbleSpeed: number;
      wobbleAmplitude: number;
      wobbleOffset: number;
      radius: number;
      initialX: number;
      initialZ: number;
    }

    const bubbles: BubbleData[] = [];
    const sharedSphereGeo = new THREE.SphereGeometry(1, 32, 32);

    // Shimmering bubble materials with soft translucency
    const bubblePalettes = [
      { color: 0x6ec5b8, emissive: 0x1e3a35, roughness: 0.1, metalness: 0.15, opacity: 0.45 },
      { color: 0x38bdf8, emissive: 0x0f2b3e, roughness: 0.12, metalness: 0.2, opacity: 0.4 },
      { color: 0xa78bfa, emissive: 0x241738, roughness: 0.08, metalness: 0.18, opacity: 0.35 },
      { color: 0xffffff, emissive: 0x223344, roughness: 0.05, metalness: 0.3, opacity: 0.5 },
    ];

    const materials = bubblePalettes.map(
      (p) =>
        new THREE.MeshPhysicalMaterial({
          color: p.color,
          emissive: p.emissive,
          roughness: p.roughness,
          metalness: p.metalness,
          transmission: 0.85,
          thickness: 0.4,
          ior: 1.15,
          transparent: true,
          opacity: p.opacity,
          reflectivity: 0.9,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
        })
    );

    // Outer spawn bounds
    const xRange = 28;
    const yBottom = -16;
    const yTop = 18;

    for (let i = 0; i < bubbleCount; i++) {
      const radius = 0.35 + Math.random() * 1.1;
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(sharedSphereGeo, mat);

      const x = (Math.random() - 0.5) * xRange;
      const y = yBottom + Math.random() * (yTop - yBottom);
      const z = -6 + Math.random() * 10;

      mesh.position.set(x, y, z);
      mesh.scale.set(radius, radius, radius);

      scene.add(mesh);

      bubbles.push({
        mesh,
        baseSpeedY: 0.015 + Math.random() * 0.025,
        wobbleSpeed: 0.8 + Math.random() * 1.5,
        wobbleAmplitude: 0.15 + Math.random() * 0.3,
        wobbleOffset: Math.random() * Math.PI * 2,
        radius,
        initialX: x,
        initialZ: z,
      });
    }

    // Sparkle / clean water mist particles
    const sparkleCount = 45;
    const sparkleGeo = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount * 3; i += 3) {
      sparklePositions[i] = (Math.random() - 0.5) * 32;
      sparklePositions[i + 1] = (Math.random() - 0.5) * 24;
      sparklePositions[i + 2] = -4 + Math.random() * 12;
    }
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));

    const sparkleMat = new THREE.PointsMaterial({
      color: 0x6ec5b8,
      size: 0.18,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
    scene.add(sparkles);

    // Mouse interactive tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.targetX = normX * 4;
      mouse.targetY = normY * 3;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle container resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Parallax camera sway
      camera.position.x = mouse.x * 0.5;
      camera.position.y = mouse.y * 0.4;
      camera.lookAt(0, 0, 0);

      // Animate bubbles floating upwards & swaying
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.mesh.position.y += b.baseSpeedY;

        // Harmonic horizontal wobble
        const wobble = Math.sin(elapsedTime * b.wobbleSpeed + b.wobbleOffset) * b.wobbleAmplitude;
        b.mesh.position.x = b.initialX + wobble + (mouse.x * (b.radius * 0.3));

        // Subtle breathing scale
        const scaleSqueeze = 1 + Math.sin(elapsedTime * 2 + b.wobbleOffset) * 0.04;
        b.mesh.scale.set(
          b.radius * scaleSqueeze,
          b.radius * (2 - scaleSqueeze),
          b.radius * scaleSqueeze
        );

        // Slow rotation for light gleam
        b.mesh.rotation.y += 0.005;
        b.mesh.rotation.x += 0.003;

        // Loop back to bottom when reaching the top
        if (b.mesh.position.y > yTop) {
          b.mesh.position.y = yBottom - Math.random() * 2;
          b.initialX = (Math.random() - 0.5) * xRange;
          b.mesh.position.x = b.initialX;
        }
      }

      // Sparkles slow drift & glimmer
      sparkles.rotation.y = elapsedTime * 0.02;
      sparkles.rotation.x = Math.sin(elapsedTime * 0.015) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();

      // Dispose Three.js objects
      sharedSphereGeo.dispose();
      sparkleGeo.dispose();
      sparkleMat.dispose();
      materials.forEach((m) => m.dispose());

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [bubbleCount, interactive]);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
