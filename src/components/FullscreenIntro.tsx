import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

interface FullscreenIntroProps {
    onStart: () => void;
}

const FullscreenIntro = ({ onStart }: FullscreenIntroProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleEnter = async () => {
        const doc = document.documentElement;

        try {
            if (doc.requestFullscreen) {
                await doc.requestFullscreen();
            } else if ('webkitRequestFullscreen' in doc) { /* Safari */
                await (doc as HTMLElement & { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
            } else if ('msRequestFullscreen' in doc) { /* IE11 */
                await (doc as HTMLElement & { msRequestFullscreen: () => Promise<void> }).msRequestFullscreen();
            }
        } catch (err) {
            console.error(`Error attempting to enable full-screen mode: ${err}`);
        }

        setIsAnimating(true);
        // Let the intro text fade out and trigger the ignition flash
        setTimeout(() => {
            onStart();
        }, 1500); // Trigger the unmount of this component and reveal main site after doors fully open
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] overflow-hidden pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
            {/* Top Garage Door / Visor Panel */}
            <motion.div
                className="absolute top-0 left-0 w-full h-[50vh] bg-[#050505] border-b-2 border-red-600/50 pointer-events-auto flex flex-col justify-end overflow-hidden"
                initial={{ y: "0%" }}
                animate={isAnimating ? { y: "-100%" } : { y: "0%" }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            >
                {/* Background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none origin-bottom opacity-30" />

                <AnimatePresence>
                    {!isAnimating && (
                        <motion.div
                            className="text-center pb-8"
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                        >
                            <h2 className="text-red-500 font-mono tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 flex items-center justify-center gap-4">
                                <span className="w-8 h-[1px] bg-red-500/50" />
                                IGNITION SEQUENCE INITIATED
                                <span className="w-8 h-[1px] bg-red-500/50" />
                            </h2>
                            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white font-serif italic pr-2">
                                ENGINEERING<span className="text-red-600">.</span>
                            </h1>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Bottom Garage Door / Visor Panel */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#050505] border-t-2 border-red-600/50 pointer-events-auto flex flex-col justify-start overflow-hidden"
                initial={{ y: "0%" }}
                animate={isAnimating ? { y: "100%" } : { y: "0%" }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            >
                {/* Background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none origin-top opacity-30" />

                <AnimatePresence>
                    {!isAnimating && (
                        <motion.div
                            className="text-center pt-8 flex flex-col items-center"
                            exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                        >
                            <button
                                ref={buttonRef}
                                onClick={handleEnter}
                                className="group relative px-16 py-5 bg-transparent text-white font-mono text-sm tracking-[0.3em] uppercase border border-white/20 hover:border-red-600 transition-colors duration-500 overflow-hidden"
                            >
                                <span className="relative z-10">START ENGINE</span>
                                <motion.div
                                    className="absolute inset-0 bg-red-600/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 shadow-[0_0_20px_rgba(239,68,68,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </button>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="text-[10px] text-gray-500 font-mono tracking-[0.4em] uppercase mt-12"
                            >
                                Fullscreen Experience Recommended
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Ignition Flash Effect */}
            <AnimatePresence>
                {isAnimating && (
                    <motion.div
                        className="fixed inset-0 bg-red-600 pointer-events-none z-[200] mix-blend-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 0.5, times: [0, 0.1, 1], ease: "easeOut" }}
                    />
                )}
            </AnimatePresence>

            {/* Central locking mechanism line that glows deeply before splitting */}
            <AnimatePresence>
                {isAnimating && (
                    <motion.div
                        className="fixed top-[50%] left-0 w-full h-[4px] bg-red-500 z-[101] shadow-[0_0_40px_10px_rgba(239,68,68,1)] pointer-events-none -translate-y-1/2"
                        initial={{ opacity: 1, scaleX: 1 }}
                        animate={{ opacity: [1, 1, 0], scaleY: [1, 4, 0] }}
                        transition={{ duration: 0.8, times: [0, 0.2, 1], ease: [0.76, 0, 0.24, 1] }}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FullscreenIntro;
