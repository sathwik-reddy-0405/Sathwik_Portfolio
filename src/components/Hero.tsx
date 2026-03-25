import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    // Primary quick spring (head of the drop)
    const springX1 = useSpring(mouseX, { stiffness: 120, damping: 15, mass: 0.1 });
    const springY1 = useSpring(mouseY, { stiffness: 120, damping: 15, mass: 0.1 });

    // Secondary slightly delayed spring (middle of the drop)
    const springX2 = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.5 });
    const springY2 = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.5 });

    // Tertiary very delayed spring (tail of the drop)
    const springX3 = useSpring(mouseX, { stiffness: 40, damping: 25, mass: 1 });
    const springY3 = useSpring(mouseY, { stiffness: 40, damping: 25, mass: 1 });

    // Mask radii bounds
    const maskRadius1 = useSpring(isHovered ? (isMobile ? 200 : 450) : 0, { stiffness: 90, damping: 18 });
    const maskRadiusOuter1 = useTransform(maskRadius1, r => r + 150);

    const maskRadius2 = useSpring(isHovered ? (isMobile ? 160 : 380) : 0, { stiffness: 80, damping: 20 });
    const maskRadiusOuter2 = useTransform(maskRadius2, r => r + 120);

    const maskRadius3 = useSpring(isHovered ? (isMobile ? 120 : 300) : 0, { stiffness: 70, damping: 22 });
    const maskRadiusOuter3 = useTransform(maskRadius3, r => r + 90);

    // Composite overlapping radial gradients to create a fluid blob shape
    const maskImage = useMotionTemplate`radial-gradient(circle at ${springX1}px ${springY1}px, black ${maskRadius1}px, transparent ${maskRadiusOuter1}px), radial-gradient(circle at ${springX2}px ${springY2}px, black ${maskRadius2}px, transparent ${maskRadiusOuter2}px), radial-gradient(circle at ${springX3}px ${springY3}px, black ${maskRadius3}px, transparent ${maskRadiusOuter3}px)`;

    return (
        <section className="relative w-full h-[100dvh] bg-white overflow-hidden flex items-center justify-center">


            {/* Subtle Wavy/Grainy Grid Background for Edgy Feel */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* MASSIVE BACKGROUND TEXT LAYER (Animated) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 select-none overflow-hidden opacity-100">
                <motion.h1
                    animate={{ x: ["-10%", "10%", "-10%"] }}
                    transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                    className="text-[20vw] font-black uppercase tracking-tighter leading-[0.8] text-black font-serif w-[200vw] text-center"
                >
                    Sathwik
                </motion.h1>
                <motion.h1
                    animate={{ x: ["10%", "-10%", "10%"] }}
                    transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                    className="text-[20vw] font-black uppercase tracking-tighter leading-[0.8] text-black font-serif w-[200vw] text-center"
                >
                    Reddy.G
                </motion.h1>
            </div>

            {/* CENTER IMAGE - Full height interaction */}
            {/* Removed mix-blend-multiply so the image renders as a solid physical top-layer rather than letting dark text bleed through. */}
            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={{ y: "100%", x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 2.0 }}
                className="absolute bottom-0 left-1/2 z-10 w-full max-w-[90vw] sm:max-w-[500px] h-[65vh] sm:h-[85vh] cursor-crosshair"
            >
                {/* Base Image: Normal Max without Helmet */}
                {/* Using w-full h-auto forced bottom aligned so both images scale identically by width, ensuring eyes align perfect regardless of aspect ratio */}
                <img
                    src="/mylayer1_nobg.png"
                    alt="Layer 1 Base"
                    className="absolute bottom-0 left-0 w-full h-auto max-h-[120%] object-contain object-bottom transition-all duration-[2000ms]"
                    style={{ transform: "scale(2)", transformOrigin: "bottom center" }}
                />

                {/* Overlay Masked Image: Max With Helmet (Fluid mask movement only, no distortion) */}
                <motion.div
                    className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden"
                    style={{
                        WebkitMaskImage: maskImage,
                        maskImage: maskImage
                    }}
                >
                    <img
                        src="/mylayer2_nobg.png"
                        alt="Layer 2 Overlay"
                        className="absolute bottom-0 left-0 w-full h-auto max-h-[120%] object-contain object-bottom"
                        style={{ transform: "translateX(0%) translateY(0%) scale(2)", transformOrigin: "bottom center" }}
                    />
                </motion.div>


            </motion.div>

            {/* TOP BAR EXTRAS (Absolute corners for edgy feel) */}
            <div className="absolute top-[12vh] left-6 sm:top-[12vh] sm:left-12 z-20 hidden md:block mix-blend-difference text-white/80">
                <h2 className="font-bold tracking-[0.2em] uppercase text-xs">
                    Engineering
                </h2>
                <h2 className="font-medium tracking-[0.2em] uppercase text-xs mt-1 text-white/50">
                    Motorsports Enthusiast
                </h2>
                <div className="w-12 h-px bg-white/50 mt-4" />
            </div>

            {/* BOTTOM BAR EXTRAS (Absolute right corner as requested) */}
            <div className="absolute bottom-[5vh] right-12 text-right z-20 max-w-md hidden md:block mix-blend-difference text-white/90">
                <p className="text-lg leading-relaxed italic font-serif">
                    "Aspiring Mechanical Engineer, fueled by a passion for motorsports and precision systems."
                </p>
            </div>

            {/* MOBILE ONLY FALLBACK FOR UI */}
            <div className="absolute bottom-0 left-0 w-full md:hidden z-20 bg-gradient-to-t from-white via-white/90 to-transparent p-6 pt-24 pointer-events-auto flex flex-col gap-6">
                <div className="text-center">
                    <h2 className="text-black font-bold tracking-[0.2em] uppercase text-[10px] mb-2">
                        Engineering | Motorsports
                    </h2>
                    <p className="text-black/70 text-xs leading-relaxed italic font-serif px-4">
                        "Aspiring Mechanical Engineer, fueled by a passion for motorsports."
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex-1 py-4 bg-black text-white text-[10px] tracking-widest uppercase font-mono rounded-xl shadow-lg"
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex-1 py-4 bg-white border outline-none border-black/10 text-black text-[10px] tracking-widest uppercase font-mono rounded-xl shadow-lg"
                    >
                        Contact
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
