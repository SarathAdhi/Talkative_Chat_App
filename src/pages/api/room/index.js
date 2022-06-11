import { onValue, ref, set } from "firebase/database";
import { getDocs } from "firebase/firestore";
import { dbDatabase, roomCollectionRef } from "../../../lib/firebase";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { email, roomId } = req.body;

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
      if (isUserAlreadyAMember) {
        return res.json([roomDetails]);
      } else {
        return res.json({
          status: 400,
          message: `You are already a ${isUserAlreadyAMember.status} of ${roomId}.`,
        });
      }
  }
}
