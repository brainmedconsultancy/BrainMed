import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, hasFirebaseConfig } from "./firebase";

const submissionsCollection = db ? collection(db, "inquiries") : null;

export async function createSubmission(payload) {
  if (!hasFirebaseConfig || !submissionsCollection) {
    throw new Error("Firebase is not configured. Add your environment variables first.");
  }

  await addDoc(submissionsCollection, {
    ...payload,
    status: "new",
    createdAt: serverTimestamp(),
  });
}

export async function fetchSubmissions() {
  if (!hasFirebaseConfig || !submissionsCollection) {
    throw new Error("Firebase is not configured. Add your environment variables first.");
  }

  const snapshot = await getDocs(query(submissionsCollection, orderBy("createdAt", "desc")));

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function markSubmissionContacted(id) {
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  await updateDoc(doc(db, "inquiries", id), {
    status: "contacted",
  });
}

export async function removeSubmission(id) {
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  await deleteDoc(doc(db, "inquiries", id));
}
