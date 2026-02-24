import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const MechanicalBackground = () => {
    const { scrollYProgress } = useScroll();

    // Smooth scroll progress to eliminate jarring start/stop motions
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25, restDelta: 0.001 });

    // Independent rotations so they don't look identically animated
    const rotSpeed1 = useTransform(smoothProgress, [0, 1], [0, 360]); // Slow clockwise
    const rotSpeed2 = useTransform(smoothProgress, [0, 1], [0, -450]); // Medium counter-clockwise
    const rotSpeed3 = useTransform(smoothProgress, [0, 1], [0, 600]); // Fast clockwise
    const rotSpeed4 = useTransform(smoothProgress, [0, 1], [0, -200]); // Very slow counter-clockwise

    // Independent smooth drifts prioritizing pushing gears outward so they don't clutter the center text
    const yDrift1 = useTransform(smoothProgress, [0, 1], [0, 600]);
    const yDrift2 = useTransform(smoothProgress, [0, 1], [0, -700]);
    const yDrift3 = useTransform(smoothProgress, [0, 1], [0, 1000]);
    const yDrift4 = useTransform(smoothProgress, [0, 1], [0, -400]);

    return (
        <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden opacity-30">
            {/* Top Section - Large prominent gears */}
            <motion.div className="absolute top-[8%] -left-48 md:-left-20 w-80 h-80 opacity-[0.35] mix-blend-multiply drop-shadow-xl" style={{ rotate: rotSpeed1, y: yDrift1 }}>
                <img src="/gearimage2.png" alt="Gear bg element" className="w-full h-full object-contain" />
            </motion.div>
            <motion.div className="absolute top-[18%] -right-32 w-64 h-64 opacity-[0.25] mix-blend-multiply" style={{ y: yDrift2, rotate: rotSpeed2 }}>
                <img src="/gearimage2.png" alt="Gear bg element" className="w-full h-full object-contain" />
            </motion.div>

            {/* Upper Middle Section - Pushed far to edges */}
            <motion.div className="absolute top-[35%] -left-16 w-32 h-32 opacity-20 mix-blend-multiply" style={{ rotate: rotSpeed3, y: yDrift3 }}>
                <img src="/gearimage2.png" alt="Gear bg element" className="w-full h-full object-contain" />
            </motion.div>
            <motion.div className="absolute top-[42%] -right-20 w-56 h-56 opacity-[0.3] mix-blend-multiply drop-shadow-md" style={{ rotate: rotSpeed4, y: yDrift4 }}>
                <img src="/gearimage2.png" alt="Gear bg element" className="w-full h-full object-contain" />
            </motion.div>

            {/* Deep Middle Section - Larger behind experience but very faded */}
            <motion.div className="absolute top-[60%] -left-40 w-96 h-96 opacity-[0.15] mix-blend-multiply blur-[2px]" style={{ rotate: rotSpeed2, y: yDrift1 }}>
                <img src="/gearimage2.png" alt="Gear bg element" className="w-full h-full object-contain" />
            </motion.div>
            <motion.div className="absolute top-[70%] -right-12 w-48 h-48 opacity-[0.25] mix-blend-multiply" style={{ rotate: rotSpeed1, y: yDrift3 }}>
                <img src="/gearimage2.png" alt="Gear bg element" className="w-full h-full object-contain" />
            </motion.div>

            {/* Lower Middle Section */}
            <motion.div className="absolute top-[82%] -left-20 w-[260px] h-[260px] opacity-[0.35] mix-blend-multiply drop-shadow-xl" style={{ rotate: rotSpeed3, y: yDrift4 }}>
                <img src="/gearimage2.png" alt="Gear bg element" className="w-full h-full object-contain" />
            </motion.div>
            <motion.div className="absolute top-[88%] -right-24 w-72 h-72 opacity-[0.15] mix-blend-multiply blur-[3px]" style={{ rotate: rotSpeed4, y: yDrift2 }}>
                <img src="/gearimage2.png" alt="Gear bg element" className="w-full h-full object-contain" />
            </motion.div>

            {/* Bottom Footer Section */}
            <motion.div className="absolute top-[96%] left-[10%] w-32 h-32 opacity-20 mix-blend-multiply" style={{ rotate: rotSpeed1, y: yDrift3 }}>
                <img src="/gearimage2.png" alt="Gear bg element" className="w-full h-full object-contain" />
            </motion.div>
        </div>
    );
};

export default MechanicalBackground;
