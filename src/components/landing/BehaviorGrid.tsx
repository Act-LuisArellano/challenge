import React from 'react';
import { behaviorsData } from '@/app/data';
import Section from './Section';

const BehaviorGrid = () => {
    return (
        <Section className="bg-slate-50 border-t border-slate-200">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Target Behavior Codes</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Submissions must generate content for these specific categories, covering both MI-consistent behaviors and anti-MI behaviors.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {behaviorsData.map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <h3 className={`font-bold text-lg mb-2 ${item.title.includes('Anti-MI') ? 'text-red-600' : 'text-blue-900'}`}>
                            {item.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default BehaviorGrid;
