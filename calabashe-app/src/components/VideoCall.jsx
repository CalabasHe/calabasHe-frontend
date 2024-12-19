import { CallControls, CallingState, StreamTheme, useCallStateHooks, PaginatedGridLayout } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import "../stylesheets/video.css";


const VideoCall = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (callingState === CallingState.JOINED) {
      toast.dismiss();
    }
  }, [callingState]);
  if (callingState === CallingState.LEFT) {
    return (
      <div className="text-center text-2xl">
        Call has ended
      </div>
    )
  }

  return (
    <StreamTheme className="str-video">
      <PaginatedGridLayout participantsPerPage={6} />
      <CallControls />
    </StreamTheme>

  )
}
export default VideoCall;