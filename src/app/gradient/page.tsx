'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    MeshTransmissionMaterial,
    RoundedBox,
    Environment,
    Float,
    ContactShadows,
    OrbitControls,
    Lightformer
} from '@react-three/drei';
import * as THREE from 'three';

// --- Configuration based on JSON Analysis ---
const CONFIG = {
    colors: {
        background: '#2E1A47', // Deep Violet background
        cyanNode: '#4A90E2',   // Top-Left Cool
        coralNode: '#FF8C66',  // Center Warm
        magentaNode: '#D9368B', // Bottom-Right Deep
        floorGlow: '#4A90E2',  // Blue floor bounce
    },
    glass: {
        thickness: 1.2,   // Simulates the heavy slab look
        roughness: 0.2,   // Surface texture (frost)
        transmission: 1,  // Clarity of the material itself
        ior: 1.2,         // Index of refraction (glass/acrylic)
        chromaticAberration: 0.04, // Subtle color fringe at edges
        backside: true,   // Essential for seeing the gradient behind
    }
};

/**
 * The Glowing Orbs behind the glass that create the gradient.
 * We move them slowly to make the gradient feel "alive".
 */
const GradientBackdrop = () => {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;
        const t = state.clock.getElapsedTime();
        // Subtle breathing motion for the gradient nodes
        group.current.children[0].position.y = 1 + Math.sin(t * 0.5) * 0.2; // Cyan
        group.current.children[1].position.x = Math.sin(t * 0.3) * 0.2;     // Coral
        group.current.position.y = Math.sin(t * 0.2) * 0.1;
    });

    return (
        <group ref={group} position={[0, 0, -1.5]}>
            {/* Top Left - Cool Cyan Anchor */}
            <mesh position={[-1.2, 1.5, 0]}>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshBasicMaterial color={CONFIG.colors.cyanNode} toneMapped={false} />
            </mesh>

            {/* Center - Vibrant Coral Core (The "Lava") */}
            <mesh position={[0.2, -0.2, -0.5]}>
                <sphereGeometry args={[1.4, 32, 32]} />
                <meshBasicMaterial color={CONFIG.colors.coralNode} toneMapped={false} />
            </mesh>

            {/* Bottom Right - Deep Magenta */}
            <mesh position={[1.2, -1.5, -0.5]}>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshBasicMaterial color={CONFIG.colors.magentaNode} toneMapped={false} />
            </mesh>
        </group>
    );
};

/**
 * The Main Glass Artifact
 */
const GlassCard = () => {
    const mesh = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    // Smooth rotation on hover
    useFrame((state, delta) => {
        if (!mesh.current) return;
        const targetRotationX = hovered ? 0.1 : 0;
        const targetRotationY = hovered ? 0.1 : 0;

        mesh.current.rotation.x = THREE.MathUtils.damp(mesh.current.rotation.x, targetRotationX, 4, delta);
        mesh.current.rotation.y = THREE.MathUtils.damp(mesh.current.rotation.y, targetRotationY, 4, delta);
    });

    return (
        <Float floatIntensity={1.5} rotationIntensity={0.2} speed={1.5}>
            <RoundedBox
                ref={mesh}
                args={[2.2, 3.5, 0.2]} // Width, Height, Depth
                radius={0.3} // Corner radius
                smoothness={4}
                position={[0, 0, 0]}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <MeshTransmissionMaterial
                    backside={true}
                    samples={16} // Quality of the blur
                    resolution={1024} // Resolution of the transmission buffer
                    transmission={CONFIG.glass.transmission}
                    roughness={CONFIG.glass.roughness}
                    thickness={CONFIG.glass.thickness}
                    ior={CONFIG.glass.ior}
                    chromaticAberration={CONFIG.glass.chromaticAberration}
                    anisotropy={0.1}
                    distortion={1.5}
                    distortionScale={0.5}
                    temporalDistortion={0.1}
                    clearcoat={1}
                    attenuationDistance={0.5}
                    attenuationColor="#ffffff"
                    color="#ffffff"
                    background={new THREE.Color(CONFIG.colors.background)}
                />
            </RoundedBox>
        </Float>
    );
};

/**
 * Scene Setup including Lights and Environment
 */
const Scene = () => {
    return (
        <>
            <OrbitControls
                makeDefault
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.8}
                minAzimuthAngle={-Math.PI / 4}
                maxAzimuthAngle={Math.PI / 4}
            />

            {/* 1. The Gradient Source (Behind the glass) */}
            <GradientBackdrop />

            {/* 2. The Glass Object */}
            <GlassCard />

            {/* 3. Lighting Simulation */}

            {/* Top-Left Cool Key Light */}
            <spotLight
                position={[-5, 5, 5]}
                angle={0.5}
                penumbra={1}
                intensity={20}
                color={CONFIG.colors.cyanNode}
                distance={20}
            />

            {/* Warm Fill from bottom */}
            <pointLight position={[3, -3, 2]} intensity={5} color={CONFIG.colors.magentaNode} />

            {/* The Floor Bounce (Blue Glow) - Replicated using a RectAreaLight */}
            <rectAreaLight
                width={10}
                height={2}
                position={[0, -3, 1]}
                color={CONFIG.colors.floorGlow}
                intensity={10}
                rotation={[-Math.PI / 2, 0, 0]} // Pointing up
            />

            {/* Environment for reflections */}
            <Environment resolution={512}>
                <group rotation={[-Math.PI / 3, 0, 1]}>
                    <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
                    <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
                    <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
                    <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
                </group>
            </Environment>

            {/* Soft Shadows to ground the object */}
            <ContactShadows
                resolution={1024}
                scale={20}
                blur={2}
                opacity={0.5}
                far={10}
                color={CONFIG.colors.background}
            />
        </>
    );
};

export default function App() {
    return (
        <div className="w-full h-screen bg-[#2E1A47] overflow-hidden relative font-sans text-white">
            {/* UI Overlay */}
            <div className="absolute top-8 left-8 z-10 pointer-events-none">
                <h1 className="text-4xl font-bold tracking-tight mb-2 opacity-90">Glassmorphism</h1>
                <p className="text-white/60 max-w-xs text-sm">
                    Physical simulation of frosted transmission over a multi-point gradient mesh.
                </p>
            </div>

            <div className="absolute bottom-8 right-8 z-10 pointer-events-none text-right">
                <div className="text-xs font-mono text-white/40 mb-1">LIGHTING DATA</div>
                <div className="flex gap-2 justify-end">
                    <div className="w-3 h-3 rounded-full bg-[#4A90E2]" title="Cyan Key" />
                    <div className="w-3 h-3 rounded-full bg-[#FF8C66]" title="Coral Core" />
                    <div className="w-3 h-3 rounded-full bg-[#D9368B]" title="Magenta Fill" />
                </div>
            </div>

            {/* 3D Scene */}
            <Canvas
                camera={{ position: [0, 0, 6], fov: 40 }}
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
                dpr={[1, 2]} // Optimizes for high-DPI screens
            >
                <color attach="background" args={[CONFIG.colors.background]} />
                <Scene />
            </Canvas>

            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#2E1A47] to-transparent pointer-events-none" />
        </div>
    );
}