"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type MouseState = {
  x: number;
  y: number;
};

type SceneContentProps = {
  mouse: React.MutableRefObject<MouseState>;
  isMobile: boolean;
};

function SceneContent({ mouse, isMobile }: SceneContentProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringsGroupRef = useRef<THREE.Group>(null);
  const wireMeshRef = useRef<THREE.Mesh>(null);

  // Generate 4 outer rings located outside the wireframe mesh
  const rings = useMemo(() => {
    return Array.from({ length: 4 }).map((_, index) => {
      const rx = (Math.PI / 4) * index;
      const ry = (Math.PI / 3) * index;
      const rz = (Math.PI / 6) * index;

      return { rx, ry, rz };
    });
  }, []);

  useFrame((state, delta) => {
    // Direct mouse tracking for cursor hover & swinging motion
    const targetX = mouse.current.x * 0.8;
    const targetY = -mouse.current.y * 0.8;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetX,
        0.08
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetY,
        0.08
      );
      // Gentle subtle base sway
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        mouse.current.x * 0.2,
        0.05
      );
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
    }

    if (wireMeshRef.current) {
      wireMeshRef.current.rotation.y -= delta * 0.1;
    }

    // Animate 4 outer rings smoothly around the mesh
    if (ringsGroupRef.current) {
      ringsGroupRef.current.children.forEach((ring, idx) => {
        const speed = (idx % 2 === 0 ? 1 : -1) * 0.12;
        ring.rotation.z += delta * speed;
      });
    }

    state.camera.position.lerp(
      new THREE.Vector3(0, 0, 7.0),
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      {/* Gentle Floating Glitter Particles (No spiraling, linear float) */}
      <Sparkles
        count={isMobile ? 70 : 150}
        scale={[4.8, 4.8, 4.8]}
        size={1.2}
        speed={0.25}
        opacity={0.85}
        color="#ffffff"
        noise={0.1}
      />

      <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.3}>
        <group>
          {/* Main Gold Core (Radius bumped to 1.30 inside 1.50 mesh) */}
          <mesh ref={coreRef} position={[0, 0, 0]}>
            <icosahedronGeometry args={[1.30, 0]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#d4af37"
              emissiveIntensity={0.35}
              roughness={0.15}
              metalness={0.9}
            />
          </mesh>

          {/* Wireframe Mesh Frame Surrounding Core (Radius = 1.50) */}
          <mesh ref={wireMeshRef} position={[0, 0, 0]}>
            <icosahedronGeometry args={[1.50, 1]} />
            <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.3} />
          </mesh>

          {/* 4 Outer Metallic Gold Rings Positioned Beyond Mesh Radius (2.05 > 1.50) */}
          <group ref={ringsGroupRef}>
            {rings.map((ring, idx) => (
              <mesh
                key={idx}
                rotation={[ring.rx, ring.ry, ring.rz]}
              >
                <torusGeometry args={[2.05, 0.018, 16, 90]} />
                <meshStandardMaterial
                  color="#f59e0b"
                  emissive="#d4af37"
                  emissiveIntensity={0.4}
                  roughness={0.15}
                  metalness={0.85}
                />
              </mesh>
            ))}
          </group>
        </group>
      </Float>
    </group>
  );
}

export default function ThreeScene() {
  const mouse = useRef<MouseState>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateValue = () => setIsMobile(mediaQuery.matches);

    updateValue();
    mediaQuery.addEventListener("change", updateValue);

    return () => mediaQuery.removeEventListener("change", updateValue);
  }, []);

  return (
    <div
      className="relative h-[320px] overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.12),_transparent_65%),linear-gradient(135deg,_rgba(6,24,38,0.95),_rgba(4,14,23,1))]"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouse.current.x = (event.clientX - rect.left) / rect.width - 0.5;
        mouse.current.y = (event.clientY - rect.top) / rect.height - 0.5;
      }}
      onMouseLeave={() => {
        mouse.current.x = 0;
        mouse.current.y = 0;
      }}
    >
      <Canvas camera={{ position: [0, 0, 7.0], fov: 45 }} dpr={[1, 1.8]}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 4, 5]} intensity={1.2} color="#fef3c7" />
        <pointLight position={[-4, -3, 3]} intensity={0.6} color="#06b6d4" />
        <SceneContent mouse={mouse} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}