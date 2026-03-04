import React from 'react';
import { Calendar } from 'lucide-react';
import { scheduleData } from '@/app/data';

const Schedule = () => {
    return (
        <section id="schedule" className="py-16 bg-slate-900 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-3">
                    <Calendar className="text-blue-400" /> Tentative Schedule (2026)
                </h2>

                <div className="relative border-l-2 border-blue-800 ml-4 md:ml-0 space-y-8">
                    {scheduleData.map((item, index) => (
                        <div key={index} className="relative pl-8 md:pl-12">
                            <span className="absolute -left-[9px] top-1 bg-blue-500 w-4 h-4 rounded-full border-4 border-slate-900"></span>
                            <div className="flex flex-col md:flex-row md:items-baseline gap-2">
                                <span className="text-blue-400 font-bold min-w-[120px] text-sm uppercase tracking-wide">{item.date}</span>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{item.event}</h3>
                                    <p className="text-slate-400 mt-1">{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Schedule;
