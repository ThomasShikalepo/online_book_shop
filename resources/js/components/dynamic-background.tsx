'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export function DynamicBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { scrollYProgress } = useScroll();

    // Smooth spring physics for mouse movement
    const springConfig = { damping: 25, stiffness: 100 };
    const mouseX = useSpring(0, springConfig);
    const mouseY = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Parallax effects based on scroll
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#020617]">
            {/* Base Deep Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#0f172a] to-[#020617] opacity-100" />

            {/* Neon Glowing Shapes (Cosmic Atmosphere) */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]"
                style={{
                    x: useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-40, 40]),
                    y: useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-40, 40]),
                    translateY: y1,
                }}
            />

            <motion.div
                className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]"
                style={{
                    x: useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [30, -30]),
                    y: useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [30, -30]),
                    translateY: y2,
                    rotate,
                }}
            />

            <motion.div
                className="absolute bottom-[-20%] left-1/4 w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-[180px]"
                style={{
                    x: useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-50, 50]),
                    y: useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-50, 50]),
                }}
            />

            {/* Star-like subtle pattern */}
            <div 
                className="absolute inset-0 opacity-[0.2]" 
                style={{ 
                    backgroundImage: `radial-gradient(circle, white 0.5px, transparent 0.5px)`, 
                    backgroundSize: '40px 40px' 
                }} 
            />

            {/* Final Glass Overlay */}
            <div className="absolute inset-0 backdrop-blur-[1px] bg-black/10" />
        </div>
    );
}
