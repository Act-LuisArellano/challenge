import React from 'react';
import { Award, Database } from 'lucide-react';
import Section from './Section';

const About = () => {
    return (
        <Section id="about" className="bg-white">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">The Challenge</h2>
                    <div className="prose prose-slate text-slate-600">
                        <p className="mb-4">
                            We aim to build models for generating realistic, synthetic conversational data used to train automated assessment systems for <strong>Motivational Interviewing (MI)</strong>.
                        </p>
                        <p className="mb-4">
                            These skills are evaluated using the <em>Motivational Interviewing Treatment Integrity (MITI)</em> rubric. However, building reliable models is hindered by the scarcity of high-quality, privacy-compliant data.
                        </p>
                        <p>
                            <strong>The Goal:</strong> Generate synthetic "volleys" (conversation turns) to train models in classifying pairs of Behavior Codes (BCs), helping identify proficiency or deficiency in clinical interviewing skills.
                        </p>
                    </div>
                </div>

                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Database className="text-blue-600" size={20} />
                        Data-Centric Competition
                    </h3>
                    <p className="text-slate-600 mb-6">
                        Participants are expected to produce high-quality datasets representing a wide range of clinical conversations to enhance the performance of a <strong>frozen baseline model</strong> (DistillBert).
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="bg-green-100 text-green-700 rounded-full p-1 mt-0.5"><Award size={14} /></span>
                            <span className="text-sm text-slate-700">Improve BC recognition performance.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-green-100 text-green-700 rounded-full p-1 mt-0.5"><Award size={14} /></span>
                            <span className="text-sm text-slate-700">Ensure fidelity to clinically plausible interactions.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-green-100 text-green-700 rounded-full p-1 mt-0.5"><Award size={14} /></span>
                            <span className="text-sm text-slate-700">Avoid bias and mode collapse in synthetic data.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </Section>
    );
};

export default About;
