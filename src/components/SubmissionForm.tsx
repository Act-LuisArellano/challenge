'use client'

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { registerUser, createSubmissionRecord, checkSubmissionStatus } from '../app/actions';
import axios from 'axios';

export default function SubmissionForm() {
    const [username, setUsername] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState('IDLE'); // IDLE, UPLOADING, PROCESSING, COMPLETED
    const [result, setResult] = useState<any>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'text/csv': ['.csv'] },
        maxFiles: 1
    });

    const handleSubmit = async () => {
        if (!file || !username) return;

        try {
            setStatus('UPLOADING');

            // 1. Register User & Create Submission Record in Neon
            const userId = await registerUser(username);
            const submissionId = await createSubmissionRecord(userId, file.name);

            // 2. Upload to Modal Endpoint
            const formData = new FormData();
            formData.append('submission_id', submissionId);
            formData.append('file', file);

            // Using the Modal Webhook URL from env (exposed via next.config or public env if needed)
            // For this demo, assuming logic to get URL
            await axios.post('/api/proxy-modal', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setStatus('PROCESSING');

            // 3. Poll for results
            const interval = setInterval(async () => {
                const statusData = await checkSubmissionStatus(submissionId);
                if (statusData && statusData.status === 'COMPLETED') {
                    clearInterval(interval);
                    setStatus('COMPLETED');
                    setResult(statusData.accuracy);
                } else if (statusData && statusData.status === 'FAILED') {
                    clearInterval(interval);
                    setStatus('FAILED');
                }
            }, 5000); // Check every 5s

        } catch (error) {
            console.error(error);
            setStatus('FAILED');
        }
    };

    // Proxy route needed to avoid CORS if Modal isn't configured for it,
    // OR just call Modal directly if CORS is allowed.

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm text-gray-400 mb-1">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white"
                    placeholder="Enter your team name"
                />
            </div>

            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'}`}
            >
                <input {...getInputProps()} />
                {file ? (
                    <p className="text-green-400">{file.name}</p>
                ) : (
                    <p className="text-gray-400">Drag & drop your CSV here, or click to select</p>
                )}
            </div>

            <button
                onClick={handleSubmit}
                disabled={!file || !username || status === 'UPLOADING' || status === 'PROCESSING'}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded"
            >
                {status === 'IDLE' && 'Submit for Evaluation'}
                {status === 'UPLOADING' && 'Uploading...'}
                {status === 'PROCESSING' && 'Training Model (Approx 2 min)...'}
                {status === 'COMPLETED' && 'Done!'}
                {status === 'FAILED' && 'Failed'}
            </button>

            {status === 'COMPLETED' && (
                <div className="mt-4 p-4 bg-green-900/30 border border-green-500 rounded text-center">
                    <p className="text-lg">Accuracy achieved:</p>
                    <p className="text-3xl font-bold text-green-400">{(result * 100).toFixed(2)}%</p>
                </div>
            )}
        </div>
    );
}