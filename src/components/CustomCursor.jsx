import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;

            // Move the small dot instantly
            gsap.to(cursor, {
                x: clientX,
                y: clientY,
                duration: 0,
            });

            // Move the glowing follower with delay for inertia
            gsap.to(follower, {
                x: clientX,
                y: clientY,
                duration: 0.1, // Tighter follow
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    return (
        <>
            {/* Main Cursor Dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            />
            {/* Glowing Follower */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-16 h-16 border border-cyan-400 rounded-full pointer-events-none z-[99] transform -translate-x-1/2 -translate-y-1/2 opacity-80 mix-blend-screen transition-transform duration-300"
                style={{
                    boxShadow: '0 0 30px 5px rgba(0, 245, 255, 0.5)',
                    background: 'radial-gradient(circle, rgba(0,245,255,0.2) 0%, transparent 70%)'
                }}
            />
        </>
    );
};

export default CustomCursor;
