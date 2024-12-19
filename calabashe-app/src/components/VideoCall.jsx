import { CallControls, CallingState, StreamTheme, useCallStateHooks, SpeakerLayout } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { useEffect } from "react";
import "../stylesheets/video.css";

const VideoCall = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  useEffect(() => {
    if (callingState === CallingState.JOINED) {
      toast.dismiss();
    }
  }, [callingState]);

  if (callingState === CallingState.LEFT) {
    return (
      <div className="text-center text-2xl my-10">
        Call has ended
      </div>
    );
  }

  return (
    <div className="video-call-container">
      <StreamTheme className="str-video">
        <SpeakerLayout participantsPerPage={6} />
        <CallControls className="call-controls" />
      </StreamTheme>
    </div>
  );
};

export default VideoCall;
