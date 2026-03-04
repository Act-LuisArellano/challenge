import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-white font-bold text-lg">MIRROR 2026</h2>
                    <p className="text-sm mt-1">Motivational Interviewing Response & Rating via Synthetic cOnversational tuRns</p>
                </div>
                <div className="flex flex-col items-center md:items-end gap-2">
                    <p className="text-xs">&copy; 2026 INAOE & Partners. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
