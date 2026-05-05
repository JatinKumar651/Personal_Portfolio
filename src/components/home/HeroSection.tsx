'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'motion/react';
import { SPRING_CONFIG } from '@/lib/spring';
import * as THREE from 'three';

function Monolith() {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;

    // Get mouse from pointer state
    const { pointer } = state;
    targetRotation.current.x = pointer.y * 0.15;
    targetRotation.current.y = pointer.x * 0.2;

    // Smooth lerp toward target
    meshRef.current.rotation.x +=
      (targetRotation.current.x - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y +=
      (targetRotation.current.y - meshRef.current.rotation.y) * 0.05;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[1.2, 2.4, 0.3]} />
        <MeshDistortMaterial
          color="#1a1a2e"
          metalness={0.95}
          roughness={0.1}
          distort={0.1}
          speed={2}
          envMapIntensity={1}
        />
      </mesh>
      {/* Edge glow */}
      <mesh>
        <boxGeometry args={[1.22, 2.42, 0.32]} />
        <meshBasicMaterial
          color="#00F5FF"
          transparent
          opacity={0.06}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function SceneEnvironment() {
  // Floating particles
  const particles = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#E2E8F0" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#00F5FF" />
      <spotLight
        position={[0, 8, 4]}
        angle={0.3}
        penumbra={1}
        intensity={0.6}
        color="#00F5FF"
        castShadow
      />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#00F5FF"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </>
  );
}

export default function HeroSection() {

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Canvas — Monolith */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <SceneEnvironment />
          <Monolith />
        </Canvas>
      </div>

      {/* ======== CENTER STAGE — Name + Title ======== */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none">

        {/* NAME — Letter-by-letter stagger from below */}
        <div className="flex items-baseline overflow-hidden">
          {'JATIN'.split('').map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 80, opacity: 0, rotateX: -40 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 14,
                delay: 0.4 + i * 0.1,
              }}
              className="text-[14vw] md:text-[9vw] lg:text-[7vw] leading-[0.85] tracking-tighter text-silver inline-block"
              style={{
                fontFamily: "'Syne Variable', 'Syne', sans-serif",
                fontWeight: 800,
                textShadow:
                  '0 0 80px rgba(0, 245, 255, 0.1), 0 0 160px rgba(0, 245, 255, 0.04)',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Gradient separator line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 60, damping: 20, delay: 1.0 }}
          className="w-[180px] md:w-[320px] h-[1px] my-4 md:my-5 origin-center"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.5), rgba(226, 232, 240, 0.3), rgba(0, 245, 255, 0.5), transparent)',
          }}
        />

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ ...SPRING_CONFIG, delay: 1.3 }}
          className="font-mono text-xs md:text-sm tracking-[0.3em] text-cyan/80 uppercase"
          style={{ textShadow: '0 0 30px rgba(0, 245, 255, 0.3)' }}
        >
          GenAI & Agentic Systems Developer
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_CONFIG, delay: 1.7 }}
          className="text-silver/30 text-xs md:text-sm max-w-md mx-auto leading-relaxed mt-4 tracking-wide"
        >
          Building at the intersection of intelligent systems
          <br />
          and immersive interfaces.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-14 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-silver/20 tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-[1px] h-6 bg-gradient-to-b from-cyan/30 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
