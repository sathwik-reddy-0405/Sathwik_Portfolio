

const Footer = () => {
    return (
        <footer className="py-12 border-t border-black/5 bg-white">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <div className="text-xl font-bold tracking-tighter text-black mb-2 font-serif italic">SATHWIK<span className="opacity-50">.</span></div>
                    <p className="text-xs text-black/40 uppercase tracking-widest font-mono">Mechanical Engineering | Motorsports</p>
                </div>

                <div className="flex gap-8">
                    {[
                        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sathwikreddy-gangireddy/' },
                        { name: 'GitHub', url: '#' },
                        { name: 'Twitter', url: '#' }
                    ].map(link => (
                        <a key={link.name} href={link.url} target={link.url !== '#' ? '_blank' : undefined} rel={link.url !== '#' ? 'noopener noreferrer' : undefined} className="text-xs font-mono uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors decoration-black underline-offset-4 hover:underline">
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="text-right opacity-30 text-[10px] uppercase font-mono tracking-widest">
                    © 2026 Sathwik Reddy G
                </div>
            </div>
        </footer>
    );
};

export default Footer;
