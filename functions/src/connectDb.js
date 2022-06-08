import { initializeApp, cert, getApps } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import myCredentials from "../credentials.js";

export default function connectDb() {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(myCredentials),
    });
  }
  return getFirestore();
}
