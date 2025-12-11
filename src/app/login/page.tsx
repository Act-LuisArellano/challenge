
import { login } from '../auth/actions'

export default async function LoginPage(props: {
    searchParams: Promise<{ message?: string; error?: string }>;
}) {
    const { message, error } = await props.searchParams;

    return (
        <div className="min-h-screen bg-[#1e1e2e] flex items-center justify-center p-4 font-pixel text-[#94a3b8]">
            <div className="bg-[#1e1e2e] p-8 border-4 border-[#2d2d44] w-full max-w-md space-y-8 shadow-[8px_8px_0_0_rgba(0,0,0,0.5)]">
                <div>
                    <h2 className="text-4xl font-bold text-center text-white mb-2 uppercase tracking-tighter" style={{ textShadow: '4px 4px 0 #000' }}>
                        &gt; ACCESS_TERMINAL_
                    </h2>
                    <p className="text-center text-[#6b7280] uppercase">[Please Authenticate]</p>
                </div>

                {message && (
                    <div className="p-3 bg-green-900/30 border-2 border-green-500 text-green-400 text-center uppercase">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="p-3 bg-red-900/30 border-2 border-red-500 text-red-400 text-center uppercase">
                        {error}
                    </div>
                )}


                <form className="space-y-6">
                    <div>
                        <label className="block text-xl uppercase mb-2" htmlFor="email">
                            &gt; Email_Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full bg-[#1e1e2e] border-2 border-[#2d2d44] p-3 text-white focus:outline-none focus:border-blue-500 focus:shadow-[4px_4px_0_0_rgba(59,130,246,0.5)] transition-all"
                            placeholder="OPERATIVE@IBERLEF.NET"
                        />
                    </div>
                    <div>
                        <label className="block text-xl uppercase mb-2" htmlFor="password">
                            &gt; Passcode
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full bg-[#1e1e2e] border-2 border-[#2d2d44] p-3 text-white focus:outline-none focus:border-blue-500 focus:shadow-[4px_4px_0_0_rgba(59,130,246,0.5)] transition-all"
                            placeholder="********"
                        />
                    </div>

                    <button formAction={login} className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xl uppercase font-bold py-3 px-4 border-b-4 border-blue-900 active:border-b-0 active:translate-y-1 transition-all">
                        [INITIATE_LOGIN]
                    </button>

                    <p className="text-center text-xl text-[#6b7280] uppercase">
                        New Operative? <a href="/signup" className="text-blue-400 hover:underline decoration-2 underline-offset-4">[REGISTER]</a>
                    </p>
                </form>
            </div>
        </div>
    )
}
