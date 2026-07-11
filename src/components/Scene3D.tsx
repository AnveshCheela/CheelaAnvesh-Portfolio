import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Sphere, TorusKnot } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function Knot() {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.x += dt * 0.15;
      ref.current.rotation.y += dt * 0.2;
    }
  });
  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
      <TorusKnot ref={ref} args={[1.05, 0.32, 220, 32]}>
        <MeshDistortMaterial
          color="#22d3ee"
          emissive="#0891b2"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.85}
          distort={0.35}
          speed={1.6}
        />
      </TorusKnot>
    </Float>
  );
}

function Orb({ position, color, scale = 0.4 }: { position: [number, number, number]; color: string; scale?: number }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere position={position} args={[scale, 32, 32]}>
        <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.2} metalness={0.7} distort={0.5} speed={2} />
      </Sphere>
    </Float>
  );
}

export function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ec4899" />
        <directionalLight position={[-5, -3, 2]} intensity={0.9} color="#22d3ee" />
        <Knot />
        <Orb position={[-2.4, 1.2, -1]} color="#ec4899" scale={0.35} />
        <Orb position={[2.2, -1.4, -0.5]} color="#a855f7" scale={0.28} />
        <Orb position={[2.6, 1.5, -2]} color="#22d3ee" scale={0.22} />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
