import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
    {
        title: "Design Intern",
        company: "1stop.ai",
        date: "Jan 2025",
        description: "Learned about designing of various mechanical components using Catia and simulated them in Ansys.",
        x: 20,
        y: 70,
        valX: "Early '25",
        valY: "Level 1"
    },
    {
        title: "Manufacturing Intern",
        company: "Arc Global",
        date: "July 2025",
        description: "Manufacturing skills of CNC machining, Drilling, Welding for a Formula student car.",
        x: 50,
        y: 45,
        valX: "Mid '25",
        valY: "Level 2"
    },
    {
        title: "Vehicle Dynamics Lead",
        company: "Team Rudra",
        date: "Present",
        description: "Optimizing suspension geometry and damping characteristics for open-wheel race cars using telemetry data.",
        x: 85,
        y: 15,
        valX: "Late '25",
        valY: "Level 3"
    }
];

// Helper component for each node to correctly use hooks
const GraphNode = ({ exp, scaledProgress }: { exp: typeof experiences[0], scaledProgress: any }) => {
    const threshold = exp.x / 100;
    const opacity = useTransform(scaledProgress, [Math.max(0, threshold - 0.05), threshold], [0, 1]);
    const scale = useTransform(scaledProgress, [Math.max(0, threshold - 0.05), threshold], [0.8, 1]);
    const yOffset = useTransform(scaledProgress, [Math.max(0, threshold - 0.05), threshold], [20, 0]);

    // Format positioning to pop above or below
    const isHigh = exp.y < 30; // If near top of graph, pop below the node

    return (
        <motion.div
            className="absolute z-10 flex flex-col items-center"
            style={{
                left: `${exp.x}%`,
                top: `${exp.y}%`,
                x: "-50%",
                y: "-50%"
            }}
        >
            {/* The Dot (Appears earlier, when scrolled into view) */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-600 border-4 border-red-200 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
            />

            {/* Interactive Tooltip / Card (Driven by scroll) */}
            <motion.div 
                style={{ opacity, scale, y: yOffset }}
                className={`absolute ${isHigh ? 'top-8 md:top-10 origin-top' : 'bottom-8 md:bottom-10 origin-bottom'} w-48 md:w-64 z-20 pointer-events-none`}
            >
                <div className="bg-white border border-black shadow-[4px_4px_0px_#000] p-4 relative pointer-events-auto">
                    {/* Directional Triangle */}
                    <div className={`absolute ${isHigh ? '-top-[5px]' : '-bottom-[5px] border-b border-r'} left-1/2 -translate-x-1/2 w-2 h-2 bg-white ${isHigh ? 'border-t border-l' : ''} border-black rotate-45`} />
                    
                    <div className="flex justify-between items-center mb-2 border-b border-black/10 pb-2 gap-2">
                        <span className="text-[10px] sm:text-[10px] font-bold uppercase tracking-widest text-red-600 truncate">{exp.valX}</span>
                        <span className="text-[8px] sm:text-[10px] bg-black text-white px-2 py-0.5 truncate">{exp.company}</span>
                    </div>
                    <h3 className="font-serif font-bold text-sm md:text-base leading-tight mb-2">{exp.title}</h3>
                    <p className="text-xs text-black/70 leading-relaxed">
                        {exp.description}
                    </p>
                </div>
            </motion.div>
            
            {/* X-Axis label anchor */}
            <motion.div 
                style={{ opacity }}
                className="absolute top-[100%] translate-y-[15px] whitespace-nowrap text-xs text-black/40 uppercase font-bold"
            >
                {exp.date}
            </motion.div>
        </motion.div>
    );
};

const Experience = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<HTMLDivElement>(null);
    
    // Track the actual graph element instead of the entire section padding
    const { scrollYProgress } = useScroll({
        target: graphRef,
        offset: ["start 60%", "start 10%"]
    });

    const scaledProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const pathLength = useSpring(scaledProgress, {
        stiffness: 70,
        damping: 20,
        restDelta: 0.001
    });

    const graphPath = `M 10 90 L 20 70 L 50 45 L 85 15 L 95 10`;

    return (
        <section className="py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden hidden-scrollbar" ref={sectionRef}>
            {/* Background Graphic Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10 font-mono">
                <div className="flex flex-col items-center mb-16 md:mb-24">
                    <span className="text-red-500 font-mono tracking-[0.2em] sm:tracking-[0.4em] text-[10px] sm:text-xs mb-4 uppercase">Track Record</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-black font-serif italic pr-1 sm:pr-2">
                        Engineering<span className="text-red-600">.</span>Graph
                    </h2>
                </div>

                <div className="relative w-full h-[600px] md:h-[700px] bg-transparent border-0 md:bg-white md:border md:border-black/10 md:shadow-lg p-0 sm:p-4 md:p-12 overflow-x-auto overflow-y-hidden hide-scrollbar">
                    {/* Graph Container (Min Width to force scroll on small screens) */}
                    <div className="relative w-[800px] md:w-full h-[500px] mt-10 md:mt-0" ref={graphRef}>
                        
                        {/* Axes */}
                        <div className="absolute left-10 bottom-10 top-10 w-[2px] bg-black">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-[12px] border-b-black" />
                            {/* Y Axis Labels */}
                            <div className="absolute top-[15%] left-[-35px] text-[10px] md:text-xs font-bold text-black/40">L3</div>
                            <div className="absolute top-[45%] left-[-35px] text-[10px] md:text-xs font-bold text-black/40">L2</div>
                            <div className="absolute top-[70%] left-[-35px] text-[10px] md:text-xs font-bold text-black/40">L1</div>
                        </div>
                        <div className="absolute left-10 right-10 bottom-10 h-[2px] bg-black">
                            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-[12px] border-l-black" />
                        </div>

                        {/* Grid lines inside graph */}
                        <div className="absolute left-10 right-10 top-10 bottom-10 pointer-events-none opacity-20">
                            {[15, 45, 70].map(y => (
                                <div key={y} className="absolute left-0 right-0 h-px bg-black border-dashed border-b border-black" style={{ top: `${y}%` }} />
                            ))}
                            {[20, 50, 85].map(x => (
                                <div key={x} className="absolute top-0 bottom-0 w-px bg-black border-dashed border-r border-black" style={{ left: `${x}%` }} />
                            ))}
                        </div>

                        {/* SVG Drawing Layer */}
                        <div className="absolute inset-0 z-0">
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                {/* Base faded path */}
                                <path
                                    d={graphPath}
                                    fill="none"
                                    stroke="rgba(0,0,0,0.1)"
                                    strokeWidth="0.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {/* Animated red path */}
                                <motion.path
                                    d={graphPath}
                                    fill="none"
                                    stroke="#DC2626"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{ pathLength }}
                                />
                            </svg>
                        </div>

                        {/* Data Points (Experiences) mapped individually */}
                        {experiences.map((exp, index) => (
                            <GraphNode key={index} exp={exp} scaledProgress={scaledProgress} />
                        ))}

                        {/* Persistent X Axis Labels */}
                        {experiences.map((exp, index) => (
                            <div 
                                key={`label-${index}`}
                                className="absolute bottom-4 -translate-x-1/2 text-[10px] md:text-xs font-bold text-black/60 uppercase"
                                style={{ left: `${exp.x}%` }}
                            >
                                {exp.valX}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
