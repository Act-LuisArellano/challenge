
import { signup } from '../auth/actions'

export default async function SignupPage(props: {
    searchParams: Promise<{ message?: string; error?: string }>;
}) {
    const { message, error } = await props.searchParams;

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 w-full max-w-md space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-center text-white mb-2">Create Account</h2>
                    <p className="text-center text-gray-400">Join the Fine-Tuning Challenge</p>
                </div>

                {message && (
                    <div className="p-3 bg-green-900/50 border border-green-500 text-green-200 rounded text-sm text-center">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 rounded text-sm text-center">
                        {error}
                    </div>
                )}


                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button formAction={signup} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                        Sign Up
                    </button>

                    <p className="text-center text-sm text-gray-400">
                        Already have an account? <a href="/login" className="text-blue-400 hover:underline">Log in</a>
                    </p>
                </form>
            </div>
        </div>
    )
}
