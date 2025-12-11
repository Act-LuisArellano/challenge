import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    // Replace this with your actual Modal Web Endpoint URL
    const MODAL_API_URL = "https://YOUR_WORKSPACE-dataset-challenge-evaluator-run-challenge.modal.run";

    try {
        const response = await fetch(MODAL_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Error connecting to evaluation service" }, { status: 500 });
    }
}