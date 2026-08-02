"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
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
  const wireMeshRef = useRef<THREE.Mesh>(null);

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

    state.camera.position.lerp(
      new THREE.Vector3(0, 0, 7.0),
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      {/* Gentle Floating Glitter Particles */}
      <Sparkles
        count={isMobile ? 70 : 150}
        scale={[5.5, 5.5, 5.5]}
        size={1.4}
        speed={0.25}
        opacity={0.85}
        color="#ffffff"
        noise={0.1}
      />

      <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.3}>
        <group>
          {/* Enlarged Main Gold Core (Radius = 1.70) */}
          <mesh ref={coreRef} position={[0, 0, 0]}>
            <icosahedronGeometry args={[1.70, 0]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#d4af37"
              emissiveIntensity={0.35}
              roughness={0.15}
              metalness={0.9}
            />
          </mesh>

          {/* Enlarged Wireframe Mesh Frame Surrounding Core (Radius = 2.05) */}
          <mesh ref={wireMeshRef} position={[0, 0, 0]}>
            <icosahedronGeometry args={[2.05, 1]} />
            <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.3} />
          </mesh>
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