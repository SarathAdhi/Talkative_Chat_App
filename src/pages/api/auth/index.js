import clientPromise from "../../../lib/db";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("Database");
  switch (req.method) {
    case "POST":
      let { email, userImage } = req.body;

      const isEmailExist = await db
        .collection("users")
        .find({ email: email })
        .toArray();

      if (isEmailExist.length === 0) {
        await db.collection("users").insertOne({
          email: email,
          userImage: userImage,
          createdRomm: [],
          joinedRomm: [],
        });
        res.json({ message: "Created new account successfully" });
      } else {
        res.json({ message: "Logged In Successfully" });
      }

      break;
  }
}
