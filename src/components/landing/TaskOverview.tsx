import React from 'react';
import Section from './Section';
import { Sparkles, MessageSquare, Target } from 'lucide-react';

const TaskOverview = () => {
    return (
        <Section id="task-overview" className="bg-slate-50 border-t border-slate-200">
            {/* Header / Intro */}
            <div className="max-w-4xl mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Task Description</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                    We invite the community to develop <strong>Generative AI (GenAI)</strong> methods for creating synthetic conversation turns that can substantially improve the performance of models trained to recognize <strong>behavior codes (BCs)</strong> in the context of motivational interviews.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Left Column: What is a BC? */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                                <MessageSquare size={20} />
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg">What is a Behavior Code?</h3>
                        </div>
                        <p className="text-slate-600 mb-4">
                            A <strong>Behavior Code (BC)</strong> is a discrete, observable clinician action (e.g., asking a question, giving information) counted during the coding of a motivational interviewing session.
                        </p>
                        <p className="text-slate-600">
                            These codes allow raters to tally how often particular clinician behaviours occur, helping assess adherence to MI-consistent versus MI-inconsistent practice.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                                <Target size={20} />
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg">Our Goal</h3>
                        </div>
                        <p className="text-slate-600 mb-4">
                            Our ultimate goal is to generate valuable data for training models for the automatic assessment of clinicians’ motivational-interviewing skills.
                        </p>
                        <p className="text-slate-600">
                            These skills (crucial for promoting behavior change among patients) can be evaluated by using the <a href="https://tinyurl.com/38byjrwy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Motivational Interviewing Treatment Integrity (MITI) rubric</a>.
                        </p>
                    </div>
                </div>

                {/* Right Column: Data-Centric Competition */}
                <div className="h-full">
                    <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden h-full">
                        <div className="relative z-10 flex flex-col h-full justify-center">
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles className="text-yellow-400" size={24} />
                                <h3 className="text-2xl font-bold">Data-Centric Competition</h3>
                            </div>

                            <div className="flex-grow flex flex-col justify-center">
                                <p className="text-blue-100 mb-6 text-lg leading-relaxed">
                                    This is a data-centric competition: participants are expected to produce <strong>high-quality datasets</strong> representing a wide range of clinical conversations (rather than training a model) to enhance the performance of a frozen baseline model used for BC classification.
                                </p>

                                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                                    <p className="text-sm font-medium text-blue-50">
                                        We encourage participants to include samples featuring clients from diverse backgrounds, varied conversation topics, and conversing with different types of health professionals.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3"></div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default TaskOverview;
