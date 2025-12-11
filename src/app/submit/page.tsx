"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function SubmitPage() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
    const [result, setResult] = useState<any>(null);

    // Hardcoded for demo - in real app, get from Context/Session
    const TEAM_ID = "00000000-0000-0000-0000-000000000000";

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'text/csv': ['.csv'] },
        maxFiles: 1
    });

    const handleSubmit = async () => {
        if (!file) return;

        setStatus('uploading');

        // Read file as text
        const text = await file.text();

        setStatus('processing');

        try {
            // Call Next.js API Route which calls Modal
            const response = await fetch('/api/process-dataset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ teamId: TEAM_ID, csvContent: text })
            });

            const data = await response.json();

            if (data.status === 'success') {
                setResult(data);
                setStatus('success');
            } else {
                throw new Error(data.message || 'Evaluation failed');
            }
        } catch (e) {
            console.error(e);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl space-y-6">
                <h2 className="text-2xl font-bold text-center">Submit Training Data</h2>
                <p className="text-slate-500 text-center text-sm">Upload your 100-sample CSV. The Model will train immediately.</p>

                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400'}
            ${file ? 'bg-green-50 border-green-500' : ''}
          `}
                >
                    <input {...getInputProps()} />
                    {file ? (
                        <div className="text-center text-green-700">
                            <CheckCircle className="w-10 h-10 mx-auto mb-2" />
                            <p className="font-semibold">{file.name}</p>
                        </div>
                    ) : (
                        <div className="text-center text-slate-400">
                            <UploadCloud className="w-10 h-10 mx-auto mb-2" />
                            <p>Drag & drop CSV here, or click to select</p>
                        </div>
                    )}
                </div>

                {status === 'processing' && (
                    <div className="flex flex-col items-center text-blue-600 animate-pulse">
                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                        <p>Training LoRA on T4 GPU & Evaluating... (approx 30s)</p>
                    </div>
                )}

                {status === 'success' && result && (
                    <div className="bg-green-100 p-4 rounded-md border border-green-200">
                        <p className="font-bold text-green-800">Success!</p>
                        <p className="text-sm text-green-700">Evaluation Accuracy: {(result.accuracy * 100).toFixed(2)}%</p>
                        {result.overfit && <p className="text-xs text-red-600 mt-1">⚠️ Warning: High overfitting detected.</p>}
                    </div>
                )}

                {status === 'error' && (
                    <div className="bg-red-100 p-4 rounded-md border border-red-200 flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                        <span className="text-red-700">Something went wrong. Check the file format.</span>
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={!file || status === 'processing'}
                    className="w-full bg-black text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
                >
                    {status === 'processing' ? 'Processing...' : 'Start Training & Evaluation'}
                </button>
            </div>
        </div>
    );
}