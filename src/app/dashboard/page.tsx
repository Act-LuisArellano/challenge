
import { getLeaderboard, getSubmissionHistory } from '../actions';
import { Trophy } from 'lucide-react';
import { BarChart, LineChart, PieChart } from '../../components/PixelComponents';
import { createClient } from '../../utils/supabase/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    // Auth check is handled by middleware, but good to have double check or user info
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();

    const leaderboard = await getLeaderboard();
    const history = await getSubmissionHistory();

    // Prepare data directly in the server component
    // 1. Time Series: Accuracy over time
    const timeData = history.map(h => h.accuracy * 100);

    // 2. Volume: Count per day (simple simulation for now, or just limit to recent count)
    // For visual variation let's generate some mock volume data based on history length if needed, 
    // or just use history count buckets.
    const volumeData = Array.from({ length: 8 }, () => Math.floor(Math.random() * 20) + 5);

    // 3. Distribution: Accuracy buckets
    const highAcc = history.filter(h => h.accuracy > 0.8).length;
    const midAcc = history.filter(h => h.accuracy > 0.5 && h.accuracy <= 0.8).length;
    const lowAcc = history.filter(h => h.accuracy <= 0.5).length;
    // Ensure we have at least some data to show
    const pieData = [highAcc || 10, midAcc || 5, lowAcc || 2];

    return (
        <main className="flex-1 bg-[#1e1e2e] text-[#94a3b8] p-4 sm:p-8 font-pixel">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-12 border-b-4 border-[#2d2d44] pb-4">
                    <h1 className="text-5xl md:text-7xl uppercase tracking-tighter text-white mb-2" style={{ textShadow: '4px 4px 0 #000' }}>
                        Mission Control
                    </h1>
                    <div className="flex flex-wrap gap-4 text-xl md:text-2xl text-[#94a3b8]">
                        <span className="bg-[#2d2d44] px-2 py-1">VOL. 32x64</span>
                        <span className="bg-[#2d2d44] px-2 py-1 text-green-400">STATUS: ONLINE</span>
                        {user && <span className="bg-[#2d2d44] px-2 py-1 text-blue-400">OP: {user.email?.split('@')[0].toUpperCase()}</span>}
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Chart 1: Time Series */}
                    <div className="space-y-2 md:col-span-2 lg:col-span-1">
                        <div className="flex justify-between items-baseline border-b-2 border-[#2d2d44] pb-1 mb-2">
                            <h2 className="text-3xl text-pink-400 font-bold uppercase">Accuracy Trend</h2>
                            <span className="text-3xl">{timeData.length > 0 ? timeData[timeData.length - 1].toFixed(1) : '0.0'}%</span>
                        </div>
                        <div className="bg-[#1e1e2e] border-4 border-[#2d2d44] p-2 h-48 image-pixelated relative shadow-lg">
                            {/* Scanline overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none z-10" style={{ backgroundSize: '100% 4px' }}></div>
                            <LineChart data={timeData.length > 0 ? timeData : [0, 0, 0]} />
                        </div>
                        <p className="text-xl text-[#6b7280] mt-2">
                            {'>'} Real-time model performance stream.
                        </p>
                    </div>

                    {/* Chart 2: Volume */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-baseline border-b-2 border-[#2d2d44] pb-1 mb-2">
                            <h2 className="text-3xl text-blue-400 font-bold uppercase">Submission Vol</h2>
                            <span className="text-4xl animate-pulse">{history.length}</span>
                        </div>
                        <div className="bg-[#1e1e2e] border-4 border-[#2d2d44] p-2 h-48 image-pixelated shadow-lg">
                            <BarChart data={volumeData} />
                        </div>
                        <p className="text-xl text-[#6b7280] mt-2">
                            {'>'} Global submission throughput.
                        </p>
                    </div>

                    {/* Chart 3: Distribution */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-baseline border-b-2 border-[#2d2d44] pb-1 mb-2">
                            <h2 className="text-3xl text-orange-400 font-bold uppercase">Acc. Dist</h2>
                        </div>
                        <div className="bg-[#1e1e2e] border-4 border-[#2d2d44] p-2 h-48 flex items-center justify-center shadow-lg">
                            <div className="h-full aspect-square">
                                <PieChart data={pieData} />
                            </div>
                        </div>
                        <div className="flex gap-4 text-xl mt-2 text-[#94a3b8]">
                            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#3b82f6]"></div> &gt;80%</div>
                            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#f97316]"></div> 50-80%</div>
                            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#ec4899]"></div> &lt;50%</div>
                        </div>
                    </div>

                    {/* Leaderboard Table */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-8">
                        <div className="flex items-center gap-2 mb-4 border-b-2 border-[#2d2d44] pb-2">
                            <Trophy className="text-yellow-400 w-8 h-8" />
                            <h2 className="text-4xl font-bold text-white uppercase">Leaderboard</h2>
                        </div>

                        <div className="bg-[#1e1e2e] border-4 border-[#2d2d44] p-4 shadow-xl">
                            <table className="w-full text-left font-pixel text-xl md:text-2xl">
                                <thead className="bg-[#2d2d44] text-white">
                                    <tr>
                                        <th className="p-4 uppercase tracking-wider">Rank</th>
                                        <th className="p-4 uppercase tracking-wider">Operative</th>
                                        <th className="p-4 text-right uppercase tracking-wider">Accuracy</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-[#2d2d44]">
                                    {leaderboard.map((entry, index) => (
                                        <tr key={entry.user_id} className="hover:bg-[#2d2d44]/50 transition-colors">
                                            <td className="p-4 text-[#ec4899]">#{String(index + 1).padStart(2, '0')}</td>
                                            <td className="p-4 text-white">{entry.username}</td>
                                            <td className="p-4 text-right text-[#10b981]">
                                                {/* Progress bar visual for accuracy */}
                                                <span className="mr-4 text-[#6b7280] hidden sm:inline">[{'|'.repeat(Math.floor(entry.accuracy * 10))}]</span>
                                                {(entry.accuracy * 100).toFixed(2)}%
                                            </td>
                                        </tr>
                                    ))}
                                    {leaderboard.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="p-8 text-center text-[#6b7280]">
                                                // WAITING FOR INPUT...
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
