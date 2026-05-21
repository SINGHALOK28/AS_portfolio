"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

// Individual Voxel block helper
interface BlockProps {
  position: [number, number, number];
  color?: string;
  roughness?: number;
  emissive?: string;
  emissiveIntensity?: number;
}

function VoxelBlock({ position, color = "#2e8b57", roughness = 0.8, emissive, emissiveIntensity = 0 }: BlockProps) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        emissive={emissive ? new THREE.Color(emissive) : undefined}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
}

// Tree structure helper
function VoxelTree({ position }: { position: [number, number, number] }) {
  const [tx, ty, tz] = position;
  return (
    <group>
      {/* Trunk (Brown) */}
      <VoxelBlock position={[tx, ty, tz]} color="#8b5a2b" />
      <VoxelBlock position={[tx, ty + 1, tz]} color="#8b5a2b" />
      <VoxelBlock position={[tx, ty + 2, tz]} color="#8b5a2b" />
      
      {/* Leaves (Green) */}
      <VoxelBlock position={[tx, ty + 3, tz]} color="#1e5d3c" />
      <VoxelBlock position={[tx - 1, ty + 3, tz]} color="#226f46" />
      <VoxelBlock position={[tx + 1, ty + 3, tz]} color="#226f46" />
      <VoxelBlock position={[tx, ty + 3, tz - 1]} color="#226f46" />
      <VoxelBlock position={[tx, ty + 3, tz + 1]} color="#226f46" />
      
      <VoxelBlock position={[tx, ty + 4, tz]} color="#2e8b57" />
      <VoxelBlock position={[tx - 1, ty + 4, tz]} color="#2e8b57" />
      <VoxelBlock position={[tx + 1, ty + 4, tz]} color="#2e8b57" />
    </group>
  );
}

// Floating clouds helper
function VoxelCloud({ startPosition, speed }: { startPosition: [number, number, number]; speed: number }) {
  const cloudRef = useRef<THREE.Group>(null);
  const [x, y, z] = startPosition;

  useFrame((state) => {
    if (!cloudRef.current) return;
    // Drift cloud slowly
    cloudRef.current.position.x += speed;
    if (cloudRef.current.position.x > 12) {
      cloudRef.current.position.x = -12;
    }
  });

  return (
    <group ref={cloudRef} position={[x, y, z]}>
      <VoxelBlock position={[0, 0, 0]} color="#ffffff" roughness={0.2} />
      <VoxelBlock position={[1, 0, 0]} color="#eeeeee" roughness={0.2} />
      <VoxelBlock position={[0, 0, 1]} color="#eeeeee" roughness={0.2} />
      <VoxelBlock position={[0, 0, -1]} color="#eeeeee" roughness={0.2} />
      <VoxelBlock position={[-1, 0, 0]} color="#dddddd" roughness={0.2} />
      <VoxelBlock position={[0, 0.6, 0]} color="#ffffff" roughness={0.2} />
    </group>
  );
}

// Scene controller that handles mouse parallax movement
function SceneContent() {
  const sceneRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (!sceneRef.current) return;
    
    // Smooth mouse follow (parallax) rotation
    const targetRotY = mouse.x * 0.4;
    const targetRotX = -mouse.y * 0.2;
    
    sceneRef.current.rotation.y += (targetRotY - sceneRef.current.rotation.y) * 0.05;
    sceneRef.current.rotation.x += (targetRotX - sceneRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={sceneRef}>
      {/* Floating Island Base (Grass top) */}
      <group position={[0, -1.5, 0]}>
        {/* Core grass grid */}
        {Array.from({ length: 5 }).map((_, xIndex) => {
          return Array.from({ length: 5 }).map((_, zIndex) => {
            const posX = xIndex - 2;
            const posZ = zIndex - 2;
            // Carve corners for pixel island feel
            if (Math.abs(posX) === 2 && Math.abs(posZ) === 2) return null;
            
            return (
              <group key={`${posX}-${posZ}`}>
                {/* Grass Block */}
                <VoxelBlock position={[posX, 0, posZ]} color="#4caf50" />
                {/* Dirt Underneath */}
                <VoxelBlock position={[posX, -1, posZ]} color="#8b5a2b" />
                {/* Stone Bottom */}
                <VoxelBlock position={[posX, -2, posZ]} color="#707070" />
              </group>
            );
          });
        })}

        {/* Tree on the side */}
        <VoxelTree position={[-1.2, 0.8, -1.2]} />

        {/* Voxel Campfire (Redstone Torch) */}
        <group position={[1.2, 0.8, 1.2]}>
          <VoxelBlock position={[0, 0, 0]} color="#555555" />
          <VoxelBlock position={[0, 0.8, 0]} color="#ff5500" emissive="#ff3300" emissiveIntensity={2.5} />
          <pointLight position={[0, 1.2, 0]} intensity={4} distance={6} color="#ffaa00" />
        </group>

        {/* Floating Centered Monolith (Developer Core) */}
        <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1}>
          <group position={[0, 1.8, 0]}>
            {/* Spinning Diamond block */}
            <mesh>
              <boxGeometry args={[0.7, 0.7, 0.7]} />
              <meshStandardMaterial
                color="#7df9ff"
                roughness={0.1}
                metalness={0.9}
                emissive="#7df9ff"
                emissiveIntensity={1.2}
              />
            </mesh>
            <pointLight intensity={3} color="#7df9ff" distance={5} />
          </group>
        </Float>
      </group>

      {/* Ambient Clouds */}
      <VoxelCloud startPosition={[-8, 3, -4]} speed={0.005} />
      <VoxelCloud startPosition={[4, 2.5, 4]} speed={0.003} />
    </group>
  );
}

export default function VoxelCanvas() {
  return (
    <div className="w-full h-full min-h-[350px] md:min-h-[500px]">
      <Canvas
        camera={{ position: [0, 2.5, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        {/* Sun directional light */}
        <directionalLight
          position={[5, 10, 3]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        {/* Soft background stars */}
        <Stars radius={100} depth={50} count={350} factor={4} saturation={0.5} fade speed={1} />
        
        {/* Dynamic Voxel scene */}
        <SceneContent />

        {/* Orbit controls for user interaction (recruiter can drag & spin) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
