import { addDoc, getDocs } from "firebase/firestore";
import { roomCollectionRef } from "../../../lib/firebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, roomId } = req.body;

    const URL_Snapshot = await getDocs(roomCollectionRef);
    const isRoomExist = URL_Snapshot.docs
      .map((doc) => doc.data())
      .filter((data) => {
        return data.roomId === roomId;
      })
      .map((data) => {
        return data;
      });

    if (isRoomExist.length === 0) {
      const newRoom = {
        roomId,
        adminName: name,
        adminEmail: email,
        members: [
          {
            name,
            email,
            status: "admin",
          },
        ],
        messages: [],
      };
      await addDoc(roomCollectionRef, newRoom);

      res.json({ status: 200, message: "Room Created successfully" });
    } else {
      res.json({ status: 200, message: "Room already exist" });
    }
  }
}
