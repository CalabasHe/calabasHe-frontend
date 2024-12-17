import {CallControls, CallingState, SpeakerLayout, StreamTheme, useCallStateHooks} from "@stream-io/video-react-sdk";
import ClipLoader from "react-spinners/ClipLoader";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { toast } from "sonner";

const VideoCall = () => {
  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState === CallingState.JOINED) {
    toast.dismiss();
  }
  if (callingState === CallingState.LEFT) {
    return (
      <div className="text-center text-2xl">
        Call has ended
      </div>
    )
  }
  return (
      <StreamTheme>
        <SpeakerLayout participantsBarPosition='bottom' />
        <CallControls />
      </StreamTheme>
  )
}
export default VideoCall;