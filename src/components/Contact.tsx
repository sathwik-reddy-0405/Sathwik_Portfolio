import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setFormStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setFormStatus('idle'), 5000);
        } catch {
            setFormStatus('error');
        }
    };

    return (
        <section id="contact" className="py-20 px-6 relative">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-black font-serif">
                        Project Inquiry
                    </h2>
                </div>

                <div className="bg-white border border-black/10 p-10 md:p-16 rounded-none relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-black/20 uppercase tracking-widest">
                        FORM.REF_02.A
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div>
                                    <label className="text-[10px] font-mono text-black/40 uppercase tracking-widest pl-1">Origin.Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-transparent border-b border-black/10 py-4 px-1 text-black placeholder:text-black/10 focus:outline-none focus:border-black transition-colors font-light"
                                        placeholder="Enter identifier"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-mono text-black/40 uppercase tracking-widest pl-1">Origin.Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-transparent border-b border-black/10 py-4 px-1 text-black placeholder:text-black/10 focus:outline-none focus:border-black transition-colors font-light"
                                        placeholder="Enter digital address"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-mono text-black/40 uppercase tracking-widest pl-1">Detailed.Brief</label>
                                <textarea
                                    rows={6}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-transparent border border-black/10 py-4 px-6 text-black placeholder:text-black/10 focus:outline-none focus:border-black transition-colors font-light resize-none h-full"
                                    placeholder="State your requirements"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={formStatus === 'submitting'}
                            className="w-full md:w-auto px-12 py-4 bg-black text-white hover:bg-black/80 transition-all text-xs font-mono uppercase tracking-[0.3em] disabled:bg-gray-400 group flex items-center justify-center gap-3"
                        >
                            {formStatus === 'submitting' ? 'Transmitting...' : 'Initiate Transmission'}
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>

                        {formStatus === 'success' && (
                            <p className="text-black text-xs font-mono lowercase tracking-widest animate-pulse">
                                // transmission_successful
                            </p>
                        )}
                        {formStatus === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-center font-medium"
                            >
                                Failed to send message. Please try again.
                            </motion.div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
