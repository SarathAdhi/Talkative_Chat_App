import clientPromise from "../../../lib/db";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("Database");
  switch (req.method) {
    case "POST":
      const { email, name, roomId } = req.body;

      const isRoomExist = await db
        .collection("users")
        .find({
          createdRoom: { $eq: roomId },
        })
        .toArray();

      if (isRoomExist.length === 0) {
        await db.collection("users").updateOne(
          { email: email },
          {
            $push: {
              createdRoom: roomId,
            },
          }
        );
        await db.collection("rooms").insertOne({
          adminName: name,
          adminEmail: email,
          roomId: roomId,
          members: [],
          chats: [],
        });
        const data = await db
          .collection("users")
          .find({ email: email })
          .toArray();

        res.json({
          status: 200,
          message: "Room Created Successfully",
          data: data[0].createdRoom,
        });
        break;
      } else res.json({ status: 400, message: "Room already exist" });
  }
}
