'use server'

import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export async function getLeaderboard() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM leaderboard LIMIT 50');
        return res.rows;
    } finally {
        client.release();
    }
}

export async function registerUser(username: string) {
    const client = await pool.connect();
    try {
        // Check if exists
        const check = await client.query('SELECT id FROM users WHERE username = $1', [username]);
        if (check.rows.length > 0) return check.rows[0].id;

        const res = await client.query(
            'INSERT INTO users (username) VALUES ($1) RETURNING id',
            [username]
        );
        return res.rows[0].id;
    } finally {
        client.release();
    }
}

export async function createSubmissionRecord(userId: string, filename: string) {
    const client = await pool.connect();
    try {
        const res = await client.query(
            'INSERT INTO submissions (user_id, filename) VALUES ($1, $2) RETURNING id',
            [userId, filename]
        );
        return res.rows[0].id;
    } finally {
        client.release();
    }
}

export async function checkSubmissionStatus(submissionId: string) {
    const client = await pool.connect();
    try {
        const res = await client.query(
            `SELECT s.status, r.accuracy 
       FROM submissions s 
       LEFT JOIN evaluation_results r ON s.id = r.submission_id 
       WHERE s.id = $1`,
            [submissionId]
        );
        return res.rows[0];
    } finally {
        client.release();
    }
}

export async function getSubmissionHistory() {
    const client = await pool.connect();
    try {
        // Fetch recent submissions with their accuracy results
        const res = await client.query(`
            SELECT s.created_at, r.accuracy
            FROM submissions s
            JOIN evaluation_results r ON s.id = r.submission_id
            ORDER BY s.created_at ASC
            LIMIT 50
        `);
        return res.rows;
    } finally {
        client.release();
    }
}