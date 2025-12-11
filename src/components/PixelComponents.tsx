'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';

// --- CONFIGURATION & STYLE GUIDE CONSTANTS ---

export const PALETTE = {
    bg: '#1e1e2e',
    surface: '#2d2d44',
    text: '#94a3b8',
    colors: [
        '#3b82f6', // Blue
        '#f97316', // Orange
        '#ec4899', // Pink
        '#10b981', // Emerald
        '#8b5cf6', // Violet
    ]
};

// The virtual resolution. Lower = chunkier pixels.
export const PIXEL_SCALE = {
    sm: { w: 32, h: 32 },
    md: { w: 64, h: 32 },
    lg: { w: 64, h: 64 },
    xl: { w: 128, h: 64 }
};

// --- UTILS ---

const lerp = (start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
};

// --- COMPONENTS ---

/**
 * PixelCanvas
 * The core component. It creates a small canvas and scales it up using CSS.
 * This ensures strict pixelation (no anti-aliasing) regardless of screen size.
 */
export const PixelCanvas = ({
    draw,
    resolution = { w: 64, h: 32 },
    className = ""
}: {
    draw: (ctx: CanvasRenderingContext2D, frame: number) => void,
    resolution?: { w: number, h: number },
    className?: string
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>(0);
    const frameRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // We strictly turn off image smoothing to get the pixel art look
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.imageSmoothingEnabled = false;

        const render = () => {
            frameRef.current++;

            // Clear with transparent or bg
            ctx.clearRect(0, 0, resolution.w, resolution.h);

            draw(ctx, frameRef.current);
            requestRef.current = requestAnimationFrame(render);
        };

        requestRef.current = requestAnimationFrame(render);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [draw, resolution]);

    return (
        <canvas
            ref={canvasRef}
            width={resolution.w}
            height={resolution.h}
            className={`w-full h-full ${className}`}
            style={{
                imageRendering: 'pixelated', // The magic CSS property
            }}
        />
    );
};

/**
 * BarChart
 * Renders strict rects on the grid.
 */
export const BarChart = ({ data, colorIndex = 0 }: { data: number[], colorIndex?: number }) => {
    // Store the animated values
    const visualState = useRef(data.map(d => 0));

    const draw = (ctx: CanvasRenderingContext2D) => {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;

        // Scale data to fit height
        const maxVal = Math.max(...data, 1);

        const barCount = data.length;
        // Calculate optimal bar width and gap to fill space
        // total_w = count * bar_w + (count-1) * gap + padding
        // rough approx:
        const gap = 1;
        let barWidth = Math.floor((w - gap * (barCount - 1)) / barCount);
        if (barWidth < 1) barWidth = 1;

        // Animate values towards target
        for (let i = 0; i < data.length; i++) {
            const target = data[i];
            const current = visualState.current[i] || 0;
            // Simple easing: move 10% of the way there each frame
            if (Math.abs(target - current) > 0.1) {
                visualState.current[i] = lerp(current, target, 0.1);
            } else {
                visualState.current[i] = target;
            }
        }

        visualState.current.forEach((val, i) => {
            // Snap value to integer for "stepped" animation feel
            const snappedVal = Math.floor(val);

            const x = i * (barWidth + gap);
            // Normalized height
            const height = Math.min((snappedVal / maxVal) * h, h);
            const y = h - height;

            // Draw shadow/voxel depth
            ctx.fillStyle = '#111827'; // Deep shadow
            ctx.fillRect(Math.floor(x) + 1, Math.floor(y) + 1, barWidth, Math.floor(height));

            // Draw main bar
            ctx.fillStyle = PALETTE.colors[(i + colorIndex) % PALETTE.colors.length];

            // We Math.floor everything to snap to grid
            ctx.fillRect(Math.floor(x), Math.floor(y), barWidth, Math.floor(height));
        });
    };

    return <PixelCanvas draw={draw} resolution={PIXEL_SCALE.md} />;
};

/**
 * LineChart
 * Uses a manual line drawing approach to ensure pixel-perfect steps.
 */
export const LineChart = ({ data }: { data: number[] }) => {
    const visualState = useRef(data.map(d => 0));

    const draw = (ctx: CanvasRenderingContext2D) => {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        const stepX = w / Math.max(data.length - 1, 1);
        const maxVal = Math.max(...data, 1); // Avoid div by zero

        // Animate values
        for (let i = 0; i < data.length; i++) {
            const target = data[i];
            const current = visualState.current[i] || 0;
            // Slower easing for line chart
            visualState.current[i] = lerp(current, target, 0.05);
        }

        // Draw grid lines
        ctx.fillStyle = '#334155';
        for (let i = 0; i < h; i += 8) ctx.fillRect(0, i, w, 1);
        for (let i = 0; i < w; i += 16) ctx.fillRect(i, 0, 1, h);

        // Draw Line
        ctx.fillStyle = PALETTE.colors[1]; // Orange

        // Pixel-by-pixel line interpolation
        for (let i = 0; i < visualState.current.length - 1; i++) {
            const p1 = { x: i * stepX, y: h - (visualState.current[i] / maxVal) * h };
            const p2 = { x: (i + 1) * stepX, y: h - (visualState.current[i + 1] / maxVal) * h };

            // Bresenham-like visual interpolation
            const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
            const steps = Math.ceil(dist); // 1 pixel per step

            for (let s = 0; s <= steps; s++) {
                const t = s / steps;
                const x = p1.x + (p2.x - p1.x) * t;
                const y = p1.y + (p2.y - p1.y) * t;

                // Snap to grid
                ctx.fillRect(Math.floor(x), Math.floor(y), 2, 2);
            }
        }
    };

    return <PixelCanvas draw={draw} resolution={PIXEL_SCALE.md} />;
};

/**
 * PieChart
 * Renders a "voxel" circle by scanning pixels and calculating distance.
 */
export const PieChart = ({ data }: { data: number[] }) => {
    // Normalize data to angles
    const total = data.reduce((a, b) => a + b, 0);
    const angles = useMemo(() => data.map(d => (total > 0 ? (d / total) * Math.PI * 2 : 0)), [data, total]);

    // Animation state (0 to 1 for a "grow" effect)
    const growRef = useRef(0);
    const targetGrow = useRef(0);

    useEffect(() => {
        growRef.current = 0; // Reset animation on data change
        targetGrow.current = 1;
    }, [data]);

    const draw = (ctx: CanvasRenderingContext2D) => {
        // Animate growth
        growRef.current = lerp(growRef.current, targetGrow.current, 0.05);

        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        const cx = w / 2;
        const cy = h / 2;
        const radius = Math.min(w, h) / 2 - 2;

        // Iterate over every pixel in the square canvas
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const dx = x - cx;
                const dy = y - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Check if pixel is inside circle (with hard edge, no antialias)
                if (dist < radius * growRef.current) {
                    // Calculate angle of this pixel
                    let angle = Math.atan2(dy, dx);
                    if (angle < 0) angle += Math.PI * 2;

                    // Determine which slice color
                    let currentAngle = 0;
                    let colorIndex = 0;

                    for (let i = 0; i < angles.length; i++) {
                        currentAngle += angles[i];
                        if (angle < currentAngle) {
                            colorIndex = i;
                            break;
                        }
                    }

                    ctx.fillStyle = PALETTE.colors[colorIndex % PALETTE.colors.length];
                    ctx.fillRect(x, y, 1, 1);
                }
            }
        }
    };

    return <PixelCanvas draw={draw} resolution={{ w: 32, h: 32 }} />;
};

/**
 * ActivityGrid (GitHub style but voxelized)
 */
export const ActivityGrid = () => {
    const draw = (ctx: CanvasRenderingContext2D, frame: number) => {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        const cols = 12;
        const rows = 5;
        const cellW = w / cols;
        const cellH = h / rows;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                // Procedural blinking/activity
                const noise = Math.sin(c * 0.5 + frame * 0.05) + Math.cos(r * 0.5);
                const isActive = noise > 0.5;
                const isHot = noise > 1.2;

                if (isActive) {
                    ctx.fillStyle = isHot ? PALETTE.colors[2] : '#334155';
                    ctx.fillRect(Math.floor(c * cellW), Math.floor(r * cellH), Math.floor(cellW) - 1, Math.floor(cellH) - 1);
                }
            }
        }
    };
    return <PixelCanvas draw={draw} resolution={{ w: 48, h: 20 }} />;
}
