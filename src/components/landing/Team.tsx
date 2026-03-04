import React from 'react';
import { Users, Mail } from 'lucide-react';
import { teamData } from '@/app/data';
import Section from './Section';

const Team = () => {
    return (
        <Section id="team" className="bg-white">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
                    <Users className="text-blue-600" /> Organizing Team
                </h2>
                <p className="text-slate-600">The researchers behind MIRROR@IberLEF2026</p>
            </div>

            <div className="relative w-full overflow-hidden mask-fade-sides">
                {/* Gradient Masks for smooth fade effect at edges */}
                <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-max animate-scroll gap-8 py-4">
                    {[...teamData, ...teamData].map((member, idx) => (
                        <div key={idx} className="w-[300px] shrink-0 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col group">
                            <div className="p-6 pb-0 flex flex-col items-center">
                                <div className="w-24 h-24 mb-4 rounded-full border-4 border-white shadow-md overflow-hidden relative group-hover:scale-110 transition-transform duration-300">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 text-center">{member.name}</h3>
                                <p className="text-blue-600 text-sm font-medium text-center mb-1">{member.role}</p>
                                <p className="text-slate-500 text-xs text-center uppercase tracking-wide mb-4">{member.inst}</p>
                            </div>
                            <div className="bg-white p-6 mt-auto border-t border-slate-100">
                                <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">{member.bio}</p>
                                <a href={`mailto:${member.email}`} className="text-blue-500 text-sm hover:underline flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <Mail size={14} /> {member.email}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Team;
