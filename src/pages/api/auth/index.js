import { addDoc, getDocs } from "firebase/firestore";
import { userCollectionRef } from "../../../lib/firebase";

export default async function handler(req, res) {
  const { token } = req.body;

  switch (req.method) {
    case "POST":
      const { name, email, image } = req.body;

      const URL_Snapshot = await getDocs(userCollectionRef);
      const isUserExist = URL_Snapshot.docs
        .map((doc) => doc.data())
        .filter((data) => {
          return data.email === email;
        })
        .map((data) => {
          return data;
        });

      if (isUserExist.length === 0) {
        const newUser = {
          email,
          name,
          image,
        };
        await addDoc(userCollectionRef, newUser);

        res.json({ status: 200, message: "Created successfully" });
      } else {
        res.json({ status: 200, message: "Login successfully" });
      }

      break;
  }
}
