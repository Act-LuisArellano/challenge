
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Supercharge Your LLMs
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join the ultimate Fine-Tuning Challenge. Compete with top engineers, optimize your models, and climb the leaderboard.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-3 px-8 rounded-full transition-transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="bg-gray-800 hover:bg-gray-700 text-white text-lg font-bold py-3 px-8 rounded-full border border-gray-700 transition-transform hover:scale-105"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* Features/Stats could go here */}
      <div className="border-t border-gray-800 bg-gray-900/50 p-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <h3 className="text-4xl font-bold text-white mb-2">100+</h3>
            <p className="text-gray-500">Models Submitted</p>
          </div>
          <div className="p-6">
            <h3 className="text-4xl font-bold text-white mb-2">Top 1%</h3>
            <p className="text-gray-500">Accuracy Goal</p>
          </div>
          <div className="p-6">
            <h3 className="text-4xl font-bold text-white mb-2">24/7</h3>
            <p className="text-gray-500">Automated Evaluation</p>
          </div>
        </div>
      </div>
    </main>
  );
}