"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron, Torus, Environment } from "@react-three/drei";
import { useRef } from "react";

// A slow, mouse-reactive floating object. Reused across hero sections with a
// per-page accent colour. Kept low-poly + capped DPR for 60fps.
function FloatingShape({ color = "#2e7bff", shape = "crystal" }) {
  const group = useRef();
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;
    // ease the group toward the pointer for a parallax/tilt feel
    group.current.rotation.y += delta * 0.15;
    group.current.rotation.x += (pointer.y * 0.4 - group.current.rotation.x) * 0.05;
    group.current.rotation.z += (-pointer.x * 0.3 - group.current.rotation.z) * 0.05;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.2}>
        {shape === "torus" ? (
          <Torus args={[1.1, 0.38, 32, 96]}>
            <MeshDistortMaterial color={color} distort={0.28} speed={1.6} roughness={0.1} metalness={0.85} />
          </Torus>
        ) : (
          <Icosahedron args={[1.5, 1]}>
            <MeshDistortMaterial color={color} distort={0.38} speed={1.8} roughness={0.08} metalness={0.9} />
          </Icosahedron>
        )}
      </Float>
    </group>
  );
}

export default function Scene3D({ color = "#2e7bff", shape = "crystal" }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.6} />
      <pointLight position={[-5, -3, 2]} intensity={2} color={color} />
      <FloatingShape color={color} shape={shape} />
      <Environment preset="city" />
    </Canvas>
  );
}
