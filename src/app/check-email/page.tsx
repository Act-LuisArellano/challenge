import Link from 'next/link';

export default function CheckEmailPage() {
    return (
        <div className="min-h-screen bg-[#1e1e2e] flex flex-col items-center justify-center p-4 font-pixel text-[#94a3b8]">
            <div className="bg-[#1e1e2e] p-8 border-4 border-[#2d2d44] w-full max-w-lg space-y-8 shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] flex flex-col items-center animate-pulse">
                <div>
                    <h2 className="text-4xl font-bold text-center text-white mb-2 uppercase tracking-tighter" style={{ textShadow: '4px 4px 0 #000' }}>
                        &gt; TRANSMISSION_SENT_
                    </h2>
                    <p className="text-center text-[#6b7280] uppercase">[Action Required]</p>
                </div>

                <div className="text-blue-400 whitespace-pre font-mono text-center leading-tight">
                    {`   \\  _  /
   (o)(o)
  /      \\
 |(  --  )|
  \\      /
  '------'`}
                </div>

                <div className="space-y-4">
                    <p className="text-center text-xl text-white uppercase leading-relaxed">
                        A CONFIRMATION SIGNAL HAS BEEN DISPATCHED TO YOUR INBOX.
                    </p>
                    <p className="text-center text-[#6b7280] uppercase">
                        PLEASE VERIFY YOUR IDENTITY TO COMPLETE REGISTRATION.
                    </p>
                </div>

                <Link href="/login" className="block w-full text-center bg-[#2d2d44] hover:bg-[#3f3f5a] text-white text-xl uppercase font-bold py-3 px-4 border-b-4 border-[#1e1e2e] active:border-b-0 active:translate-y-1 transition-all">
                    [RETURN_TO_LOGIN]
                </Link>
            </div>
        </div>
    )
}
