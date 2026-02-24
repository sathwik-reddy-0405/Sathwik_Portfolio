import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useAnimationFrame, useTransform } from 'framer-motion';

interface CustomCursorProps {
    isIntro?: boolean;
}

const CustomCursor = ({ isIntro = false }: CustomCursorProps) => {
    // Initial position center screen
    const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
    const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

    // Snappier spring physics so it doesn't drag too far behind on fast flicks
    const carX = useSpring(mouseX, { stiffness: 1000, damping: 40, mass: 0.4 });
    const carY = useSpring(mouseY, { stiffness: 1000, damping: 40, mass: 0.4 });

    // Rotation value that we manually calculate and update
    const rotation = useMotionValue(0);

    // Scale from 0 to 1 representing how fast the car is moving
    const speedScale = useMotionValue(0);

    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            setIsVisible(true);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsVisible(false);
            }, 2000);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over interactive elements
            if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        // Start initial timeout
        timeoutId = setTimeout(() => setIsVisible(false), 2000);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            clearTimeout(timeoutId);
        };
    }, [mouseX, mouseY]);

    useAnimationFrame(() => {
        // Find distance between the physics body (car) and the raw target (cursor)
        const dx = mouseX.get() - carX.get();
        const dy = mouseY.get() - carY.get();

        // Calculate the raw distance of the cursor relative to the car (acts as speed)
        const speed = Math.sqrt(dx * dx + dy * dy);

        if (speed > 1.5) {
            // Calculate target angle based on direction of movement
            const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
            const currentAngle = rotation.get();

            // Find the shortest path to rotate, robustly handling JS negative modulos
            const diff = targetAngle - currentAngle;
            let delta = ((diff % 360) + 540) % 360 - 180;

            // Drift logic: fast speeds turn slower (preventing twitchy spins), slow speeds turn fast
            const lerpFactor = Math.max(0.1, 0.8 - (speed * 0.006));

            rotation.set(currentAngle + delta * lerpFactor);

            // Map speed to 0-1 for wind effects (capping at 1)
            speedScale.set(Math.min(speed / 80, 1));
        } else {
            // Decay speed effect smoothly when stopped
            speedScale.set(speedScale.get() * 0.85);
        }
    });

    // Transforms for the air/wind effect based on speed
    const windScaleX = useTransform(speedScale, [0, 1], [0.2, 2.5]);
    const windOpacity = useTransform(speedScale, [0, 1], [0, 1]);

    // Spring the hover scale so it doesn't snap abruptly
    const hoverScale = useSpring(isHovering ? 1.4 : 1, { stiffness: 300, damping: 20 });

    return (
        <motion.div
            className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ opacity: { duration: 0.5, ease: "easeInOut" } }}
            style={{
                x: carX,
                y: carY,
                translateX: '-50%',
                translateY: '-50%',
                rotate: rotation,
                scale: hoverScale,
            }}
        >
            {/* Dynamic Red Glow beneath the car when hovering over elements */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-[120px] h-[120px] -translate-x-1/2 -translate-y-1/2 bg-red-600/60 rounded-full blur-[30px] pointer-events-none z-0"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                    opacity: isIntro ? 1 : 0,
                    scale: isIntro ? 1.5 : 0.5
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            />

            {/* The Drifting F1 Car visual (Red facing Right at 0 degrees) */}
            <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[36px] h-[14px] drop-shadow-[0_2px_8px_rgba(239,68,68,0.5)] z-10 relative">
                {/* Front Wing */}
                <path d="M85 8 L95 12 L95 28 L85 32 Z" fill="#111" />
                <rect x="88" y="10" width="4" height="20" rx="1" fill="#ef4444" />

                {/* Front Suspension */}
                <line x1="60" y1="18" x2="80" y2="6" stroke="#444" strokeWidth="1.5" />
                <line x1="60" y1="22" x2="80" y2="34" stroke="#444" strokeWidth="1.5" />

                {/* Front Wheels */}
                <rect x="75" y="2" width="12" height="6" rx="2" fill="#111" />
                <rect x="75" y="32" width="12" height="6" rx="2" fill="#111" />

                {/* Rear Suspension */}
                <line x1="25" y1="18" x2="16" y2="6" stroke="#444" strokeWidth="1.5" />
                <line x1="25" y1="22" x2="16" y2="34" stroke="#444" strokeWidth="1.5" />

                {/* Rear Wheels/Tires (thicker) */}
                <rect x="10" y="0" width="16" height="8" rx="2" fill="#111" />
                <rect x="10" y="32" width="16" height="8" rx="2" fill="#111" />

                {/* Floor / Underbody */}
                <path d="M20 12 L65 14 L65 26 L20 28 Z" fill="#222" />

                {/* Main Chassis / Nose */}
                <path d="M15 17 L88 18 L88 22 L15 23 Z" fill="#ef4444" />

                {/* Sidepods */}
                <path d="M35 12 L60 12 L55 16 L35 16 Z" fill="#dc2626" />
                <path d="M35 28 L60 28 L55 24 L35 24 Z" fill="#dc2626" />
                <path d="M30 14 L62 14 L62 26 L30 26 Z" fill="#ef4444" />

                {/* Cockpit */}
                <ellipse cx="45" cy="20" rx="5" ry="3.5" fill="#000" />
                <ellipse cx="43" cy="20" rx="3" ry="2" fill="#fff" /> {/* Driver helmet */}

                {/* Rear Wing */}
                <rect x="2" y="6" width="8" height="28" rx="1.5" fill="#111" />
                <rect x="4" y="8" width="4" height="24" rx="1" fill="#ef4444" />
            </svg>

            {/* Air / Wind effects trailing behind the car */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
                {/* Main thick trail */}
                <motion.div
                    className="absolute top-1/2 -left-4 w-10 h-[2px] bg-gradient-to-r from-transparent via-[#ef4444]/60 to-[#dc2626]/90 -translate-y-1/2 origin-right blur-[1px] rounded-full"
                    style={{ scaleX: windScaleX, opacity: windOpacity }}
                />

                {/* Top thin air stream */}
                <motion.div
                    className="absolute top-1/3 -left-6 w-12 h-[1px] bg-gradient-to-r from-transparent to-[#ef4444]/50 -translate-y-1/2 origin-right blur-[0.5px]"
                    style={{ scaleX: windScaleX, opacity: windOpacity }}
                />

                {/* Bottom thin air stream */}
                <motion.div
                    className="absolute top-2/3 -left-6 w-12 h-[1px] bg-gradient-to-r from-transparent to-[#ef4444]/50 -translate-y-1/2 origin-right blur-[0.5px]"
                    style={{ scaleX: windScaleX, opacity: windOpacity }}
                />

                {/* Subtle base shadow to blend underneath */}
                <motion.div
                    className="absolute top-1/2 right-[40%] w-6 h-4 bg-orange-500/40 -translate-y-1/2 origin-center blur-[3px] rounded-full"
                    style={{ scale: speedScale, opacity: windOpacity }}
                />
            </div>
        </motion.div>
    );
};

export default CustomCursor;
