import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const HackerBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/`~";
        const fontSize = 14;
        const columns = Math.ceil(canvas.width / fontSize);
        const drops = Array(columns).fill(1).map(() => Math.random() * -100); // Start above screen randomly

        const snippets = [
            "const ai = new AI();",
            "import React from 'react';",
            "console.log('Hello World');",
            "def train_model(data):",
            "if (error) throw new Error();",
            "while(alive) { learn(); }",
            "await new Promise(r => setTimeout(r, 1000));",
            "git commit -m 'Initial commit'",
            "npm install universe",
            "sudo rm -rf / --no-preserve-root", // Just kidding, maybe not this one :P
            "vector<string> knowledge;",
            "x = tf.placeholder(tf.float32)",
        ];

        // Floating snippets logic
        const floatingSnippets = [];
        const createSnippet = () => {
            return {
                text: snippets[Math.floor(Math.random() * snippets.length)],
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1.5, // Horizontal movement
                vy: (Math.random() - 0.5) * 1.5, // Vertical movement
                opacity: 0,
                life: 0,
                maxLife: 200 + Math.random() * 100,
                fadeIn: true,
            };
        };

        for (let i = 0; i < 5; i++) {
            floatingSnippets.push(createSnippet());
        }


        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Matrix Rain
            ctx.fillStyle = "#0F0"; // Green text, traditional matrix
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Randomly pick a character
                const text = characters.charAt(Math.floor(Math.random() * characters.length));

                // Vary colors slightly: mainly green/cyan
                const isCyan = Math.random() > 0.95;
                ctx.fillStyle = isCyan ? "#00f5ff" : "#0F0";

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            // Draw Floating Snippets
            ctx.font = "16px 'Courier New', monospace";
            floatingSnippets.forEach((snippet, index) => {
                // Update lifecycle
                if (snippet.fadeIn) {
                    snippet.opacity += 0.01;
                    if (snippet.opacity >= 1) snippet.fadeIn = false;
                } else {
                    snippet.life++;
                    if (snippet.life > snippet.maxLife - 50) { // Start fading out at end of life
                        snippet.opacity -= 0.02;
                    }
                }

                // Move
                snippet.x += snippet.vx;
                snippet.y += snippet.vy;

                // Wrap around screen
                if (snippet.x < 0) snippet.x = canvas.width;
                if (snippet.x > canvas.width) snippet.x = 0;
                if (snippet.y < 0) snippet.y = canvas.height;
                if (snippet.y > canvas.height) snippet.y = 0;

                // Render
                ctx.fillStyle = `rgba(0, 245, 255, ${Math.max(0, snippet.opacity)})`; // Cyan glow
                ctx.fillText(snippet.text, snippet.x, snippet.y);

                // Reset if dead
                if (snippet.opacity <= 0 && !snippet.fadeIn) {
                    floatingSnippets[index] = createSnippet();
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-0 bg-black pointer-events-none"
        />
    );
};

const Intro = ({ onComplete }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [typedText, setTypedText] = useState("");
    const fullText = "Welcome to the World of Mano Teja Reddy";

    useEffect(() => {
        // Typing animation for the main text
        let index = 0;
        const interval = setInterval(() => {
            if (index <= fullText.length) {
                setTypedText(fullText.substring(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 30); // Adjust speed here

        return () => clearInterval(interval);
    }, []);

    const handleEnter = () => {
        // Audio Effect (Optional)
        const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-click-900.mp3"); // Example sound
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio play failed", e));

        // Glitch and Fade Out Animation using GSAP
        const tl = gsap.timeline({
            onComplete: onComplete,
        });

        // 1. Glitch Effect (Distortion)
        tl.to(containerRef.current, {
            duration: 0.2,
            skewX: 20,
            skewY: 5,
            filter: "invert(1) hue-rotate(180deg)",
            ease: "power4.inOut",
        })
            .to(containerRef.current, {
                duration: 0.1,
                skewX: -20,
                skewY: -5,
                filter: "blur(5px)",
                opacity: 0.8,
            })
            .to(containerRef.current, {
                duration: 0.1,
                x: 10,
                y: -10,
                opacity: 0.5,
            })
            // 2. Collapse/Fade Out
            .to(containerRef.current, {
                duration: 0.5,
                scale: 0.1, // Zoom out effect (or in depending on preference) or just dissolve
                opacity: 0,
                filter: "blur(20px)",
                ease: "power2.in",
            });
    };

    useEffect(() => {
        const handleKeyDown = () => handleEnter();
        // Mobile tap handler included in the div onClick
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-screen bg-black z-50 flex flex-col justify-center items-center overflow-hidden cursor-pointer"
            onClick={handleEnter} // Tap anywhere
        >
            <HackerBackground />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none"></div>

            {/* Main Glass Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 p-10 md:p-14 bg-opacity-10 bg-white backdrop-blur-lg rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,245,255,0.3)] text-center max-w-4xl mx-4"
            >
                <h1 className="text-4xl md:text-6xl font-bold font-mono tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] mb-6 min-h-[4rem]">
                    {typedText}
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="text-cyan-400 inline-block w-2 h-10 align-middle ml-2 bg-cyan-400"
                    />
                </h1>
            </motion.div>

            {/* Skip Instruction */}
            <motion.div
                className="absolute bottom-10 flex items-center gap-2 text-gray-400 font-mono text-sm md:text-base pointer-events-none"
                animate={{ y: [0, -10, 0] }} // Floating animation
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse box-shadow-[0_0_10px_#00f5ff]"></span>
                <span className="tracking-widest uppercase">Press Any Key to Enter</span>
            </motion.div>

        </div>
    );
};

export default Intro;
