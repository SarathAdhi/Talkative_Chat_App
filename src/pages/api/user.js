import { addDoc, getDocs } from "firebase/firestore";
import { userCollectionRef } from "../../lib/firebase";

export default async function handler(req, res) {
  const { token } = req.body;

  switch (req.method) {
    case "POST":
      const { email } = req.body;

      const URL_Snapshot = await getDocs(userCollectionRef);
      const isUserExist = URL_Snapshot.docs
        .map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
        .filter((data) => {
          return data.email === email;
        })
        .map((data) => {
          return data;
        });

      res.json({ status: 200, data: isUserExist });

      break;
  }
}
