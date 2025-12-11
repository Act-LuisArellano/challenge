
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function LandingPage() {
  return (
    <main className="flex-1 bg-[#1e1e2e] text-[#94a3b8] flex flex-col font-pixel">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{
          backgroundImage: 'linear-gradient(#2d2d44 1px, transparent 1px), linear-gradient(90deg, #2d2d44 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}></div>

        <div className="max-w-4xl space-y-8 z-10">
          <h1 className="text-6xl md:text-8xl tracking-tighter text-white uppercase mb-4" style={{ textShadow: '6px 6px 0 #000' }}>
            Supercharge Your <span className="text-blue-500">LLMs</span>
          </h1>
          <p className="text-2xl md:text-3xl text-[#94a3b8] max-w-2xl mx-auto uppercase leading-relaxed">
            {'>'} Join the ultimate Fine-Tuning Challenge.<br />
            {'>'} Compete. Optimize. Dominate.
          </p>

          <div className="flex gap-6 justify-center mt-8">
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-500 text-white text-2xl uppercase py-3 px-8 transition-transform border-b-4 border-blue-900 active:border-b-0 active:translate-y-1"
            >
              [Get Started]
            </Link>
            <Link
              href="/login"
              className="bg-[#2d2d44] hover:bg-[#3f3f5a] text-white text-2xl uppercase py-3 px-8 transition-transform border-b-4 border-[#1e1e2e] active:border-b-0 active:translate-y-1"
            >
              [Log In]
            </Link>
          </div>
        </div>
      </div>

      {/* Features/Stats */}
      <div className="border-t-4 border-[#2d2d44] bg-[#1a1a29] p-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border-4 border-[#2d2d44] bg-[#1e1e2e] shadow-[8px_8px_0_0_rgba(0,0,0,0.5)]">
            <h3 className="text-6xl text-blue-400 mb-2 font-bold">100+</h3>
            <p className="text-[#94a3b8] text-xl uppercase">Models Submitted</p>
          </div>
          <div className="p-6 border-4 border-[#2d2d44] bg-[#1e1e2e] shadow-[8px_8px_0_0_rgba(0,0,0,0.5)]">
            <h3 className="text-6xl text-green-400 mb-2 font-bold">TOP 1%</h3>
            <p className="text-[#94a3b8] text-xl uppercase">Accuracy Goal</p>
          </div>
          <div className="p-6 border-4 border-[#2d2d44] bg-[#1e1e2e] shadow-[8px_8px_0_0_rgba(0,0,0,0.5)]">
            <h3 className="text-6xl text-pink-400 mb-2 font-bold">24/7</h3>
            <p className="text-[#94a3b8] text-xl uppercase">Automated Eval</p>
          </div>
        </div>
      </div>
    </main>
  );
}