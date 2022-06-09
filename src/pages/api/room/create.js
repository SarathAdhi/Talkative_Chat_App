import clientPromise from "../../../lib/db";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("Database");
  switch (req.method) {
    case "POST":
      let { email, roomId } = req.body;

      const timeStamp = new Date().getTime();
      roomId = roomId + "-" + timeStamp;

      await db.collection("users").updateOne(
        { email: email },
        {
          $push: {
            createdRoom: roomId,
          },
        }
      );
      const data = await db
        .collection("users")
        .find({ email: email })
        .toArray();

      res.json({
        message: "Room Created Successfully",
        data: data[0].createdRoom,
      });
      break;
  }
}
