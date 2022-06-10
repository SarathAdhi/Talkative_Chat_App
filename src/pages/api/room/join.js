import clientPromise from "../../../lib/db";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("Database");
  switch (req.method) {
    case "POST":
      let { name, email, roomId } = req.body;

      const isRoomExist = await db
        .collection("users")
        .find({
          createdRoom: { $eq: roomId },
        })
        .toArray();

      if (isRoomExist.length !== 0) {
        await db.collection("users").updateOne(
          { email: email },
          {
            $push: {
              joinedRoom: roomId,
            },
          }
        );
        const data = await db
          .collection("users")
          .find({ email: email })
          .toArray();

        await db.collection("rooms").updateOne(
          { roomId: roomId },
          {
            $push: {
              members: {
                name: name,
                email: email,
              },
            },
          }
        );

        res.json({
          message: "Joined Room Successfully",
          data: data[0].createdRoom,
        });
        break;
      } else res.json({ status: 400, message: "Room didn't exist." });
  }
}
