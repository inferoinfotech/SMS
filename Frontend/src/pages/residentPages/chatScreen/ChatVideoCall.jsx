import React, { useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import "./style.css";
import { useLocation, useParams } from 'react-router-dom';

const ChatVideoCall = ({ selectedUser, roomId }) => {
// const ChatVideoCall = () => {

  const location = useLocation();
  const currentUrl = location.pathname;;
  // const { selectedUser } = location.state || {};
  // const {roomId} = useParams();
  console.log("VideoCall User RoomID:", roomId);
  console.log("VideoCall User currentUrl:", currentUrl);
  console.log("Selected User User Dataaaaaaaaaaaaaaaaa:", selectedUser);

  const id = selectedUser._id;
  const name = selectedUser.firstName+"_"+selectedUser.lastName;
  // const id = 123456;
  // const name = "Hello";
  const inSocietyChatApp = async (element) => {
    // SAVAN_CONFIGURATION
    // const appID = 1757979495;
    // const serverSecret = "04f46682ad34e9005b14d629441180e3";

    // RONAK_CONFIGURATION
    const appID = 1693130381;
    const serverSecret = "fad712a8f399461b5d76d84fb017eecf";
    const roomID = roomId;
    const userID = id;
    const userName = name;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      id,
      userName
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url: `http://localhost:3030${currentUrl}`
        },
      ],
      roomID: roomID,
      userID: userID,
      userName: userName,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      onUserAvatarSetter: (userList) => {
        userList.forEach((user) => {
          user.setUserAvatar("/assets/images/Avatar-2.png");
        });
      },
    });
  };

  useEffect(() => {
    const videoCallDiv = document.getElementById("video-call-container");
    if (videoCallDiv) {
      inSocietyChatApp(videoCallDiv);
    }
  }, [inSocietyChatApp]);
  return (
        <div
          id="video-call-container"
          className="video-call-container bg-white"
          style={{ width: "100%" }}
          ref={inSocietyChatApp}
        />
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    //   <div className="bg-whiterounded-lg relative">
    //   </div>
    // </div>
  );
};

export default ChatVideoCall;
