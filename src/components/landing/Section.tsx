import React from 'react';

interface SectionProps {
    id?: string;
    className?: string;
    children: React.ReactNode;
}

const Section = ({ id, className = "", children }: SectionProps) => {
    return (
        <section id={id} className={`py-16 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </section>
    );
};

export default Section;
