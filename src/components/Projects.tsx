import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const projects = [
    {
        title: "FFS AIR-2",
        category: "National Competetion",
        description: "Designed and developed a combustion-powered Formula Student prototype, leading vehicle dynamics decisions from concept calculations to track-ready validation.",
        details: [
            "Vehicle Dynamics lead",
            "Marketing head",
            "Sponsorship Executive"
        ],
        tech: ["SolidWorks", "ANSYS", "MATLAB"],
        link: "#",
        color: "from-black to-gray-800",
        image: "/Formula.jpeg",
        gallery: ["/fig2formula.jpeg", "/fig3formula.jpeg", "/fig4formula.jpeg"],
        longDescription: [
            "As Vehicle Dynamics Head at Team Rudra, I am responsible for designing and validating the steering and suspension systems of our combustion Formula Student prototype. My focus is on converting performance goals into measurable mechanical parameters using analytical methods and simulations.",
            "The steering system is designed around a rack and pinion mechanism with Ackermann geometry to ensure predictable cornering behavior. Multiple steering ratios (6:1, 7.2:1, and 15:1) were evaluated to balance steering response, driver effort, and high-speed stability. The final direction was chosen based on responsiveness without compromising control during high lateral acceleration.",
            "For suspension, we are developing a double wishbone setup to optimize camber gain, roll center placement, and tire contact stability. Detailed load transfer calculations were performed to estimate vertical and lateral forces under dynamic cornering conditions. These forces were validated using MATLAB to ensure structural and geometric feasibility.",
            "The approach followed throughout the project is calculation-driven. Instead of adjusting geometry visually, performance targets were defined first, followed by force estimation, constraint analysis, and iterative validation.",
            "The goal is simple: engineer a car that is predictable, responsive, and mechanically efficient under real racing conditions — not just visually complete."
        ]
    },
    {
        title: "Commercial Gokart",
        category: "MOTORSPORTS",
        description: `This project involved developing a fully assembled go-kart model with emphasis on structural integrity, wheel-end architecture, drivetrain integration, and braking layout.`,
        details: [
            "Precise modeling",
            "Structural analysis",
            "Complete assembly "
        ],
        tech: ["SOLIWORKS", "Ansys"],
        link: "#",
        color: "from-black to-gray-700",
        image: "/Gokart.jpeg",
        gallery: [
            "/gokartprojectgallery/WhatsApp Image 2026-02-23 at 23.00.07.jpeg",
            "/gokartprojectgallery/WhatsApp Image 2026-02-23 at 23.00.45.jpeg",
            "/gokartprojectgallery/WhatsApp Image 2026-02-23 at 23.02.01.jpeg",
            "/gokartprojectgallery/WhatsApp Image 2026-02-23 at 23.02.26.jpeg",
            "/gokartprojectgallery/WhatsApp Image 2026-02-23 at 23.03.11.jpeg",
            "/gokartprojectgallery/WhatsApp Image 2026-02-23 at 23.08.19.jpeg"
        ],
        longDescription: [
            "This project involved developing a fully assembled go-kart model with emphasis on structural integrity, wheel-end architecture, drivetrain integration, and braking layout. The objective was to understand how individual subsystems interact within a compact vehicle platform.",
            "The chassis was designed considering load paths and packaging efficiency to support suspension mounts, axle supports, and driver positioning. Wheel hubs were modeled with realistic bearing accommodation and concentric alignment to simulate proper rotational behavior. Steering knuckles were developed with appropriate mounting points and geometric thickness to reflect vertical and lateral load handling.",
            "Tyres were modeled with realistic width, sidewall profile, and rim integration to maintain accurate ride height, track width, and overall stance. This allowed proper visualization of how loads transfer from the contact patch through the hub and into the chassis.",
            "The drivetrain follows a rear solid axle configuration with a chain-driven transmission system. Sprocket alignment and axle positioning were modeled to ensure straight torque flow and mechanical feasibility within limited packaging space. The layout reflects an acceleration-focused kart setup.",
            "The braking system includes a rear-mounted disc integrated concentrically with the axle, with caliper positioning aligned for realistic clamping action and torque transfer. A pedal-actuated lever mechanism was incorporated to represent mechanical advantage and force transmission from driver input to braking output.",
            "Overall, this project strengthened my understanding of torque flow, load transfer, component alignment, and subsystem integration — treating the kart as a functional mechanical system rather than just a visual assembly."
        ]
    },
    {
        title: "Wheel Loader ",
        category: "Designing",
        description: "Designed and assembled a 1:138 scale wheel loader model consisting of 15 components including a functional differential setup and boom mechanism.",
        details: [
            "Reverse Enginnering",
            "Scaled down model",
            "Complete assembly"
        ],
        tech: ["Solidworks "],
        link: "#",
        color: "from-black to-gray-600",
        image: "/JCB.jpeg",
        gallery: [
            "/wheeloader/WhatsApp Image 2026-02-24 at 07.27.02.jpeg",
            "/wheeloader/WhatsApp Image 2026-02-24 at 07.29.35.jpeg",
            "/wheeloader/WhatsApp Image 2026-02-24 at 07.33.02.jpeg",
            "/wheeloader/WhatsApp Image 2026-02-24 at 07.33.42.jpeg",
            "/wheeloader/WhatsApp Image 2026-02-24 at 07.34.32.jpeg"
        ]
    },
    {
        title: "Moto Student India",
        category: "Upcoming / Now Working",
        description: "Currently engineering and developing a high-performance motorcycle prototype. Focusing on structural integrity, vehicle dynamics, and advanced simulation for the upcoming competition.",
        details: [
            "Research & Conceptualization",
            "Chassis Architecture",
            "Dynamics Simulation"
        ],
        tech: ["SolidWorks", "ANSYS", "MATLAB"],
        link: "#",
        color: "from-black to-gray-500",
        image: "/motostudent.jfif",
        isUpcoming: true,
        gallery: [],
        longDescription: [
            "This project is currently a work-in-progress for the Moto Student India competition.",
            "I am actively involved in the foundational engineering phase of the motorcycle, which includes establishing baseline geometry, conducting preliminary kinematic analyses of the suspension systems, and ensuring strict adherence to the competition's rulebook.",
            "Our current manufacturing milestone involves refining the chassis design to minimize unsprung mass while maximizing structural rigidity and mechanical grip.",
            "Detailed CAD renderings, simulation results, and track-testing telemetry will be published here as development progresses."
        ]
    }
];

const Projects = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Prevent body scrolling when modal is open
    if (typeof document !== 'undefined') {
        if (activeProject) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('project-modal-open');
        } else {
            document.body.style.overflow = '';
            document.body.classList.remove('project-modal-open');
        }
    }

    return (
        <section id="projects" className="relative mt-20 sm:mt-32 mb-10">
            <div className="h-[20vh] flex flex-col items-center justify-center mb-10 gap-2">
                <span className="text-[10px] sm:text-xs font-mono text-black/40 uppercase tracking-[0.3em] sm:tracking-[0.5em] text-center px-4">Inventory of work</span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-black font-serif text-center px-4">
                    Projects
                </h2>
            </div>

            <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-8">
                <div className="flex flex-col lg:flex-row w-full h-[80vh] lg:h-[650px] gap-2 lg:gap-4">
                    {projects.map((project, i) => {
                        const isHovered = hoveredIndex === i;
                        return (
                            <motion.div
                                key={i}
                                className={`relative overflow-hidden rounded-3xl bg-gray-100 border border-black shadow-[8px_8px_0px_rgba(0,0,0,0.1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-shadow duration-500 group flex items-end ${project.isUpcoming ? 'cursor-default' : 'cursor-crosshair'}`}
                                animate={{
                                    flex: hoveredIndex === null ? 1 : isHovered ? 4 : 0.5,
                                }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => { if (!project.isUpcoming) { setActiveProject(project); setActiveIndex(i); } }}
                            >
                                {/* Blueprint grid background */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0" />
                                
                                <motion.div layoutId={`project-image-container-${i}`} className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden">
                                    <motion.img 
                                        layoutId={`project-image-${i}`}
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105 group-hover:grayscale" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                                </motion.div>
                                
                                <div className="relative z-20 p-6 md:p-8 flex flex-col justify-end h-full w-full">
                                    <motion.div 
                                        animate={{ opacity: isHovered || hoveredIndex === null ? 1 : 0.5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <span className="inline-block px-2 py-1 bg-white text-black font-mono text-[10px] uppercase tracking-widest mb-3 border border-black shadow-[2px_2px_0px_#000]">
                                            {project.category}
                                        </span>
                                    </motion.div>

                                    <motion.h2 
                                        className="text-white text-3xl sm:text-4xl md:text-5xl font-serif font-bold whitespace-nowrap tracking-tight"
                                        animate={{
                                            rotate: 0,
                                        }}
                                    >
                                        {project.title}
                                    </motion.h2>

                                    <div className="overflow-hidden">
                                        <motion.div
                                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                            animate={{ 
                                                height: isHovered ? 'auto' : 0, 
                                                opacity: isHovered ? 1 : 0,
                                                marginTop: isHovered ? 16 : 0
                                            }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                        >
                                            <p className="text-white/80 text-sm md:text-base font-light italic border-l-2 border-red-500 pl-4 mb-4 line-clamp-3 md:line-clamp-none whitespace-normal">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map(t => (
                                                    <span key={t} className="px-2 py-1 text-[10px] font-mono border border-white/30 text-white/90 bg-black/40 backdrop-blur-sm">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                            {!project.isUpcoming && (
                                                <div className="mt-6 flex items-center text-red-400 font-mono text-xs uppercase tracking-widest gap-2">
                                                    <span className="w-8 h-[1px] bg-red-400"></span>
                                                    Click to expand
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* FULL SCREEN DETAILED PROJECT MODAL */}
            <AnimatePresence>
                {activeProject && activeIndex !== null && (
                    <motion.div
                        className="fixed inset-0 z-[1000] flex flex-col bg-white overflow-y-auto overflow-x-hidden"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50, transition: { duration: 0.3 } }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Close Button Component */}
                        <motion.button
                            onClick={() => setActiveProject(null)}
                            className="fixed top-4 right-4 sm:top-8 sm:right-8 z-[1010] p-2 sm:p-4 bg-black text-white hover:bg-red-600 transition-colors border border-black shadow-[2px_2px_0px_#000] sm:shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:shadow-[2px_2px_0px_#000]"
                        >
                            <span className="font-mono text-xs sm:text-sm uppercase tracking-widest font-bold">Close X</span>
                        </motion.button>

                        {/* Top Hero Image Section using Shared Layout */}
                        <div className="w-full h-[30vh] sm:h-[40vh] md:h-[60vh] lg:h-[70vh] relative bg-gray-100 p-2 sm:p-4 border-b border-black">
                            {/* Blueprint grid background */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:40px_40px] z-0 pointer-events-none" />

                            <motion.div layoutId={`project-image-container-${activeIndex}`} className="w-full h-full relative z-10 border border-black shadow-lg overflow-hidden bg-white line-clamp-none rounded-none">
                                <motion.img
                                    layoutId={`project-image-${activeIndex}`}
                                    src={activeProject.image}
                                    alt={activeProject.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Soft inner gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                                <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 md:bottom-16 md:left-16 text-white text-left z-20">
                                    <span className="inline-block px-2 sm:px-4 py-1 sm:py-2 bg-red-600 border border-black font-mono text-[8px] sm:text-xs uppercase tracking-widest mb-2 sm:mb-4">
                                        {activeProject.category}
                                    </span>
                                    <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold font-serif shadow-black drop-shadow-lg break-words max-w-[95%] sm:max-w-[90%] leading-tight">
                                        {activeProject.title}
                                    </h1>
                                </div>
                            </motion.div>
                        </div>

                        {/* Detailed Content Section */}
                        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-20">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-16 relative items-start">
                                {/* Left Col - Heavy Description */}
                                <div className="md:col-span-2 space-y-6 sm:space-y-8">
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-mono uppercase tracking-widest border-b-2 border-black pb-4">Project Overview</h3>
                                    <div className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose font-serif text-black/80 space-y-4 sm:space-y-6">
                                        {activeProject.longDescription ? (
                                            activeProject.longDescription.map((paragraph, _idx) => (
                                                <p key={_idx}>{paragraph}</p>
                                            ))
                                        ) : (
                                            <p>
                                                {activeProject.description}
                                                <br /><br />
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel felis id ipsum dignissim efficitur. Suspendisse vehicula, mauris id pharetra lacinia, lorem enim rhoncus metus, tristique congue ex libero ut ex.
                                            </p>
                                        )}
                                    </div>

                                    <div className="pt-8">
                                        <h3 className="text-2xl font-mono uppercase tracking-widest border-b-2 border-black pb-4 mb-8">Photo Gallery & CAD Views</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {activeProject.gallery?.map((photo, j) => (
                                                <div key={j} className="group relative border border-black p-2 bg-gray-50 overflow-hidden cursor-crosshair">
                                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-10" />
                                                    <img src={photo} alt={`${activeProject.title} gallery ${j}`} className="w-full aspect-[4/3] object-cover filter transition-all duration-500 scale-100 group-hover:scale-105 group-hover:grayscale" />
                                                    {/* Annotation */}
                                                    <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-2 py-1 font-mono text-[10px] uppercase">
                                                        FIG. 00{j + 1}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Col - Specs */}
                                <div className="space-y-12 md:sticky md:top-10 h-fit">
                                    {/* Tech Stack */}
                                    <div>
                                        <h4 className="font-mono text-sm uppercase tracking-widest text-black/50 mb-4">Technologies / Tools</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {activeProject.tech.map(t => (
                                                <span key={t} className="px-4 py-2 border border-black font-mono text-sm uppercase bg-black text-white">{t}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Roles/Details */}
                                    <div>
                                        <h4 className="font-mono text-sm uppercase tracking-widest text-black/50 mb-4">Responsibilities & Details</h4>
                                        <ul className="space-y-4">
                                            {activeProject.details.map((d, j) => (
                                                <li key={j} className="flex gap-4 items-start font-serif text-lg">
                                                    <span className="text-red-500 font-bold font-mono">■</span>
                                                    {d}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
