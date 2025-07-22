'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, where, updateDoc, doc, limit } from 'firebase/firestore';

export interface LeaderboardEntry {
  id?: string; // Firestore document ID
  name: string;
  score: number;
}

/**
 * Adds a new score to the leaderboard in Firestore.
 * If a user with the same name already exists, their score is updated.
 * Otherwise, a new entry is created.
 * @param entry - The leaderboard entry to add or update.
 */
export async function addScore(entry: LeaderboardEntry): Promise<void> {
    const leaderboardCol = collection(db, 'leaderboard');
    
    // Check if user already exists
    const q = query(leaderboardCol, where("name", "==", entry.name), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        // User exists, update score
        const userDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'leaderboard', userDoc.id), {
            score: entry.score
        });
    } else {
        // New user, add to leaderboard
        await addDoc(leaderboardCol, {
            name: entry.name,
            score: entry.score
        });
    }
}

/**
 * Retrieves the current leaderboard from Firestore, sorted by score in descending order.
 * @returns A promise that resolves to the sorted leaderboard.
 */
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const leaderboardCol = collection(db, 'leaderboard');
  const q = query(leaderboardCol, orderBy('score', 'desc'));
  const querySnapshot = await getDocs(q);
  
  const leaderboard: LeaderboardEntry[] = [];
  querySnapshot.forEach((doc) => {
    leaderboard.push({ id: doc.id, ...doc.data() } as LeaderboardEntry);
  });

  return leaderboard;
}
