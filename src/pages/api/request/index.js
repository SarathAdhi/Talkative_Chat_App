import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { dbFireStore } from "../../../lib/firebase";

export default async function handler(req, res) {
  const { token } = req.body;

  switch (req.method) {
    case "POST":
      const { MyHashName, UserEmail, UserHashName, MyId, UserId } = req.body;

      // Adding in my friend list
      const roomDocRef2 = doc(dbFireStore, "users", MyId);
      await updateDoc(roomDocRef2, {
        friends: arrayUnion({
          email: UserEmail,
          hashName: UserHashName,
        }),
      });

      // Push Notification to the opposite user
      const roomDocRef = doc(dbFireStore, "users", UserId);
      await updateDoc(roomDocRef, {
        notifications: arrayUnion({
          hashName: MyHashName,
          tag: "sent you a friend request",
        }),
      });

      // // Adding in opposite user's friend list
      // const roomDocRef = doc(dbFireStore, "users", UserId);
      // await updateDoc(roomDocRef, {
      //   friends: arrayUnion({
      //     email: MyEmail,
      //     hashName: MyHashName,
      //     accepted: false,
      //   }),
      // });

      break;
  }
}
