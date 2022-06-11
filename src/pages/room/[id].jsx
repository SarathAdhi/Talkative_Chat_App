import {
  MicrophoneIcon,
  PaperAirplaneIcon,
  StopIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { H3 } from "../../common/components/elements/Text";
import { Context } from "../../common/context/Context";
import { PageLayout } from "../../common/layouts/PageLayout";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import DropDownOptions from "../../common/components/elements/DropDownOptions";
import axios from "axios";
import { Url } from "../../common/constants/Url";
import clsx from "clsx";
import { showWarningToast } from "../../utils/Toast";

export default function ChatRoom() {
  const router = useRouter();
  const { id } = router.query;

  const [roomChats, setRoomChats] = useState("");
  const [typedMessage, setTypedMessage] = useState("");

  const { _user } = useContext(Context);
  const [userDetails, setUserDetails] = _user;

  const { _userRooms } = useContext(Context);
  const [userRoomDetails, setUserRoomDetails] = _userRooms;

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
    if (transcript !== "") setTypedMessage(transcript);
  }, [transcript]);

  useEffect(() => {
    setRoomChats(
      userRoomDetails.find((data) => {
        return data.roomId === id;
      })
    );
  }, [userRoomDetails, id]);

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
      await axios.post(Url + "/room/message", {
        name: userDetails.name,
        email: userDetails.email,
        docId: roomChats.id,
        roomId: id,
        message: typedMessage,
      });

      setTypedMessage("");
    }
  };

  // console.log(roomChats);

  return (
    <PageLayout className="p-3 gap-2 rounded-b-none">
      <div className="w-full px-4 h-[75px] bg-[#160040]/90 backdrop-blur-xl flex justify-start items-center border-[1px] border-white/20 rounded-xl">
        <H3>Room ID: {id}</H3>
      </div>

      <div className="w-full h-full p-2 flex flex-col gap-5 bg-[#7A0BC0]/20 shadow-xl backdrop-blur-xl border-[1px] border-white/20 rounded-xl overflow-y-auto">
        {roomChats &&
          roomChats.messages.map((info, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  "w-full flex flex-col",
                  info.email === userDetails.email ? "items-end" : "items-start"
                )}
              >
                <H3 className="px-3 py-2 rounded-lg bg-black">
                  {info.message}
                </H3>
              </div>
            );
          })}
      </div>

      <div className="w-full relative flex flex-col justify-center items-center">
        <p className="fixed mb-[100px] right-20 z-50">
          {listening ? "Microphone: on" : ""}
        </p>
        <div className="w-full flex justify-center items-center bg-white rounded-lg">
          <textarea
            rows={2}
            value={typedMessage}
            className="w-full p-2 resize-none text-black focus:outline-none rounded-lg"
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
                className="w-7 rotate-90 text-black"
                onClick={addMessageToTheConversion}
              />
            ) : (
              <DropDownOptions
                Icon={
                  <MicrophoneIcon
                    className="w-7 text-black"
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
