import { addDoc, getDocs, query, where } from "firebase/firestore";
import { userCollectionRef } from "../../../lib/firebase";

export default async function handler(req, res) {
  const { token } = req.body;

  switch (req.method) {
    case "POST":
      const { name, email, image } = req.body;

      // const URL_Snapshot = await getDocs(userCollectionRef);
      // const isUserExist = URL_Snapshot.docs
      //   .map((doc) => doc.data())
      //   .filter((data) => {
      //     return data.email === email;
      //   })
      //   .map((data) => {
      //     return data;
      //   });

      const _query = query(userCollectionRef, where("email", "==", email));
      const querySnapshot = await getDocs(_query);
      const isUserExist = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      if (isUserExist.length === 0) {
        const newUser = {
          email,
          name,
          image,
          hashName: "",
          notifications: [],
          friends: [],
        };
        await addDoc(userCollectionRef, newUser);

        res.json({ status: 200, message: "New account created successfully" });
      } else {
        res.json({ status: 200, message: "Login successful" });
      }

      break;
  }
}
