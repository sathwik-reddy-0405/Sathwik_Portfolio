import { motion } from 'framer-motion';


const stats = [
    { label: 'CGPA', value: '7.4' },
    { label: 'Projects', value: '4+' },
    { label: 'Focus', value: 'Dynamics & CAD' },
];

const About = () => {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
            {/* Minimal Background Markers */}
            <div className="absolute top-0 left-0 w-px h-full bg-black/5" />
            <div className="absolute top-0 right-0 w-px h-full bg-black/5" />

            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative p-10 md:p-20 bg-white border border-black/10 shadow-[20px_20px_0px_rgba(0,0,0,0.03)] overflow-hidden"
                >
                    {/* Background Blueprint Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

                    <div className="relative z-10">
                        <div className="text-center mb-16">
                            <span className="text-black/40 font-mono tracking-[0.4em] text-xs mb-4 uppercase inline-block">Core Specifications</span>
                            <br />
                            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-black inline-block relative font-serif tracking-tight pr-2">
                                Technical<span className="opacity-40">.</span>Foundation
                            </h2>
                            <p className="text-black/60 text-lg md:text-xl leading-loose max-w-4xl mx-auto font-light italic mt-6">
                                I am an <span className="text-black font-medium">Aspiring Mechanical Engineer</span> with a passion for <span className="text-black font-medium">Motorsports</span> and <span className="text-black font-medium">Robotics</span>.
                                My focus lies in designing efficient mechanical systems, analyzing thermodynamic cycles, and implementing advanced control algorithms.
                                I thrive at the intersection of physical engineering and computational design.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: index * 0.15 + 0.3, duration: 0.8, type: "spring", bounce: 0.3 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8 }}
                                    className="relative p-8 md:p-10 rounded-none bg-gray-50 border border-black/10 hover:border-black transition-colors duration-500 group shadow-sm hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] hover:bg-white overflow-hidden"
                                >
                                    {/* Decorative Crosshairs / Accents */}
                                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-transparent group-hover:border-black transition-colors duration-500" />
                                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-transparent group-hover:border-black transition-colors duration-500" />
                                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-transparent group-hover:border-black transition-colors duration-500" />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-transparent group-hover:border-black transition-colors duration-500" />

                                    <div className="text-6xl font-black text-black mb-6 tracking-tighter transform group-hover:scale-105 group-hover:translate-x-2 transition-transform duration-500 origin-left">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-black/40 uppercase tracking-[0.2em] font-mono font-bold group-hover:text-black transition-colors duration-500 flex items-center gap-3">
                                        <div className="w-6 h-[1px] bg-black/20 group-hover:bg-black transition-colors duration-500" />
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
