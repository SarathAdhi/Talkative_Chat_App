import { dbFireStore } from "../../../lib/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, docId, hashName, message } = req.body;
    // console.log("--->", docId);

    var time = new Date().toLocaleTimeString();
    time = time.split(" ")[0].slice(0, -3) + " " + time.split(" ")[1];

    const roomDocRef = doc(dbFireStore, "chats", docId);
    // Atomically add a new region to the "regions" array field.
    await updateDoc(roomDocRef, {
      messages: arrayUnion({
        hashName,
        name,
        message,
        date: new Date().toDateString(),
        time,
      }),
    });
    return res.json({
      status: 200,
    });
  }
}
