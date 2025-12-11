import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    // Forward to Modal
    const modalRes = await fetch(process.env.MODAL_API_URL!, {
        method: 'POST',
        body: formData, // fetch handles multipart boundary automatically
    });

    if (!modalRes.ok) {
        return NextResponse.json({ error: "Modal Error" }, { status: 500 });
    }

    const data = await modalRes.json();
    return NextResponse.json(data);
}