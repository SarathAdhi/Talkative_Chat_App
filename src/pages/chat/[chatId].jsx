import {
  MicrophoneIcon,
  PaperAirplaneIcon,
  StopIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { H3, P } from "../../common/components/elements/Text";
import { Context } from "../../common/context/Context";
import { PageLayout } from "../../common/layouts/PageLayout";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import DropDownOptions from "../../common/components/elements/DropDownOptions";
import clsx from "clsx";
import { showErrorsToast, showWarningToast } from "../../utils/Toast";
import { getSession } from "next-auth/react";
import { onSnapshot, query, where } from "firebase/firestore";
import { chatCollectionRef } from "../../lib/firebase";
import Axios from "../../lib/axios";

export default function ChatRoom({ chatDetails }) {
  const router = useRouter();
  const { hashName, chatId } = router.query;

  const [roomChats, setRoomChats] = useState("");
  const [typedMessage, setTypedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { _user } = useContext(Context);
  const [userDetails, setUserDetails] = _user;

  const { _userChats } = useContext(Context);
  const [userChatDetails, setUserChatDetails] = _userChats;

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: false });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  useEffect(() => {
    const _query = query(chatCollectionRef, where("chatId", "==", `${chatId}`));

    onSnapshot(_query, (data) => {
      const result = data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });

      setRoomChats(...result);
    });
  }, []);

  useEffect(() => {
    if (transcript !== "") setTypedMessage(transcript);
  }, [transcript]);

  useEffect(() => {
    if (userChatDetails.status === 400) {
      showErrorsToast({ title: chatDetails.message });
      router.replace("/");
    } else {
      setRoomChats(chatDetails);
      setIsLoading(false);
    }
  }, [chatDetails]);

  const options = [
    {
      Icon: StopIcon,
      onClick: () => {
        SpeechRecognition.stopListening();
        setTypedMessage(transcript);
      },
      active: false,
    },
  ];

  const addMessageToTheConversion = async () => {
    if (typedMessage === "") showWarningToast({ title: "Message is empty." });
    else {
      await Axios.post("/chat/message", {
        name: userDetails.name,
        hashName: userDetails.hashName,
        docId: roomChats.id,
        message: typedMessage,
      });

      setTypedMessage("");
    }
  };

  return (
    <PageLayout className="gap-2">
      <div className="w-full px-2 h-12 flex items-center rounded-xl">
        <H3>{hashName}</H3>
      </div>

      <div className="scroll-smooth w-full h-full p-2 flex flex-col gap-5 bg-[#7A0BC0]/20 shadow-xl backdrop-blur-xl border-[1px] border-white/20 rounded-xl overflow-x-hidden overflow-y-auto">
        {roomChats &&
          roomChats.messages?.map((info, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  "w-full flex flex-col",
                  info.hashName === userDetails.hashName
                    ? "items-end pl-10 sm:pl-60"
                    : "items-start pr-10 sm:pr-60"
                )}
              >
                <P
                  className={clsx(
                    "relative pb-3 px-2 py-1 flex gap-2 items-center rounded-md",
                    info.hashName === userDetails.hashName
                      ? "bg-[#265b4c]"
                      : "bg-[#222c32]"
                  )}
                >
                  {info.message}
                  <div className="w-[45px] pl-5">
                    <P className="!text-[10px] absolute bottom-0 right-1">
                      {info.time}
                    </P>
                  </div>
                </P>
              </div>
            );
          })}
        <span id="bottom" className="-mt-6" />
      </div>

      <div className="w-full relative flex flex-col justify-center items-center">
        <p className="fixed mb-[100px] right-20 z-50">
          {listening ? "Microphone: on" : ""}
        </p>
        <div className="w-full flex justify-center items-center bg-white rounded-lg">
          <textarea
            value={typedMessage}
            className="w-full p-2 resize-none text-black placeholder:text-sm focus:outline-none rounded-lg"
            placeholder="Type your message... Ctrl + Enter to send message"
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === "Enter") {
                addMessageToTheConversion();
              }
            }}
            onChange={(e) => {
              resetTranscript();
              setTypedMessage(e.target.value);
            }}
          ></textarea>
          <div className="mx-2 cursor-pointer">
            {!transcript && typedMessage ? (
              <PaperAirplaneIcon
                className="w-5 sm:w-7 rotate-90 text-black"
                onClick={addMessageToTheConversion}
              />
            ) : (
              <DropDownOptions
                Icon={
                  <MicrophoneIcon
                    className="w-5 sm:w-7 text-black"
                    onClick={startListening}
                  />
                }
                isPopUp={true}
                options={options}
              />
            )}
          </div>
        </div>
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
  const { chatId } = context.query;
  const { data } = await Axios.post("/chat", {
    chatId,
  });
  // console.log(response.data);

  return {
    props: {
      chatDetails: data.data,
    },
  };
}
