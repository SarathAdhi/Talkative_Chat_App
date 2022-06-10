import { onValue, ref, set } from "firebase/database";
import { dbDatabase } from "../../../lib/firebase";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { email } = req.body;

      const roomsRef = ref(dbDatabase, "rooms");
      onValue(
        roomsRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const result = Object.values(data);
            const filteredData = result.filter(
              ({ adminEmail }) => adminEmail === email
            );
            return res.status(200).json(filteredData);
          }
          return res.status(200).json([]); // must send an empty array
        },
        {
          onlyOnce: true,
        }
      );
  }
}
