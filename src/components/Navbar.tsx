
import Link from 'next/link';
import { createClient } from '../utils/supabase/server';
import { cookies } from 'next/headers';
import { signout } from '../app/auth/actions';

export default async function Navbar() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <nav className="w-full bg-gray-900 border-b border-gray-800 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                    LLM Challenge
                </Link>

                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                                Dashboard
                            </Link>
                            <form action={signout}>
                                <button className="text-gray-300 hover:text-white transition-colors">
                                    Sign Out
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                                Log In
                            </Link>
                            <Link href="/signup" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
