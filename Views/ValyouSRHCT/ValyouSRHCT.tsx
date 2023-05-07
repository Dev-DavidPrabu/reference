import React, { useRef, useState } from "react";
import "./ValyouSRHCT.scss";
import { JitsiMeeting } from "@jitsi/react-sdk";

function ValyouSRHCT() {
  const apiRef: any = useRef();
  const [logItems, updateLog]: any = useState([]);
  const [showNew, toggleShowNew] = useState(false);
  const [knockingParticipants, updateKnockingParticipants]: any = useState([]);

  const printEventOutput = (payload: any) => {
    updateLog((items: any) => [...items, JSON.stringify(payload)]);
  };

  const handleAudioStatusChange = (payload: any, feature: any) => {
    if (payload.muted) {
      updateLog((items: any) => [...items, `${feature} off`]);
    } else {
      updateLog((items: any) => [...items, `${feature} on`]);
    }
  };

  const handleChatUpdates = (payload: any) => {
    if (payload.isOpen || !payload.unreadCount) {
      return;
    }
    apiRef?.current?.executeCommand("toggleChat");
    updateLog((items: any) => [
      ...items,
      `you have ${payload.unreadCount} unread messages`,
    ]);
  };

  const handleKnockingParticipant = (payload: any) => {
    updateLog((items: any) => [...items, JSON.stringify(payload)]);
    updateKnockingParticipants((participants: any) => [
      ...participants,
      payload?.participant,
    ]);
  };

  const resolveKnockingParticipants = (condition: any) => {
    knockingParticipants.forEach((participant: any) => {
      apiRef.current.executeCommand(
        "answerKnockingParticipant",
        participant?.id,
        condition(participant)
      );
      updateKnockingParticipants((participants: any) =>
        participants.filter((items: any) => items.id === participant.id)
      );
    });
  };

  const handleJitsiIFrameRef1 = (iframeRef: any) => {
    iframeRef.style.border = "10px solid #3d3d3d";
    iframeRef.style.background = "#3d3d3d";
    iframeRef.style.height = "400px";
  };

  const handleJitsiIFrameRef2 = (iframeRef: any) => {
    iframeRef.style.marginTop = "10px";
    iframeRef.style.border = "10px dashed #df486f";
    iframeRef.style.padding = "5px";
    iframeRef.style.height = "400px";
  };

  const handleApiReady = (apiObj: any) => {
    apiRef.current = apiObj;
    apiRef.current.on("knockingParticipant", handleKnockingParticipant);
    apiRef.current.on("audioMuteStatusChanged", (payload: any) =>
      handleAudioStatusChange(payload, "audio")
    );
    apiRef.current.on("videoMuteStatusChanged", (payload: any) =>
      handleAudioStatusChange(payload, "video")
    );
    apiRef.current.on("raiseHandUpdated", printEventOutput);
    apiRef.current.on("titleViewChanged", printEventOutput);
    apiRef.current.on("chatUpdated", handleChatUpdates);
    apiRef.current.on("knockingParticipant", handleKnockingParticipant);
  };

  const handleReadyToClose = () => {
    alert("Ready to close...");
  };

  const generateRoomName = () =>
    `JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`;

  const renderNewInstance = () => {
    if (!showNew) {
      return null;
    }

    return (
      <JitsiMeeting
        roomName={generateRoomName()}
        getIFrameRef={handleJitsiIFrameRef2}
      />
    );
  };

  const renderButtons = () => (
    <div style={{ margin: "15px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          title="Click to execute toggle raise hand command"
          style={{
            border: 0,
            borderRadius: "6px",
            fontSize: "14px",
            background: "#f8ae1a",
            color: "#040404",
            padding: "12px 46px",
            margin: "2px 2px",
          }}
          onClick={() => apiRef.current.executeCommand("toggleRaiseHand")}
        >
          Raise hand
        </button>
        <button
          title="Click to approve/reject knocking participant"
          style={{
            border: 0,
            borderRadius: "6px",
            fontSize: "14px",
            background: "#0056E0",
            color: "white",
            padding: "12px 46px",
            margin: "2px 2px",
          }}
          onClick={() =>
            resolveKnockingParticipants(
              ({ name }: any) => !name.includes("test")
            )
          }
        >
          Resolve lobby
        </button>
        <button
          title="Click to execute subject command"
          style={{
            border: 0,
            borderRadius: "6px",
            fontSize: "14px",
            background: "#df486f",
            color: "white",
            padding: "12px 46px",
            margin: "2px 2px",
          }}
          onClick={() =>
            apiRef.current.executeCommand("subject", "New Subject")
          }
        >
          Change subject
        </button>
        <button
          title="Click to create a new JitsiMeeting instance"
          style={{
            border: 0,
            borderRadius: "6px",
            fontSize: "14px",
            background: "#3D3D3D",
            color: "white",
            padding: "12px 46px",
            margin: "2px 2px",
          }}
          onClick={() => toggleShowNew(!showNew)}
        >
          Toggle new instance
        </button>
      </div>
    </div>
  );

  const renderLog = () =>
    logItems.map((item: any, index: any) => (
      <div
        style={{
          fontFamily: "monospace",
          padding: "5px",
        }}
        key={index}
      ></div>
    ));

  const renderSpinner = () => (
    <div
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      Loading..
    </div>
  );

  return (
    <div className="primary_heading ">
      <h1
        style={{
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
      >
        Valyou SRHCT
      </h1>
      <JitsiMeeting
        roomName={generateRoomName()}
        spinner={renderSpinner}
        onApiReady={(externalApi) => handleApiReady(externalApi)}
        onReadyToClose={handleReadyToClose}
        getIFrameRef={handleJitsiIFrameRef1}
      />

      {renderNewInstance()}
      {renderLog()}
    </div>
  );
}

export default ValyouSRHCT;
