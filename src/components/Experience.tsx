import { motion } from 'framer-motion';

const experiences = [
    {
        title: "Vehicle Dynamics Lead",
        company: "Team Rudra",
        date: "2025 - Present",
        description: "Optimizing suspension geometry and damping characteristics for open-wheel race cars. Utilizing telemetry data to refine handling profiles."
    },
    {
        title: "Manufacturing Intern",
        company: "Manufacturing Intern",
        date: "July 2025 - Aug 2025",
        description: "Learned about manufacturing a Formula student race car which included manufacturing skills of CNC machining, Drilling , Welding ."
    },
    {
        title: "Design Intern",
        company: "1stop.ai",
        date: "Jan 2025 - Aug 2025",
        description: "learned about designing of various mechanical components using Catia and simulated them in Ansys."
    }
];

const Experience = () => {
    return (
        <section className="py-32 px-6 relative overflow-hidden bg-[#fafafa]">
            {/* Background Blueprint Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="flex flex-col items-center mb-20">
                    <span className="text-red-500 font-mono tracking-[0.4em] text-xs mb-4 uppercase">Track Record</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-black font-serif italic pr-2">
                        Engineering<span className="text-red-600">.</span>Journey
                    </h2>
                </div>

                <div className="relative ml-4 md:ml-10">
                    {/* Main Timeline Axis */}
                    <motion.div
                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-black/20"
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    />
                    {/* Animated Red Progress Line */}
                    <motion.div
                        className="absolute left-0 top-0 w-[2px] bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        transition={{ duration: 2, ease: "circOut", delay: 0.5 }}
                        viewport={{ once: true }}
                    />

                    <div className="space-y-20 py-10">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                transition={{ delay: index * 0.2 + 0.3, duration: 0.7, ease: "easeOut" }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="relative pl-12 md:pl-20 group"
                            >
                                {/* Mechanical Node Marker */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -90 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: index * 0.3 + 0.5, type: "spring", stiffness: 200 }}
                                    className="absolute -left-[7px] top-6 w-4 h-4 rounded-none bg-white border-2 border-red-600 z-10 flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300"
                                >
                                    <div className="w-1 h-1 bg-black rounded-full" />
                                </motion.div>

                                {/* Connector Line (Horizontal) */}
                                <div className="absolute top-8 left-0 w-12 md:w-20 h-[1px] bg-gradient-to-r from-red-600/50 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                                {/* Content Card */}
                                <div className="p-8 border border-black/10 group-hover:border-red-600/30 transition-all duration-300 bg-white shadow-[8px_8px_0px_rgba(0,0,0,0.05)] group-hover:shadow-[8px_8px_0px_rgba(220,38,38,0.2)] group-hover:-translate-y-1 group-hover:-translate-x-1">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-black/5 pb-4">
                                        <h3 className="text-2xl font-bold text-black font-serif tracking-tight">{exp.title}</h3>
                                        <span className="inline-block px-3 py-1 bg-gray-100 group-hover:bg-red-600 group-hover:text-white transition-colors text-[10px] font-mono tracking-[0.2em] mt-3 md:mt-0 uppercase">
                                            {exp.date}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-[1px] w-6 bg-red-600/50" />
                                        <div className="text-xs font-mono text-black/40 uppercase tracking-[0.3em] font-bold group-hover:text-red-500 transition-colors">
                                            {exp.company}
                                        </div>
                                    </div>
                                    <p className="text-black/80 leading-loose font-serif text-lg">
                                        {exp.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
