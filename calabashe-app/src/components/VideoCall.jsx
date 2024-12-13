import {CallControls, CallingState, SpeakerLayout, StreamTheme, useCallStateHooks} from "@stream-io/video-react-sdk";
import ClipLoader from "react-spinners/ClipLoader";
import '@stream-io/video-react-sdk/dist/css/styles.css';

const VideoCall = () => {
  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return (
        <div>
          <ClipLoader size={30}/>
        </div>)
  }
  
  return (
      <StreamTheme>
        <SpeakerLayout participantsBarPosition='bottom' />
        <CallControls />
      </StreamTheme>
  )
}
export default VideoCall;