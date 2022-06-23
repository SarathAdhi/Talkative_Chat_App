import { doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Input } from "../../common/components/elements/Input";
import { LinkedItem } from "../../common/components/elements/LinkedItem";
import { H2, H3 } from "../../common/components/elements/Text";
import { PageLayout } from "../../common/layouts/PageLayout";
import { dbFireStore, userCollectionRef } from "../../lib/firebase";
import { showSuccessToast, showWarningToast } from "../../utils/Toast";
import Axios from "../../lib/axios";

export default function Profile({ userDataSSR }) {
  const [hashName, setHashName] = useState("");

  const router = useRouter();

  async function updateYourHashTag() {
    if (hashName[0] !== "@") {
      showWarningToast({ title: "Hash Name must start with @" });
      return;
    }

    const _query = query(userCollectionRef, where("hashName", "==", hashName));
    const querySnapshot = await getDocs(_query);
    const isHashNameExist = querySnapshot.docs.map((doc) => {
      return doc.data();
    });

    console.log("---->", isHashNameExist);

    if (isHashNameExist.length === 0) {
      const roomDocRef = doc(dbFireStore, "users", userDataSSR.id);
      await updateDoc(roomDocRef, {
        hashName: hashName,
      });
      showSuccessToast({ title: "Successfully updated the Hash-Name." });
      router.replace("/profile");
    } else {
      showWarningToast({ title: "Hash-Name already exist." });
    }
  }

  return (
    <PageLayout className="items-center">
      <div className="flex flex-col items-center gap-2 mt-10">
        <img className="w-40 rounded-full" src={userDataSSR.image} />
        <H2>{userDataSSR.name}</H2>
        <H3>{userDataSSR.email}</H3>
        {userDataSSR.hashName ? (
          <>
            <H3>{userDataSSR.hashName}</H3>
            <LinkedItem href="/" className="mt-10 underline">
              Go Back to Home
            </LinkedItem>
          </>
        ) : (
          <div className="flex flex-col gap-2 items-center mt-5">
            <p className="text-sm sm:w-72 text-center">
              Hash-name is used to identify you as an individual person. It is
              like an unique username. For example: @JoeDoe
            </p>
            <div className="flex gap-2 flex-col md:flex-row items-center">
              <Input
                placeholder="Create your @HashName"
                onChange={(e) => setHashName(e.target.value)}
              />
              <button
                onClick={() => updateYourHashTag()}
                className="bg-green-600 py-1 px-2 rounded-lg"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
    };
  }

  const { data } = await Axios.post("/user", {
    token: process.env.API_TOKEN,
    email: session.user.email,
  });

  return {
    props: {
      userDataSSR: data.data[0],
    },
  };
}
