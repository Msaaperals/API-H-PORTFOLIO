"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  mousePosition: { x: number; y: number };
}

function ParticleField({ count = 200, mousePosition }: ParticleFieldProps) {
  const mesh = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const [positions, velocities, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Nature-inspired green palette
    const colorPalette = [
      new THREE.Color("#4a7c59"), // Forest green
      new THREE.Color("#6b9b7a"), // Sage
      new THREE.Color("#8fbc8f"), // Dark sea green
      new THREE.Color("#2d5a3d"), // Deep forest
      new THREE.Color("#a8d5ba"), // Light mint
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * viewport.width * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
      positions[i3 + 2] = (Math.random() - 0.5) * 5;

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return [positions, velocities, colors];
  }, [count, viewport]);

  useFrame((state) => {
    if (!mesh.current) return;

    const positionAttribute = mesh.current.geometry.attributes.position;
    const posArray = positionAttribute.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Add mouse interaction
      const dx = mousePosition.x * viewport.width - posArray[i3];
      const dy = -mousePosition.y * viewport.height - posArray[i3 + 1];
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 2) {
        const force = (2 - distance) * 0.01;
        posArray[i3] -= dx * force;
        posArray[i3 + 1] -= dy * force;
      }

      // Organic floating motion
      posArray[i3] += velocities[i3] + Math.sin(time * 0.5 + i) * 0.002;
      posArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.3 + i) * 0.002;
      posArray[i3 + 2] += velocities[i3 + 2];

      // Boundary wrapping
      if (posArray[i3] > viewport.width) posArray[i3] = -viewport.width;
      if (posArray[i3] < -viewport.width) posArray[i3] = viewport.width;
      if (posArray[i3 + 1] > viewport.height) posArray[i3 + 1] = -viewport.height;
      if (posArray[i3 + 1] < -viewport.height) posArray[i3 + 1] = viewport.height;
      if (posArray[i3 + 2] > 3) posArray[i3 + 2] = -3;
      if (posArray[i3 + 2] < -3) posArray[i3 + 2] = 3;
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingLeaves({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((leaf, i) => {
      leaf.position.y += Math.sin(time * 0.5 + i) * 0.003;
      leaf.position.x += Math.cos(time * 0.3 + i) * 0.002;
      leaf.rotation.z = Math.sin(time * 0.2 + i) * 0.3;

      // Mouse interaction
      const dx = mousePosition.x * 5 - leaf.position.x;
      const dy = -mousePosition.y * 5 - leaf.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 3) {
        leaf.position.x -= dx * 0.01;
        leaf.position.y -= dy * 0.01;
      }
    });
  });

  const leaves = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 3,
      ] as [number, number, number],
      scale: 0.1 + Math.random() * 0.15,
      rotation: Math.random() * Math.PI * 2,
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {leaves.map((leaf, i) => (
        <mesh key={i} position={leaf.position} rotation={[0, 0, leaf.rotation]}>
          <planeGeometry args={[leaf.scale, leaf.scale * 1.5]} />
          <meshBasicMaterial
            color="#4a7c59"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function ConnectionLines({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const { viewport } = useThree();

  const [positions] = useMemo(() => {
    const nodeCount = 30;
    const positions = new Float32Array(nodeCount * 6);

    for (let i = 0; i < nodeCount; i++) {
      const i6 = i * 6;
      positions[i6] = (Math.random() - 0.5) * viewport.width * 1.5;
      positions[i6 + 1] = (Math.random() - 0.5) * viewport.height * 1.5;
      positions[i6 + 2] = (Math.random() - 0.5) * 2;
      positions[i6 + 3] = positions[i6] + (Math.random() - 0.5) * 2;
      positions[i6 + 4] = positions[i6 + 1] + (Math.random() - 0.5) * 2;
      positions[i6 + 5] = positions[i6 + 2] + (Math.random() - 0.5) * 0.5;
    }

    return [positions];
  }, [viewport]);

  useFrame((state) => {
    if (!lineRef.current) return;
    const time = state.clock.elapsedTime;
    const posArray = lineRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < posArray.length / 6; i++) {
      const i6 = i * 6;
      posArray[i6 + 1] += Math.sin(time * 0.5 + i) * 0.005;
      posArray[i6 + 4] += Math.cos(time * 0.3 + i) * 0.005;
    }

    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#6b9b7a" transparent opacity={0.15} />
    </lineSegments>
  );
}

export function ParticleBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <ambientLight intensity={0.3} />
        <ParticleField count={120} mousePosition={mousePosition} />
        <FloatingLeaves mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
