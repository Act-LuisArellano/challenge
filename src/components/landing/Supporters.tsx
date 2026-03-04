import React from 'react';
import Section from './Section';

const Supporters = () => {
    return (
        <Section className="bg-slate-100 border-t border-slate-200">
            <div className="text-center">
                <p className="text-slate-500 uppercase tracking-widest text-xs font-semibold mb-8">Supported By</p>
                <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    {/* Placeholder Logos - using text placeholders for generation, replace with actual <img> tags */}
                    <div className="flex items-center justify-center p-4">
                        <img src="/inaoe.jpg" alt="INAOE" className="h-16 w-auto object-contain" />
                    </div>
                    <div className="flex items-center justify-center p-4">
                        <img src="/michigan.png" alt="University of Michigan" className="h-16 w-auto object-contain" />
                    </div>
                    <div className="flex items-center justify-center p-4">
                        <img src="/iberlef.jpg" alt="IberLEF 2026" className="h-16 w-auto object-contain" />
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Supporters;
