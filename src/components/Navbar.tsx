import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'py-4' : 'py-8'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between md:translate-x-8">
                {/* Logo */}
                <motion.a
                    href="#home"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl font-bold tracking-tighter text-black group"
                >
                    SATHWIK<span className="text-black group-hover:opacity-50">.</span>
                </motion.a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-12 px-10 py-4 rounded-full bg-white/40 backdrop-blur-md border border-black/10 shadow-sm scale-[0.8] origin-right transition-transform">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="relative group flex items-center justify-center cursor-pointer overflow-hidden rounded-full px-5 h-10"
                        >
                            {/* Invisible Placeholder for proper dynamic width */}
                            <span className="invisible text-lg font-medium whitespace-nowrap">
                                {link.name}
                            </span>
                            
                            {/* Front Face */}
                            <div className="absolute inset-0 flex items-center justify-center text-lg font-medium text-gray-600 transition-transform duration-500 ease-in-out group-hover:[transform:translateY(-100%)_rotateX(90deg)]">
                                {link.name}
                            </div>
                            
                            {/* Bottom Face */}
                            <div className="absolute inset-0 flex items-center justify-center text-lg font-medium text-white bg-black rounded-full whitespace-nowrap transition-transform duration-500 ease-in-out [transform:translateY(100%)_rotateX(-90deg)] group-hover:[transform:translateY(0)_rotateX(0deg)]">
                                {link.name}
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-black p-2 focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-black/10 md:hidden"
                    >
                        <div className="flex flex-col p-6 gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-gray-700 hover:text-black"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
