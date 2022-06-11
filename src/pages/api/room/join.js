import { roomCollectionRef, dbFireStore } from "../../../lib/firebase";
import { doc, updateDoc, arrayUnion, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, roomId } = req.body;

    const Rooms_Snapshot = await getDocs(roomCollectionRef);
    const data = Rooms_Snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    const roomDetails = data.filter((data) => {
      return data.roomId === roomId;
    })[0];

    if (roomDetails === undefined)
      return res.json({
        status: 400,
        message: `Room ${roomId} does not exist.`,
      });

    const isUserAlreadyAMember = roomDetails.members.find((member) => {
      return member.email === email;
    });
    if (!isUserAlreadyAMember) {
      const roomDocRef = doc(dbFireStore, "rooms", roomDetails.id);
      // Atomically add a new region to the "regions" array field.
      await updateDoc(roomDocRef, {
        members: arrayUnion({
          email,
          name,
          status: "member",
        }),
      });
      return res.json({
        status: 200,
        message: `Joined the Room ${roomId}.`,
      });
    } else {
      return res.json({
        status: 400,
        message: `You are already a ${isUserAlreadyAMember.status} of ${roomId}.`,
      });
    }
  }
}
