"use client";

import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import voxelDataRaw from "./human_voxels.json";
// Force hot-reload

interface VoxelData {
  x: number;
  y: number;
  z: number;
  color: string;
}
const VOXELS = voxelDataRaw as VoxelData[];

// ═══════════════════════════════════════════════════════
// INSTANCED VOXELS — rendering 1000+ tiny blocks efficiently
// ═══════════════════════════════════════════════════════

function HumanVoxelModel() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [hovered, setHovered] = useState(false);

  const { dummy, colorObj } = useMemo(() => ({
    dummy: new THREE.Object3D(),
    colorObj: new THREE.Color(),
  }), []);

  useEffect(() => {
    if (!meshRef.current) return;
    
    VOXELS.forEach((v, i) => {
      // Center the character vertically
      dummy.position.set(v.x, v.y - 16, v.z);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      colorObj.set(v.color);
      meshRef.current!.setColorAt(i, colorObj);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [dummy, colorObj]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 1.5) * 0.5;
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => { document.body.style.cursor = "auto"; };
  }, [hovered]);

  const SCALE = 0.25;

  return (
    <group 
      scale={[SCALE, SCALE, SCALE]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
    >
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, VOXELS.length]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]}>
          <instancedBufferAttribute attach="attributes-color" args={[new Float32Array(VOXELS.length * 3), 3]} />
        </boxGeometry>
        {/* Material for the tiny voxels */}
        <meshPhysicalMaterial
          vertexColors
          roughness={0.4}
          metalness={0.1}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={0.02} // Subtle glow so very dark skins aren't totally invisible
        />
      </instancedMesh>

      {/* Edge outlines to ensure blocks are always visible even if black */}
      <instancedMesh args={[undefined, undefined, VOXELS.length]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial color="#50c878" transparent opacity={0.3} />
      </instancedMesh>

      {/* Hover message */}
      <Html position={[0, 22, 0]} center zIndexRange={[100, 0]}>
        <div
          className="bg-[#0a0f11]/95 border-2 border-emerald/50 text-emerald font-mono px-5 py-2.5 rounded-xl whitespace-nowrap shadow-[0_0_25px_rgba(80,200,120,0.4)] backdrop-blur-md pointer-events-none transition-all duration-300 ease-out"
          style={{
            opacity: hovered ? 1 : 0,
            transform: `translateY(${hovered ? "0px" : "15px"}) scale(${hovered ? 1 : 0.9})`,
          }}
        >
          <span className="text-emerald font-bold animate-pulse mr-2">{"//"}</span>
          <span className="text-gray-100 font-bold tracking-wide">Hello I&apos;m Alok here</span>
        </div>
      </Html>
    </group>
  );
}

// ═══════════════════════════════════════════════════════
// FLOATING PARTICLES
// ═══════════════════════════════════════════════════════

const _tempObj = new THREE.Object3D();

function FloatingParticles({ count = 35 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particleData = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8
      ),
      speed: 0.25 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      scale: 0.03 + Math.random() * 0.06,
    })), [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const p = particleData[i];
      _tempObj.position.set(
        p.pos.x + Math.sin(t * p.speed + p.phase) * 1.5,
        p.pos.y + Math.cos(t * p.speed * 0.7 + p.phase) * 2,
        p.pos.z + Math.sin(t * p.speed * 0.5 + p.phase * 2) * 1
      );
      const s = p.scale * (0.7 + 0.5 * Math.sin(t * 2 + p.phase));
      _tempObj.scale.setScalar(s);
      _tempObj.updateMatrix();
      meshRef.current.setMatrixAt(i, _tempObj.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#50c878" transparent opacity={0.45} />
    </instancedMesh>
  );
}

function GroundGlow() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -3.7, 0]} receiveShadow>
      <circleGeometry args={[2.5, 32]} />
      <meshBasicMaterial
        color="#50c878"
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function SceneContent() {
  const sceneRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (!sceneRef.current) return;
    const targetRotY = mouse.x * 0.4;
    const targetRotX = -mouse.y * 0.15;
    sceneRef.current.rotation.y += (targetRotY - sceneRef.current.rotation.y) * 0.05;
    sceneRef.current.rotation.x += (targetRotX - sceneRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={sceneRef}>
      <Float speed={2.5} rotationIntensity={0} floatIntensity={0.8}>
        <group>
          <HumanVoxelModel />

          <pointLight intensity={8} color="#00e5ff" distance={16} position={[5, 3, 7]} />
          <pointLight intensity={5} color="#ff00ff" distance={14} position={[-5, 1, -5]} />
          <pointLight intensity={6} color="#50c878" distance={12} position={[0, -6, 3]} />
          <pointLight intensity={3} color="#ffffff" distance={10} position={[0, 8, 0]} />

          <FloatingParticles count={35} />
          <GroundGlow />
        </group>
      </Float>
    </group>
  );
}

export default function VoxelCanvas() {
  return (
    <div className="w-full h-full min-h-[350px] md:min-h-[500px]">
      <Canvas
        camera={{ position: [0, 1.5, 10], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        dpr={[1, 2]}
        shadows
      >
        <ambientLight intensity={0.8} color="#c8e6ff" />
        <directionalLight
          position={[5, 10, 5]}
          intensity={2.0}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          color="#fff5e0"
        />
        <directionalLight position={[-3, -2, 5]} intensity={0.5} color="#50c878" />

        <Stars radius={100} depth={50} count={400} factor={4} saturation={0.5} fade speed={1} />
        
        <SceneContent />
      </Canvas>
    </div>
  );
}
