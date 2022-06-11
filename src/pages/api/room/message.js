import { roomCollectionRef, dbFireStore } from "../../../lib/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, docId, roomId, message } = req.body;

    const roomDocRef = doc(dbFireStore, "rooms", docId);
    // Atomically add a new region to the "regions" array field.
    await updateDoc(roomDocRef, {
      messages: arrayUnion({
        email,
        name,
        message,
      }),
    });
    return res.json({
      status: 200,
    });
  }
}
