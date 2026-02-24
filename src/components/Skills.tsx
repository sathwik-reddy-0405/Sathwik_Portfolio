import React, { useRef, useState, memo, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

const skills = [
    { name: 'SolidWorks', angle: 0 },
    { name: 'MATLAB', angle: 51.4 },
    { name: 'CATIA', angle: 102.8 },
    { name: 'ANSYS', angle: 154.2 },
    { name: 'AutoCAD', angle: 205.6 },
    { name: 'Simulink', angle: 257.0 },
    { name: 'Manufacturing', angle: 308.4 },
];

const SkillNode = ({ skill, index, scrollYProgress, mousePos }: {
    skill: typeof skills[0];
    index: number;
    scrollYProgress: MotionValue<number>;
    mousePos: { x: number; y: number };
}) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    // Emergence Threshold: Full deployment by 50% (0.5) scroll
    const startThreshold = 0.05 + (index * 0.02);
    const endThreshold = 0.5;

    const currentRadius = useTransform(scrollYProgress, [startThreshold, endThreshold], [0, 280]);
    const rotationOffset = useTransform(scrollYProgress, [0, 0.5], [0, 360]);
    const opacity = useTransform(scrollYProgress, [startThreshold, startThreshold + 0.1], [0, 1]);
    const scale = useTransform(scrollYProgress, [startThreshold, startThreshold + 0.15], [0.5, 1]);

    const x = useTransform([rotationOffset, currentRadius], ([rot, rad]) => {
        const radian = ((skill.angle + (rot as number)) * Math.PI) / 180;
        return Math.cos(radian) * (rad as number);
    });

    const y = useTransform([rotationOffset, currentRadius], ([rot, rad]) => {
        const radian = ((skill.angle + (rot as number)) * Math.PI) / 180;
        return Math.sin(radian) * (rad as number);
    });

    // Magnetic & Tilt logic (Additive cursor effect)
    const springConfig = { stiffness: 80, damping: 20 };
    const magneticX = useSpring(0, springConfig);
    const magneticY = useSpring(0, springConfig);
    const nodeRotateX = useSpring(0, springConfig);
    const nodeRotateY = useSpring(0, springConfig);

    useEffect(() => {
        if (!nodeRef.current) return;
        const rect = nodeRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = mousePos.x - centerX;
        const dy = mousePos.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
            const power = (200 - dist) / 200;
            magneticX.set(dx * 0.12 * power);
            magneticY.set(dy * 0.12 * power);
            nodeRotateX.set(-dy * 0.15 * power);
            nodeRotateY.set(dx * 0.15 * power);
        } else {
            magneticX.set(0);
            magneticY.set(0);
            nodeRotateX.set(0);
            nodeRotateY.set(0);
        }
    }, [mousePos, magneticX, magneticY, nodeRotateX, nodeRotateY]);

    const rotation = useTransform(scrollYProgress, [startThreshold, endThreshold], [-180, 0]);

    return (
        <motion.div
            ref={nodeRef}
            style={{
                x,
                y,
                translateX: magneticX,
                translateY: magneticY,
                rotateX: nodeRotateX,
                rotateY: nodeRotateY,
                rotateZ: rotation,
                opacity,
                scale,
                perspective: 1000
            }}
            className="absolute z-20 flex flex-col items-center"
        >
            {/* Skill Module Card with Premium Minimalist Design */}
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                whileHover={{
                    scale: 1.08,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.25)", // Deep shadow
                    borderColor: "#000000" // Solid Black Border
                }}
                style={{
                    border: "3px solid rgba(0,0,0,0.9)", // Thicker and stronger border opacity perception
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
                }}
                className="group relative bg-white backdrop-blur-3xl px-9 py-5 rounded-[20px] transition-all duration-500 flex items-center justify-center overflow-hidden cursor-pointer"
            >
                {/* Advanced Hover Fill and Micro-animations */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <span className="relative z-10 text-black group-hover:text-white font-bold tracking-[0.2em] uppercase text-xs md:text-sm font-dot text-center transition-colors duration-500 drop-shadow-sm">
                    {skill.name}
                </span>
            </motion.div>
        </motion.div>
    );
};

const MechanicalGear = ({ progress }: { progress: MotionValue<number> }) => {
    // Heavy torque rotation: 0 -> 360 deg by 50% scroll
    const rotation = useTransform(progress, [0, 0.5], [0, 360]);
    const rotationSpring = useSpring(rotation, { stiffness: 45, damping: 25 });

    return (
        <div className="relative flex items-center justify-center">
            <motion.div
                style={{
                    rotate: rotationSpring,
                    perspective: 1500
                }}
                className="relative z-30 flex items-center justify-center"
            >
                <motion.img
                    src="/gear.png"
                    alt="Mechanical Core"
                    className="w-60 h-60 md:w-[320px] md:h-[320px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] pointer-events-none opacity-100"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/40 bg-white/20 backdrop-blur-2xl flex flex-col items-center justify-center shadow-2xl">
                        <h2 className="text-sm md:text-base font-medium tracking-[0.5em] text-black font-dot uppercase leading-none mb-1">
                            Skills
                        </h2>
                        <div className="w-12 h-[1px] bg-black/10 mt-2" />
                    </div>
                </div>
            </motion.div>
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.6)_0%,transparent_70%)] pointer-events-none -z-10" />
        </div>
    );
};

const Skills = () => {
    const containerRef = useRef<HTMLElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-[250vh] bg-[#f8f6f1] overflow-hidden flex items-center justify-center py-0"
            id="skills"
        >
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <motion.div
                style={{
                    x: (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.02,
                    y: (mousePos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * 0.02,
                }}
                className="absolute inset-0 pointer-events-none"
            />

            <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none">
                <div className="relative flex items-center justify-center w-full max-max-7xl h-full pointer-events-auto">
                    <MechanicalGear progress={scrollYProgress} />

                    {skills.map((skill, i) => (
                        <SkillNode
                            key={skill.name}
                            skill={skill}
                            index={i}
                            scrollYProgress={scrollYProgress}
                            mousePos={mousePos}
                        />
                    ))}
                </div>
            </div>

            <div className="absolute bottom-20 left-12 font-mono text-[10px] text-black/20 tracking-[1.2rem] uppercase vertical-text font-black">
            </div>
        </section>
    );
};

export default memo(Skills);
