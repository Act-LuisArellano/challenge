"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { signout } from '@/app/auth/actions';

const Navbar = ({ user }: { user: any }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-xl font-bold text-blue-900">MIRROR@IberLEF2026</Link>
                        <div className="hidden lg:flex items-center gap-3 border-l border-slate-200 pl-4">
                            <img src="/inaoe.jpg" alt="INAOE" className="h-6 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
                            <img src="/michigan.png" alt="University of Michigan" className="h-6 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
                            <img src="/iberlef.jpg" alt="IberLEF" className="h-6 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
                        </div>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/#about" className="text-slate-600 hover:text-blue-600 transition">About</Link>
                        <Link href="/#task" className="text-slate-600 hover:text-blue-600 transition">Task</Link>
                        <Link href="/#schedule" className="text-slate-600 hover:text-blue-600 transition">Schedule</Link>
                        <Link href="/#team" className="text-slate-600 hover:text-blue-600 transition">Team</Link>

                        {/* AUTH LINKS INTEGRATION */}
                        <div className="flex items-center gap-4 border-l border-slate-200 pl-4 font-pixel">
                            {user ? (
                                <>
                                    <Link href="/submit" className="text-slate-600 hover:text-blue-600 hover:underline decoration-2 underline-offset-4 transition-all">
                                        [SUBMIT]
                                    </Link>
                                    <Link href="/dashboard" className="text-slate-600 hover:text-blue-600 hover:underline decoration-2 underline-offset-4 transition-all">
                                        [DASHBOARD]
                                    </Link>
                                    <form action={signout}>
                                        <button className="text-red-500 hover:text-red-600 hover:underline decoration-2 underline-offset-4 transition-all uppercase">
                                            [LOGOUT]
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                        [LOGIN]
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    {/* Mobile menu button placeholder */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-blue-600">
                            <span className="sr-only">Open menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2 flex flex-col gap-2 shadow-inner">
                    <a href="#about" className="block py-2 text-slate-600">About</a>
                    <a href="#task" className="block py-2 text-slate-600">Task</a>
                    <a href="#schedule" className="block py-2 text-slate-600">Schedule</a>
                    <a href="#team" className="block py-2 text-slate-600">Team</a>

                    {/* Mobile AUTH LINKS */}
                    <div className="border-t border-slate-200 pt-2 flex flex-col gap-2 font-pixel">
                        {user ? (
                            <>
                                <Link href="/submit" className="block py-2 text-slate-600">
                                    [SUBMIT]
                                </Link>
                                <Link href="/dashboard" className="block py-2 text-slate-600">
                                    [DASHBOARD]
                                </Link>
                                <form action={signout} className="block w-full">
                                    <button className="w-full text-left py-2 text-red-500 uppercase">
                                        [LOGOUT]
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="block py-2 text-slate-600">
                                    [LOGIN]
                                </Link>
                                <Link href="/signup" className="block py-2 text-blue-600">
                                    [INIT_USER]
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
