import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "./firebase";

/**
 * Save a new report for the logged-in user
 * @param {{ gain: number, balance: number }} data
 */
export async function addReport({ gain, balance }) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const reportsRef = collection(db, "users", user.uid, "reports");

  await addDoc(reportsRef, {
    gain: gain,
    balance: balance,
    createdAt: Timestamp.now(),
  });
}
