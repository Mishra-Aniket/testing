'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const TECH_ITEMS = [
  { name: 'React', color: '#61DAFB', orbit: 1.8, speed: 0.3, offset: 0 },
  { name: 'Next.js', color: '#FFFFFF', orbit: 1.8, speed: 0.3, offset: Math.PI * 0.5 },
  { name: 'TypeScript', color: '#3178C6', orbit: 1.8, speed: 0.3, offset: Math.PI },
  { name: 'Python', color: '#3776AB', orbit: 1.8, speed: 0.3, offset: Math.PI * 1.5 },
  { name: 'Node.js', color: '#539E43', orbit: 2.2, speed: -0.2, offset: 0 },
  { name: 'PostgreSQL', color: '#336791', orbit: 2.2, speed: -0.2, offset: Math.PI * 0.67 },
  { name: 'AI/ML', color: '#E8650A', orbit: 2.2, speed: -0.2, offset: Math.PI * 1.33 },
  { name: 'Docker', color: '#2496ED', orbit: 2.6, speed: 0.15, offset: Math.PI * 0.25 },
  { name: 'AWS', color: '#FF9900', orbit: 2.6, speed: 0.15, offset: Math.PI * 1.25 },
];

function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#534AB7"
          transparent
          opacity={0.25}
          roughness={0.1}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.85, 24, 24]} />
        <meshStandardMaterial
          color="#6E65D0"
          transparent
          opacity={0.15}
          roughness={0.3}
          metalness={0.5}
          emissive="#534AB7"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

interface OrbitingNodeProps {
  color: string;
  orbitRadius: number;
  speed: number;
  offset: number;
  tilt: number;
}

function OrbitingNode({ color, orbitRadius, speed, offset, tilt }: OrbitingNodeProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed + offset;
      ref.current.position.x = Math.cos(t) * orbitRadius;
      ref.current.position.z = Math.sin(t) * orbitRadius;
      ref.current.position.y = Math.sin(t * 0.5) * tilt;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.6}
      />
    </mesh>
  );
}

function OrbitalRing({ radius, opacity }: { radius: number; opacity: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.005, radius + 0.005, 64]} />
      <meshBasicMaterial color="#534AB7" transparent opacity={opacity} />
    </mesh>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <CentralOrb />

      {/* Orbital rings */}
      <OrbitalRing radius={1.8} opacity={0.08} />
      <OrbitalRing radius={2.2} opacity={0.06} />
      <OrbitalRing radius={2.6} opacity={0.04} />

      {/* Tech nodes */}
      {TECH_ITEMS.map((tech) => (
        <OrbitingNode
          key={tech.name}
          color={tech.color}
          orbitRadius={tech.orbit}
          speed={tech.speed}
          offset={tech.offset}
          tilt={tech.orbit === 1.8 ? 0.3 : tech.orbit === 2.2 ? -0.5 : 0.4}
        />
      ))}
    </group>
  );
}

export default function TechOrb() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -5, -10]} intensity={0.3} color="#534AB7" />
      <Scene />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}
