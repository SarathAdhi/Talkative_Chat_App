import { child, get, ref, set } from "firebase/database";
import { dbDatabase } from "../../../lib/firebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, roomId } = req.body;

    const room = await get(child(ref(dbDatabase), roomId));
    const IsRoomExist = room.exists();

    if (IsRoomExist) {
      return res.json({
        status: 400,
        message: "Room already exist",
      });
    } else {
      set(ref(dbDatabase, roomId), {
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
      });
      return res.json({
        message: "Room Created Successfully",
      });
    }
  }
}
