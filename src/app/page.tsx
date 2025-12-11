import { getLeaderboard } from './actions';
import SubmissionForm from '../components/SubmissionForm';
import { Trophy } from 'lucide-react';

export default async function Home() {
  const leaderboard = await getLeaderboard();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          LLM Fine-Tuning Challenge
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Submission Section */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Submit Model</h2>
            <SubmissionForm />
          </div>

          {/* Leaderboard Section */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="text-yellow-400" />
              <h2 className="text-2xl font-semibold">Leaderboard</h2>
            </div>

            <div className="overflow-hidden rounded-lg">
              <table className="w-full text-left">
                <thead className="bg-gray-700 text-gray-300">
                  <tr>
                    <th className="p-3">Rank</th>
                    <th className="p-3">User</th>
                    <th className="p-3 text-right">Accuracy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.user_id} className="hover:bg-gray-750">
                      <td className="p-3 font-mono text-gray-400">#{index + 1}</td>
                      <td className="p-3 font-medium">{entry.username}</td>
                      <td className="p-3 text-right text-green-400 font-bold">
                        {(entry.accuracy * 100).toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                  {leaderboard.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-4 text-center text-gray-500">
                        No submissions yet. Be the first!
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