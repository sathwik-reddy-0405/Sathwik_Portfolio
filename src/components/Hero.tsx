import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
            <div className="absolute inset-0 z-0 opacity-40">
                <Canvas>
                    <ambientLight intensity={0.8} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Sphere visible args={[1, 100, 200]} scale={2.5}>
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
                <h2 className="text-black/60 font-medium tracking-[0.3em] mb-4 uppercase text-xs md:text-sm">
                    Mechanical Engineering | Motorsports Enthusiast
                </h2>
                <h1 className="text-5xl md:text-8xl font-bold mb-6 drop-shadow-2xl overflow-hidden tracking-tighter">
                    <motion.span className="inline-block text-black overflow-hidden whitespace-nowrap border-r border-black pr-2">
                        Sathwik Reddy.G
                    </motion.span>
                </h1>
                <p className="text-black/60 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed italic">
                    "Aspiring Mechanical Engineer, fueled by a passion for motorsports and precision systems."
                </p>

                <motion.div className="flex justify-center gap-6">
                    <button
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-3 bg-black text-white hover:bg-black/80 rounded-none border border-black transition-all"
                    >
                        View Projects
                    </button>
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-3 bg-transparent text-black hover:bg-black/5 rounded-none border border-black transition-all"
                    >
                        Contact Me
                    </button>
                </motion.div>

                <motion.div className="mt-12 text-xs text-black font-mono tracking-widest uppercase">
                    CAD | CAE | CFD | Manufacturing  | Marketing |
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
