"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  PointMaterial,
  Points,
} from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { Poster } from "./Poster";

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const damping = 1 - Math.pow(0.0005, delta);
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.4,
      damping,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.3,
      damping,
    );
  });

  return <group ref={group}>{children}</group>;
}

function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state += 0x6d2b79f5;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function Dust({
  count = 620,
  color = "#7b5cff",
  size = 0.035,
  radius = 5,
}: {
  count?: number;
  color?: string;
  size?: number;
  radius?: number;
}) {
  const positions = useMemo(() => {
    const random = seededRandom(count * 7919 + Math.round(radius * 100));
    const array = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const distance = radius * (0.55 + random() * 0.45);
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      array[index * 3] = distance * Math.sin(phi) * Math.cos(theta);
      array[index * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta) * 0.7;
      array[index * 3 + 2] = distance * Math.cos(phi);
    }
    return array;
  }, [count, radius]);

  return (
    <Points positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={0.75}
      />
    </Points>
  );
}

function Shapes() {
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ring.current) return;
    ring.current.rotation.z = state.clock.elapsedTime * 0.12;
    ring.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  return (
    <Rig>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.1}>
        <mesh>
          <icosahedronGeometry args={[1.55, 12]} />
          <MeshDistortMaterial
            color="#ff5a3c"
            emissive="#ff3d2e"
            emissiveIntensity={0.22}
            roughness={0.28}
            metalness={0.15}
            distort={0.42}
            speed={1.5}
          />
        </mesh>
      </Float>

      <mesh ref={ring} rotation={[1.15, 0.3, 0]}>
        <torusGeometry args={[2.15, 0.012, 8, 160]} />
        <meshBasicMaterial color="#c6f24e" transparent opacity={0.85} />
      </mesh>

      <mesh rotation={[0.4, 1.1, 0.2]}>
        <torusGeometry args={[2.5, 0.006, 8, 160]} />
        <meshBasicMaterial color="#7b5cff" transparent opacity={0.45} />
      </mesh>

      <Float speed={2.2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-1.95, 1.25, 0.4]}>
          <sphereGeometry args={[0.17, 32, 32]} />
          <meshStandardMaterial
            color="#ffb37a"
            roughness={0.15}
            metalness={0.6}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.6}>
        <mesh position={[1.9, -1.35, 0.6]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial
            color="#7b5cff"
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </Float>

      <Float speed={2.6} rotationIntensity={1.2} floatIntensity={2.2}>
        <mesh position={[1.55, 1.75, -0.5]}>
          <octahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color="#c6f24e" roughness={0.3} />
        </mesh>
      </Float>

      <Dust />
      <Dust count={160} color="#ff7ac3" size={0.05} radius={3.2} />
    </Rig>
  );
}

export default function HeroScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [dpr] = useState<[number, number]>(() =>
    typeof window !== "undefined" && window.innerWidth < 768 ? [1, 1] : [1, 1.5],
  );

  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 6.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={active ? "always" : "never"}
        fallback={<Poster />}
      >
        <ambientLight intensity={0.75} />
        <directionalLight
          position={[5, 6, 5]}
          intensity={2.6}
          color="#fff3e8"
        />
        <directionalLight
          position={[-5, -3, 2]}
          intensity={1.4}
          color="#7b5cff"
        />
        <pointLight position={[0, 0, 4]} intensity={2.2} color="#ff7ac3" />
        <Shapes />
      </Canvas>
    </div>
  );
}
