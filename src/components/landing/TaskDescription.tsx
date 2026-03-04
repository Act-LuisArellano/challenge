import React, { useState, useEffect, useRef } from 'react';
import { Lock, Unlock, Clock, Calendar, Database, FileText, Trophy, Code } from 'lucide-react';
import Section from './Section';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CountdownCard = ({ item, index }: { item: any, index: number }) => {
    const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const cardRef = useRef(null);

    // Theme configuration based on item.theme
    const themeStyles = {
        blueDark: {
            border: "border-blue-800",
            bgUnlocked: "bg-white",
            bgLocked: "bg-blue-900/5",
            textTitle: "text-blue-900",
            iconColor: "text-blue-700",
            lockBg: "bg-blue-100",
            lockText: "text-blue-800",
            accent: "blue"
        },

        blue: {
            border: "border-blue-600",
            bgUnlocked: "bg-white",
            bgLocked: "bg-blue-800/5",
            textTitle: "text-blue-800",
            iconColor: "text-blue-600",
            lockBg: "bg-blue-100",
            lockText: "text-blue-700",
            accent: "blue"
        },

        blueLight: {
            border: "border-blue-400",
            bgUnlocked: "bg-white",
            bgLocked: "bg-blue-700/5",
            textTitle: "text-blue-700",
            iconColor: "text-blue-500",
            lockBg: "bg-blue-50",
            lockText: "text-blue-600",
            accent: "blue"
        }
    };


    const theme = themeStyles[item.theme as keyof typeof themeStyles] || themeStyles.blue;

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(item.date) - +new Date();

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            } else {
                return null;
            }
        };

        const timer = setInterval(() => {
            const tl = calculateTimeLeft();
            setTimeLeft(tl);
            setIsUnlocked(tl === null);
        }, 1000);

        return () => clearInterval(timer);
    }, [item.date]);

    useGSAP(() => {
        gsap.from(cardRef.current, {
            y: 30,
            opacity: 0,
            scale: 0.95,
            duration: 1,
            delay: index * 0.15,
            ease: "back.out(1.5)",
            clearProps: "all"
        });
    }, { scope: cardRef });

    return (
        <div ref={cardRef} className={`h-full relative p-8 rounded-2xl border transition-all duration-500 overflow-hidden group min-h-[320px] flex flex-col 
            ${isUnlocked
                ? `bg-white ${theme.border} shadow-xl scale-100`
                : `${theme.bgLocked} border-slate-200 opacity-95 hover:shadow-lg hover:${theme.border}`
            }`}>

            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className={`text-2xl font-bold mb-2 ${isUnlocked ? theme.textTitle : 'text-slate-700'}`}>{item.title}</h3>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                        <Calendar size={16} className={theme.iconColor} />
                        <span>{item.date}</span>
                    </div>
                </div>
                <div className={`p-3 rounded-full transition-colors ${isUnlocked ? 'bg-green-100 text-green-600' : `${theme.lockBg} ${theme.lockText}`}`}>
                    {isUnlocked ? <Unlock size={24} /> : <Lock size={24} />}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-grow flex flex-col">
                {isUnlocked ? (
                    <div className="animate-fadeIn">
                        <div className="prose prose-slate text-slate-600 mb-6">
                            <p>{item.desc}</p>
                        </div>
                        <button className={`w-full py-3 bg-${theme.accent}-600 hover:bg-${theme.accent}-700 text-white font-bold rounded-lg transition shadow-md flex items-center justify-center gap-2`}>
                            Access Resources <FileText size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="w-full space-y-8">
                        {/* Countdown */}
                        <div className="grid grid-cols-4 gap-3 text-center">
                            {timeLeft ? (
                                <>
                                    {['Days', 'Hrs', 'Min', 'Sec'].map((label, i) => (
                                        <div key={label} className="bg-white/60 border border-slate-200/50 rounded-lg p-2 shadow-sm backdrop-blur-sm">
                                            <div className={`font-mono text-2xl font-bold ${theme.textTitle}`}>
                                                {i === 0 ? timeLeft.days : i === 1 ? timeLeft.hours : i === 2 ? timeLeft.minutes : timeLeft.seconds}
                                            </div>
                                            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{label}</div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="col-span-4 flex justify-center text-slate-400">
                                    <Clock className="animate-spin-slow w-8 h-8" />
                                </div>
                            )}
                        </div>

                        {/* Mysterious Clues */}
                        <div className="bg-white/40 rounded-xl p-4 border border-dashed border-slate-300/50">
                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 text-center">Contains</p>
                            <div className="flex justify-center gap-6 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                                {item.clues.map((clue: any, idx: number) => (
                                    <div key={idx} className="flex flex-col items-center gap-2 group/icon">
                                        <div className={`p-2 bg-white rounded-lg shadow-sm ${theme.iconColor} transform group-hover/icon:scale-110 transition-transform`}>
                                            {clue.icon}
                                        </div>
                                        <span className="text-[10px] font-semibold text-slate-500">{clue.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Background Pattern */}
            {!isUnlocked && (
                <div className="absolute inset-0 z-[-1] opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '20px 20px' }}>
                </div>
            )}
        </div>
    );
};

const TaskDescription = () => {
    // Specific phases mapped to schedule dates
    const phases = [
        {
            title: "Development Phase",
            date: "Mar 9, 2026",
            theme: "blue",
            description: "Release of Training & Validation Data. Detailed instructions on data format and submission guidelines.",
            clues: [
                { icon: <Database size={20} />, label: "Datasets" },
                { icon: <FileText size={20} />, label: "Instructions" },
                { icon: <Code size={20} />, label: "Baselines" }
            ]
        },
        {
            title: "Final Phase",
            date: "May 1, 2026",
            theme: "sky",
            description: "Release of Test Corpora. The platform opens for final submissions. Evaluator scripts will be provided.",
            clues: [
                { icon: <Code size={20} />, label: "Evaluator" },
                { icon: <Clock size={20} />, label: "Deadline" }
            ]
        },
        {
            title: "Official Results",
            date: "May 22, 2026",
            theme: "indigo",
            description: "Official Results & Rankings Published. Detailed analysis of system performances and gold standard release.",
            clues: [
                { icon: <Trophy size={20} />, label: "Ranking" },
                { icon: <FileText size={20} />, label: "Analysis" },
                { icon: <Unlock size={20} />, label: "Gold Std" }
            ]
        }
    ];

    return (
        <Section id="task" className="bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
                    Task Phases & Resources
                </h2>

                <p className="text-center text-slate-500 mb-6 max-w-3xl mx-auto">
                    Participants in this competition must provide three datasets, one for each pair of considered BCs, each containing at most 100 labeled conversation turns. These datasets will be used to fine-tune pretrained models. The fine-tuned models will then generate predictions for a held-out dataset. The performance of the fine-tuned models on this held-out dataset will serve as the primary evaluation metric for ranking participants.
                </p>

                <p className="text-center text-slate-500 mb-12 max-w-2xl mx-auto">
                    The BC pairs are: (1) Simple Reflection vs. Complex Reflection; (2) Open Question vs. Closed Question; (3) Persuasion vs. Giving Information.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {phases.map((item, index) => (
                        <CountdownCard
                            key={index}
                            item={item}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </Section>

    );
};

export default TaskDescription;
