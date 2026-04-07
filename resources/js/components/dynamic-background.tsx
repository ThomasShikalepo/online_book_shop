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
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-slate-50 transition-colors duration-700" />

            {/* Animated Shapes */}
            <motion.div
                className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl"
                style={{
                    x: useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-20, 20]),
                    y: useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-20, 20]),
                    translateY: y1,
                }}
            />

            <motion.div
                className="absolute top-1/4 -right-24 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"
                style={{
                    x: useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [20, -20]),
                    y: useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [20, -20]),
                    translateY: y2,
                    rotate,
                }}
            />

            <motion.div
                className="absolute bottom-[-10%] left-1/3 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-[100px]"
                style={{
                    x: useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-30, 30]),
                    y: useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-30, 30]),
                }}
            />

            {/* Subtle Grid Pattern */}
            <div 
                className="absolute inset-0 opacity-[0.15]" 
                style={{ 
                    backgroundImage: `radial-gradient(#0d0842 0.5px, transparent 0.5px)`, 
                    backgroundSize: '24px 24px' 
                }} 
            />

            {/* Glassmorphism Overlay */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
        </div>
    );
}
