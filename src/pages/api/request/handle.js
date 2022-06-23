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
import {
  chatCollectionRef,
  dbFireStore,
  userCollectionRef,
} from "../../../lib/firebase";

import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const { token } = req.body;

  switch (req.method) {
    case "POST":
      const { userHashName, myHashName, myEmail, myId, handle } = req.body;

      const _query = query(
        userCollectionRef,
        where("hashName", "==", userHashName)
      );
      const querySnapshot = await getDocs(_query);
      const userDetails = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })[0];

      if (handle === "ACCEPT") {
        const chatId = uuidv4();

        const userDocRef = doc(dbFireStore, "users", myId);
        await updateDoc(userDocRef, {
          friends: arrayUnion({
            email: userDetails.email,
            hashName: userHashName,
            chatId,
          }),
        });

        const userDocRef2 = doc(dbFireStore, "users", userDetails.id);
        await updateDoc(userDocRef2, {
          friends: arrayUnion({
            email: myEmail,
            hashName: myHashName,
            chatId,
          }),
        });

        await updateDoc(userDocRef2, {
          friends: arrayRemove({
            email: myEmail,
            hashName: myHashName,
          }),
        });

        // Push Notification to the opposite user
        await updateDoc(userDocRef2, {
          notifications: arrayUnion({
            hashName: myHashName,
            tag: "accepted your friend request",
          }),
        });

        const newChat = {
          chatId,
          messages: [],
        };
        await addDoc(chatCollectionRef, newChat);
      } else if (handle === "REJECT") {
        const userDocRef = doc(dbFireStore, "users", userDetails.id);
        await updateDoc(userDocRef, {
          friends: arrayRemove({
            email: myEmail,
            hashName: myHashName,
          }),
        });
        const userDocRef2 = doc(dbFireStore, "users", userDetails.id);
        await updateDoc(userDocRef2, {
          notifications: arrayUnion({
            hashName: myHashName,
            tag: "rejected your friend request",
          }),
        });
      }

      break;
  }
}
