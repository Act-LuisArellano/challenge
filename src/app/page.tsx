'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { Physics, useBox, usePlane } from '@react-three/cannon';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// --- PALETTE CONSTANTS ---
const PALETTE_COLORS = [
    '#3b82f6', // Blue
    '#f97316', // Orange
    '#ec4899', // Pink
    '#10b981', // Emerald
    '#8b5cf6', // Violet
];

// --- 3D COMPONENTS ---

// A single data voxel that falls
function DataCube({ position, color }: { position: [number, number, number], color: string }) {
    const [ref] = useBox(() => ({
        mass: 1,
        position,
        args: [1, 1, 1],
        material: { friction: 0.1, restitution: 0.5 },
    }));

    return (
        <mesh ref={ref as any} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
            {/* Outline Effect (simple wireframe overlay) */}
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
                <lineBasicMaterial color="#000000" linewidth={2} />
            </lineSegments>
        </mesh>
    );
}

// The floor and invisible walls to contain the cubes
function Boundaries() {
    // Floor
    usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -5, 0] }));

    // Walls to keep cubes in view
    usePlane(() => ({ position: [0, 0, -5], rotation: [0, 0, 0] })); // Back
    usePlane(() => ({ position: [0, 0, 5], rotation: [0, Math.PI, 0] })); // Front
    usePlane(() => ({ position: [-8, 0, 0], rotation: [0, Math.PI / 2, 0] })); // Left
    usePlane(() => ({ position: [8, 0, 0], rotation: [0, -Math.PI / 2, 0] })); // Right

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial transparent opacity={0.2} />
        </mesh>
    );
}

// Spawner logic
function CubeSpawner() {
    const [cubes, setCubes] = useState<{ id: number; pos: [number, number, number]; color: string }[]>([]);

    useEffect(() => {
        let count = 0;
        const interval = setInterval(() => {
            if (count > 50) return; // Limit total cubes

            setCubes(prev => [
                ...prev,
                {
                    id: Date.now(),
                    pos: [(Math.random() - 0.5) * 5, 10 + Math.random() * 5, (Math.random() - 0.5) * 2],
                    color: PALETTE_COLORS[Math.floor(Math.random() * PALETTE_COLORS.length)]
                }
            ]);
            count++;
        }, 200); // Spawn rate

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {cubes.map(cube => (
                <DataCube key={cube.id} position={cube.pos} color={cube.color} />
            ))}
        </>
    );
}

function Scene() {
    return (
        <Physics gravity={[0, -10, 0]}>
            <Boundaries />
            <CubeSpawner />
        </Physics>
    );
}

// --- MAIN PAGE COMPONENT ---

export default function LandingPage() {
    return (
        <main className="relative w-full h-screen bg-[#1e1e2e] overflow-hidden font-pixel text-[#94a3b8]">

            {/* 3D LAYER */}
            <div className="absolute inset-0 z-0">
                <Canvas
                    shadows
                    // Voxel Look: No Antialias
                    gl={{ antialias: false, powerPreference: "high-performance" }}
                    camera={{ position: [8, 8, 8], fov: 45 }}
                >
                    <color attach="background" args={['#1e1e2e']} />

                    {/* Lighting */}
                    <ambientLight intensity={0.7} />
                    <spotLight position={[10, 20, 10]} angle={0.3} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
                    <pointLight position={[-10, 10, -10]} intensity={0.5} color="blue" />

                    <Scene />

                    <ContactShadows resolution={512} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                        maxPolarAngle={Math.PI / 2.2}
                    />
                </Canvas>
            </div>

            {/* UI LAYER (Overlay) */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center p-8">

                {/* Decorative Grid Overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'linear-gradient(#2d2d44 1px, transparent 1px), linear-gradient(90deg, #2d2d44 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}></div>

                {/* Main Content */}
                <div className="max-w-4xl text-center space-y-8 bg-[#1e1e2e]/80 p-12 border-4 border-[#2d2d44] backdrop-blur-sm shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] pointer-events-auto">
                    <h1 className="text-6xl md:text-8xl tracking-tighter text-white uppercase mb-4" style={{ textShadow: '4px 4px 0 #000' }}>
                        Supercharge Your <span className="text-blue-500">LLMs</span>
                    </h1>

                    <p className="text-2xl md:text-3xl text-[#94a3b8] uppercase leading-relaxed">
                        {'>'} Join the ultimate Fine-Tuning Challenge.<br />
                        {'>'} Optimization In Progress...
                    </p>

                    <div className="flex gap-6 justify-center mt-8">
                        <Link
                            href="/dashboard"
                            className="bg-blue-600 hover:bg-blue-500 text-white text-2xl uppercase py-3 px-8 border-b-4 border-blue-900 active:border-b-0 active:translate-y-1 transition-all shadow-lg hover:shadow-blue-500/20"
                        >
                            [Get Started]
                        </Link>
                        <Link
                            href="/login"
                            className="bg-[#2d2d44] hover:bg-[#3f3f5a] text-white text-2xl uppercase py-3 px-8 border-b-4 border-[#1e1e2e] active:border-b-0 active:translate-y-1 transition-all"
                        >
                            [Login]
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t-2 border-[#2d2d44]">
                        <div>
                            <div className="text-3xl text-blue-400 font-bold">100+</div>
                            <div className="text-sm uppercase">Datasets</div>
                        </div>
                        <div>
                            <div className="text-3xl text-green-400 font-bold">99%</div>
                            <div className="text-sm uppercase">Uptime</div>
                        </div>
                        <div>
                            <div className="text-3xl text-pink-400 font-bold">24/7</div>
                            <div className="text-sm uppercase">Eval</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
