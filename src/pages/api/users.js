import clientPromise from "../../lib/db";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("Database");
  if (req.method === "GET") {
    const users = await db.collection("users").find({}).toArray();
    res.json({ status: 200, data: users });
  }
}
