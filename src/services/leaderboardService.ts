'use server';

export interface LeaderboardEntry {
  name: string;
  score: number;
}

// In-memory store for leaderboard data.
// In a real application, this would be replaced with a database like Firestore.
let leaderboard: LeaderboardEntry[] = [];

/**
 * Adds a new score to the leaderboard.
 * If a user with the same name already exists, their score is updated.
 * @param entry - The leaderboard entry to add or update.
 */
export async function addScore(entry: LeaderboardEntry): Promise<void> {
    const existingUserIndex = leaderboard.findIndex(e => e.name.toLowerCase() === entry.name.toLowerCase());

    if (existingUserIndex !== -1) {
        leaderboard[existingUserIndex].score = entry.score;
    } else {
        leaderboard.push(entry);
    }
}

/**
 * Retrieves the current leaderboard, sorted by score in descending order.
 * @returns A promise that resolves to the sorted leaderboard.
 */
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  // Sort by score descending
  return [...leaderboard].sort((a, b) => b.score - a.score);
}
