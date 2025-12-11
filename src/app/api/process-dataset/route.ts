import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { teamId, csvContent } = body;

        // Call the Modal Web Endpoint
        // Replace with your actual deployed Modal URL
        const MODAL_URL = process.env.MODAL_API_URL;

        if (!MODAL_URL) {
            return NextResponse.json({ status: 'error', message: 'Server config error' }, { status: 500 });
        }

        const modalRes = await fetch(MODAL_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                team_id: teamId,
                csv_content: csvContent
            }),
        });

        const data = await modalRes.json();
        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
    }
}