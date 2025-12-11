
import SubmissionForm from '../../components/SubmissionForm';
import { createClient } from '../../utils/supabase/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function SubmitPage() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <main className="flex-1 bg-[#1e1e2e] text-[#94a3b8] p-8 font-pixel">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white uppercase tracking-tighter" style={{ textShadow: '4px 4px 0 #000' }}>
                    &gt; UPLOAD_MODEL_
                </h1>

                <div className="bg-[#1e1e2e] p-6 border-4 border-[#2d2d44] shadow-[8px_8px_0_0_rgba(0,0,0,0.5)]">
                    {user && (
                        <div className="mb-4 text-xl text-[#94a3b8] border-b-2 border-[#2d2d44] pb-2">
                            IDENTIFIED AS: <span className="text-blue-400">{user.email?.toUpperCase()}</span>
                        </div>
                    )}
                    <SubmissionForm />
                </div>
            </div>
        </main>
    );
}