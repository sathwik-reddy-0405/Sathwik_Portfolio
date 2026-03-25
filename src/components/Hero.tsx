import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
            <div className="absolute inset-0 z-0 opacity-40">
                <Canvas>
                    <ambientLight intensity={0.8} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Sphere visible args={[1, 100, 200]} scale={isMobile ? 1.5 : 2.5}>
                        <MeshDistortMaterial
                            color="#000000"
                            attach="material"
                            distort={0.4}
                            speed={1.5}
                            roughness={0.1}
                            metalness={0.9}
                            wireframe={true}
                        />
                    </Sphere>
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            <div className="relative z-10 text-center px-6">
                <h2 className="text-black/60 font-medium tracking-[0.2em] sm:tracking-[0.3em] mb-4 uppercase text-[10px] sm:text-xs md:text-sm">
                    Mechanical Engineering | Motorsports Enthusiast
                </h2>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-2xl tracking-tighter max-w-[90vw] mx-auto">
                    <motion.span className="inline-block text-black border-r-2 sm:border-r border-black pr-1 sm:pr-2 whitespace-normal sm:whitespace-nowrap leading-tight">
                        Sathwik Reddy.G
                    </motion.span>
                </h1>
                <p className="text-black/60 text-base sm:text-lg md:text-xl mb-8 max-w-[85vw] mx-auto leading-relaxed italic">
                    "Aspiring Mechanical Engineer, fueled by a passion for motorsports and precision systems."
                </p>

                <motion.div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-4 sm:mt-0 px-2">
                    <button
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-6 sm:px-8 py-3 bg-black text-white hover:bg-black/80 rounded-none border border-black transition-all text-xs sm:text-sm"
                    >
                        View Projects
                    </button>
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-6 sm:px-8 py-3 bg-transparent text-black hover:bg-black/5 rounded-none border border-black transition-all text-xs sm:text-sm"
                    >
                        Contact Me
                    </button>
                </motion.div>

                <motion.div className="mt-10 sm:mt-12 text-[8px] sm:text-xs text-black font-mono tracking-widest uppercase break-words max-w-[95vw] mx-auto">
                    CAD | CAE | CFD | Manufacturing  | Marketing |
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
