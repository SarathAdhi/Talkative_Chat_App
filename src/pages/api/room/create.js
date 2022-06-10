import { child, get, ref, set } from "firebase/database";
import { dbDatabase } from "../../../lib/firebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, roomId } = req.body;
    console.log(roomId);
    const room = await get(child(ref(dbDatabase), "rooms/" + roomId));
    const IsRoomExist = room.exists();

    console.log(IsRoomExist);

    if (IsRoomExist) {
      return await res.send({ status: 400, message: "Room already exist" });
    } else {
      set(ref(dbDatabase, "rooms/" + roomId), {
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
      return await res.status(200).json({
        status: 200,
        message: "Room Created Successfully",
      });
    }
  }
}
