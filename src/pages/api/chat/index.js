import {
  addDoc,
  arrayRemove,
  arrayUnion,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { chatCollectionRef } from "../../../lib/firebase";

export default async function handler(req, res) {
  const { token } = req.body;

  switch (req.method) {
    case "POST":
      const { chatId } = req.body;

      const _query = query(chatCollectionRef, where("chatId", "==", chatId));

      const querySnapshot = await getDocs(_query);
      const chatDetails = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })[0];

      if (chatDetails === undefined)
        return res.json({
          status: 400,
          message: `Chat does not exist.`,
        });
      else return res.json({ data: chatDetails });

      // const userDocRef = doc(dbFireStore, "users", myId);
      // await updateDoc(userDocRef, {
      //   friends: arrayUnion({
      //     email: userDetails.email,
      //     hashName: userHashName,
      //     chatId,
      //   }),
      // });

      break;
  }
}
