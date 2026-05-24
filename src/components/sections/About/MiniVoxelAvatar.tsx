import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface Block {
  position: [number, number, number];
  color: string;
}

const generateBodyParts = () => {
  const coreBlocks: Block[] = [];
  const rightArmBlocks: Block[] = [];
  
  const skinColor = "#dca57c"; 
  const hairColor = "#3c2813"; 
  const noseColor = "#9b674b"; 
  const mouthColor = "#493121"; 
  const eyeWhite = "#ffffff";
  const eyePupil = "#45337b"; 
  const shirtColor = "#00aaaa"; 
  const pantsColor = "#333399";
  const shoeColor = "#4d4d4d";

  const jitterColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const noise = Math.floor(Math.random() * 20) - 10;
    const clamp = (val: number) => Math.max(0, Math.min(255, val + noise));
    return `#${clamp(r).toString(16).padStart(2, '0')}${clamp(g).toString(16).padStart(2, '0')}${clamp(b).toString(16).padStart(2, '0')}`;
  };

  const addBlock = (x: number, y: number, z: number, color: string, isSurface: boolean, targetArray: Block[]) => {
    if (isSurface) {
      const finalColor = (color === eyeWhite || color === eyePupil || color === mouthColor || color === noseColor) 
        ? color 
        : jitterColor(color);
      targetArray.push({ position: [x, y, z], color: finalColor });
    }
  };

  // 1. HEAD
  for (let x = -3.5; x <= 3.5; x++) {
    for (let y = 8.5; y <= 15.5; y++) {
      for (let z = -3.5; z <= 3.5; z++) {
        let color = skinColor;
        if (y === 15.5) color = hairColor;
        else if (z === -3.5) color = hairColor;
        else if (x === -3.5 || x === 3.5) {
          if (y >= 13.5) color = hairColor;
          if (z <= -0.5) color = hairColor;
        }
        if (z === 3.5) {
          if (y === 15.5 || y === 14.5) color = hairColor;
          else if (y === 12.5) {
            if (x === -2.5 || x === 2.5) color = eyeWhite;
            else if (x === -1.5 || x === 1.5) color = eyePupil;
          }
          else if (y === 11.5) {
            if (x === -0.5 || x === 0.5) color = noseColor;
          }
          else if (y === 10.5) {
            if (x >= -1.5 && x <= 1.5) color = mouthColor;
          }
        }
        const isSurface = x === -3.5 || x === 3.5 || y === 8.5 || y === 15.5 || z === -3.5 || z === 3.5;
        addBlock(x, y, z, color, isSurface, coreBlocks);
      }
    }
  }

  // 2. TORSO
  for (let x = -3.5; x <= 3.5; x++) {
    for (let y = -3.5; y <= 7.5; y++) {
      for (let z = -1.5; z <= 1.5; z++) {
        let color = shirtColor;
        if (z === 1.5 && y === 7.5 && (x === -0.5 || x === 0.5)) color = skinColor; 
        const isSurface = x === -3.5 || x === 3.5 || y === -3.5 || y === 7.5 || z === -1.5 || z === 1.5;
        addBlock(x, y, z, color, isSurface, coreBlocks);
      }
    }
  }

  // 3. LEFT ARM
  for (let x = -7.5; x <= -4.5; x++) {
    for (let y = -3.5; y <= 7.5; y++) {
      for (let z = -1.5; z <= 1.5; z++) {
        let color = y >= 3.5 ? shirtColor : skinColor;
        const isSurface = x === -7.5 || x === -4.5 || y === -3.5 || y === 7.5 || z === -1.5 || z === 1.5;
        addBlock(x, y, z, color, isSurface, coreBlocks);
      }
    }
  }

  // 4. RIGHT ARM (Skeletal Sub-Group)
  for (let x = 4.5; x <= 7.5; x++) {
    for (let y = -3.5; y <= 7.5; y++) {
      for (let z = -1.5; z <= 1.5; z++) {
        let color = y >= 3.5 ? shirtColor : skinColor;
        const isSurface = x === 4.5 || x === 7.5 || y === -3.5 || y === 7.5 || z === -1.5 || z === 1.5;
        addBlock(x - 5.5, y - 7.5, z, color, isSurface, rightArmBlocks);
      }
    }
  }

  // 5. LEFT LEG
  for (let x = -3.5; x <= -0.5; x++) {
    for (let y = -15.5; y <= -4.5; y++) {
      for (let z = -1.5; z <= 1.5; z++) {
        let color = y <= -13.5 ? shoeColor : pantsColor;
        const isSurface = x === -3.5 || x === -0.5 || y === -15.5 || y === -4.5 || z === -1.5 || z === 1.5;
        addBlock(x, y, z, color, isSurface, coreBlocks);
      }
    }
  }

  // 6. RIGHT LEG
  for (let x = 0.5; x <= 3.5; x++) {
    for (let y = -15.5; y <= -4.5; y++) {
      for (let z = -1.5; z <= 1.5; z++) {
        let color = y <= -13.5 ? shoeColor : pantsColor;
        const isSurface = x === 0.5 || x === 3.5 || y === -15.5 || y === -4.5 || z === -1.5 || z === 1.5;
        addBlock(x, y, z, color, isSurface, coreBlocks);
      }
    }
  }

  return { coreBlocks, rightArmBlocks };
};

const AvatarGroup = ({ isStatic }: { isStatic?: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  
  const { coreBlocks, rightArmBlocks } = useMemo(() => generateBodyParts(), []);
  const pointerRef = useRef<THREE.Vector3 | null>(null);

  const parentLocalPointer = useMemo(() => new THREE.Vector3(), []);
  const targetPos = useMemo(() => new THREE.Vector3(), []);

  const handlePointerMove = (e: any) => {
    if (isStatic) return;
    if (!pointerRef.current) pointerRef.current = new THREE.Vector3();
    pointerRef.current.copy(e.point);
  };

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (isStatic) return; // Completely freeze all physics and animations
    
    // Always keep the body perfectly static and facing forward
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, delta * 2);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, delta * 2);

    // Smooth, continuous arm waving (restored)
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.3 + 2.2;
      rightArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.15 - 0.3;
    }

    // High-Performance Recursive Shatter Physics
    groupRef.current.traverse((child: any) => {
      if (child.isMesh) {
        if (!child.userData.basePos) {
          child.userData.basePos = child.position.clone();
        }
        
        const basePos = child.userData.basePos as THREE.Vector3;
        targetPos.copy(basePos);

        if (pointerRef.current) {
          parentLocalPointer.copy(pointerRef.current);
          if (child.parent) {
            child.parent.worldToLocal(parentLocalPointer);
          }
          
          const distance = basePos.distanceTo(parentLocalPointer);
          const effectRadius = 10.0; // Slightly reduced detection radius
          
          if (distance < effectRadius) {
            // Balanced explosion multiplier (reduced to 2.0x as requested)
            const pushFactor = 1 + Math.pow((effectRadius - distance) / effectRadius, 1.5) * 2.0;
            targetPos.multiplyScalar(pushFactor);
          }
        }

        // Float smoothly towards target (smooth, liquid floaty physics)
        child.position.lerp(targetPos, delta * 3.5);
      }
    });
  });

  return (
    <group 
      ref={groupRef} 
      position={[0, 0, 0]} 
      rotation={[0, 0, 0]}
      onPointerMove={handlePointerMove}
      onPointerOut={() => { pointerRef.current = null; }}
    >
      {/* Core Body */}
      {coreBlocks.map((block, idx) => (
        <mesh key={`core-${idx}`} position={block.position}>
          <boxGeometry args={[0.95, 0.95, 0.95]} />
          <meshLambertMaterial color={block.color} />
        </mesh>
      ))}

      {/* Independent Right Arm skeletal group anchored at the shoulder pivot [5.5, 7.5, 0] */}
      <group ref={rightArmRef} position={[5.5, 7.5, 0]}>
        {rightArmBlocks.map((block, idx) => (
          <mesh key={`arm-${idx}`} position={block.position}>
            <boxGeometry args={[0.95, 0.95, 0.95]} />
            <meshLambertMaterial color={block.color} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default function MiniVoxelAvatar({ isStatic = false }: { isStatic?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`w-full h-full relative ${isStatic ? '' : 'cursor-grab active:cursor-grabbing'}`}
      onMouseEnter={() => !isStatic && setIsHovered(true)}
      onMouseLeave={() => !isStatic && setIsHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 42], fov: 55 }}>
        <ambientLight intensity={3.5} />
        <directionalLight position={[0, 10, 15]} intensity={4.5} />
        {/* Added a back light so the back of the character is visible when rotated 180 degrees! */}
        <directionalLight position={[0, 10, -15]} intensity={3.0} />
        <pointLight position={[-10, 5, -10]} intensity={2} color="#50c878" />
        <AvatarGroup isStatic={isStatic} />
        
        {/* Enable smooth 360 degree click and drag rotation! */}
        {!isStatic && <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} rotateSpeed={0.8} />}
      </Canvas>

      {/* Animated Floating 'hej!' Message Bubble */}
      <AnimatePresence>
        {!isStatic && isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.5 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="absolute top-[25%] right-[10%] bg-white text-black px-6 py-2.5 rounded-full font-black text-lg shadow-[0_0_25px_rgba(80,200,120,0.6)] z-50 pointer-events-none whitespace-nowrap border-[3px] border-emerald"
          >
            hej! 👋
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
