"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
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
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);

  const pointCount = isMobile ? 140 : 260;
  const positions = useMemo(() => {
    const values = new Float32Array(pointCount * 3);
    for (let index = 0; index < pointCount; index += 1) {
      const i = index * 3;
      const spread = 2.4;
      values[i] = ((index % 20) - 9.5) * 0.16;
      values[i + 1] = (Math.floor(index / 20) - 6.5) * 0.16;
      values[i + 2] = ((index % 11) - 5) * 0.14;
      if (index % 3 === 0) {
        values[i] += spread * 0.2;
      }
      if (index % 5 === 0) {
        values[i + 1] -= spread * 0.11;
      }
    }
    return values;
  }, [pointCount]);

  const boxGeometry = useMemo(() => new THREE.BoxGeometry(2.2, 2.2, 2.2), []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.current.y * 0.16,
        0.05,
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        mouse.current.x * 0.16,
        0.05,
      );
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }

    if (wireRef.current) {
      wireRef.current.rotation.y += delta * 0.16;
    }

    state.camera.position.lerp(
      new THREE.Vector3(0, 0, 6.8 + Math.sin(state.clock.elapsedTime * 0.4) * 0.15),
      0.04,
    );
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.7}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <octahedronGeometry args={[1.15, 1]} />
          <meshPhysicalMaterial
            color="#f2b84e"
            emissive="#f4c56a"
            emissiveIntensity={0.22}
            roughness={0.17}
            metalness={0.4}
          />
        </mesh>
      </Float>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusKnotGeometry args={[1.55, 0.16, 180, 24]} />
        <meshStandardMaterial color="#2f6e70" emissive="#2f6e70" emissiveIntensity={0.16} />
      </mesh>

      <lineSegments ref={wireRef}>
        <edgesGeometry attach="geometry" args={[boxGeometry]} />
        <lineBasicMaterial color="#8fe2d2" linewidth={1} />
      </lineSegments>

      <Points positions={positions} stride={3} frustumCulled>
        <PointMaterial transparent depthWrite={false} size={0.02} sizeAttenuation color="#8fe2d2" opacity={0.8} />
      </Points>
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
      className="relative h-[320px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(242,184,78,0.22),_transparent_40%),linear-gradient(135deg,_rgba(15,30,40,0.95),_rgba(7,19,26,1))]"
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
      <Canvas camera={{ position: [0, 0, 6.2], fov: 45 }} dpr={[1, 1.8]}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 3, 5]} intensity={1.1} color="#ffd58f" />
        <pointLight position={[-4, -2, 3]} intensity={0.6} color="#78d7c3" />
        <SceneContent mouse={mouse} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
