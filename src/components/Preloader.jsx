import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        // Audio autoplay attempt
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch(e => console.log("Audio autoplay blocked", e));
        }

        // Progress timer (Faster: 10ms * 100 = 1000ms = 1 sec, or 20ms = 2 sec)
        // User asked "within 2 sec". 20ms is approx 2 seconds.
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            setTimeout(() => {
                onComplete();
            }, 500);
        }
    }, [progress, onComplete]);

    // Matrix Rain Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const columns = Math.floor(width / 20);
        const drops = Array(columns).fill(1);

        // Characters - mixed code-like symbols
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>?/[]{}!@#$%^&*()_+-=";

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "#00f5ff"; // Cyan text
            ctx.font = "15px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);

                // Reset drop randomly after it crosses screen
                if (drops[i] * 20 > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const matrixInterval = setInterval(draw, 33);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(matrixInterval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center text-white overflow-hidden"
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-30"
            />

            <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-cinematic-mystery-intro-2598.mp3" />

            <div className="z-10 flex flex-col items-center">
                <div className="text-6xl font-bold font-mono tracking-wider">
                    {progress}%
                </div>
                <div className="w-64 h-1 bg-gray-800 mt-4 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-cyan-400 box-shadow-[0_0_10px_#00f5ff]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
                <p className="mt-4 text-sm text-cyan-400/80 animate-pulse font-mono">Initializing System...</p>
            </div>
        </motion.div>
    );
};

export default Preloader;
