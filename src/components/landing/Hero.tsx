import React, { useRef } from 'react';
import { Play, ChevronRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
    const arrowRef = useRef(null);

    useGSAP(() => {
        gsap.to(arrowRef.current, {
            y: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    });

    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
            >
                <source src="/doc_bg_color.mp4" type="video/mp4" />
            </video>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30   via-blue-600/20  to-slate-900/30  mix-blend-overlay z-0" />


            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center w-full">
                <div className="inline-block bg-blue-500/20 text-blue-200 text-sm font-semibold px-3 py-1 rounded-full mb-6 border border-blue-400/30 backdrop-blur-sm">
                    Shared Task @ IberLEF 2026
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-tight text-white drop-shadow-md">
                    Motivational Interviewing Response & Rating via Synthetic cOnversational tuRns
                </h1>
                <p className="text-lg md:text-xl text-slate-100 mb-10 max-w-2xl drop-shadow-sm leading-relaxed">
                    Building models for generating realistic, synthetic conversational data to assess clinicians’ motivational interviewing (MI) skills. A data-centric challenge to advance healthcare AI.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <a href="#task" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition flex items-center gap-2 shadow-lg shadow-blue-900/50 transform hover:-translate-y-1">
                        Read Guidelines <ChevronRight size={20} />
                    </a>
                    <a href="mailto:gensynct@googlegroups.com" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition border border-white/20 backdrop-blur-sm transform hover:-translate-y-1">
                        Contact Organizers
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div ref={arrowRef} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-10 opacity-80 hover:opacity-100 transition-opacity" onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            }}>
                <ChevronDown size={40} className="text-white drop-shadow-md" />
            </div>
        </section>
    );
};

export default Hero;
