import React, { useEffect, useRef, useState } from "react";

const VideoCall = ({ roomName }) => {
  const jitsiContainerRef = useRef(null);
  const [isAllowedTime, setIsAllowedTime] = useState(false);

  useEffect(() => {
    const now = new Date();
    const isFriday = now.getDay() === 5;
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const isAfter1120PM = (hours > 23) || (hours === 23 && minutes >= 20);
    setIsAllowedTime(isFriday && isAfter1120PM);
  }, []);

  useEffect(() => {
    if (!isAllowedTime) return;

    if (window.jitsiApi) {
      window.jitsiApi.dispose();
    }

    const loadJitsiScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://meet.jit.si/external_api.js";
        script.async = true;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    };

    const startConference = async () => {
      if (!window.JitsiMeetExternalAPI) {
        await loadJitsiScript();
      }

      const domain = "meet.jit.si";
      const options = {
        roomName: roomName || "MyCoolMultiUserRoom",
        parentNode: jitsiContainerRef.current,
        width: "100%",
        height: "100%",
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
        },
        userInfo: {
          displayName: "Guest",
        },
      };

      window.jitsiApi = new window.JitsiMeetExternalAPI(domain, options);
    };

    startConference();

    return () => {
      if (window.jitsiApi) {
        window.jitsiApi.dispose();
      }
    };
  }, [roomName, isAllowedTime]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {isAllowedTime ? (
        <div
          id="jitsi-container"
          ref={jitsiContainerRef}
          style={{ height: "100%", width: "100%" }}
        ></div>
      ) : (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#555",
            textAlign: "center",
            padding: "20px",
          }}
        >
          Video Call is only available on <br /> Fridays after 11:20 PM.
        </div>
      )}
    </div>
  );
};

export default VideoCall;
