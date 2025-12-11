
import Link from 'next/link';
import { createClient } from '../utils/supabase/server';
import { cookies } from 'next/headers';
import { signout } from '../app/auth/actions';

export default async function Navbar() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#1e1e2e] border-b-4 border-[#2d2d44] p-4 font-pixel">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-3xl text-white uppercase tracking-tighter hover:text-blue-400 transition-colors" style={{ textShadow: '2px 2px 0 #000' }}>
                    &gt; LLM_CHALLENGE_
                </Link>

                <div className="flex items-center gap-6 text-xl">
                    {user ? (
                        <>
                            <Link href="/submit" className="text-[#94a3b8] hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">
                                [SUBMIT]
                            </Link>
                            <Link href="/dashboard" className="text-[#94a3b8] hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">
                                [DASHBOARD]
                            </Link>
                            <form action={signout}>
                                <button className="text-[#ef4444] hover:text-red-400 hover:underline decoration-2 underline-offset-4 transition-all uppercase">
                                    [LOGOUT]
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-[#94a3b8] hover:text-white hover:underline decoration-2 underline-offset-4 transition-all">
                                [LOGIN]
                            </Link>
                            <Link href="/signup" className="text-blue-400 hover:text-blue-300 hover:underline decoration-2 underline-offset-4 transition-all">
                                [INIT_USER]
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
