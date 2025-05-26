"use client"

import {
  CallControls,
  CallingState,
  StreamTheme,
  useCallStateHooks,
  ParticipantView
} from "@stream-io/video-react-sdk"
import {toast} from "sonner"
import {useEffect} from "react";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import "../stylesheets/video.css";


const getGridConfig = (count) => {
  if (count <= 1) return 'grid-cols-1';
  if (count === 2) return 'grid-cols-1 md:grid-cols-2';
  if (count === 3)   return 'grid grid-cols-2 md:grid-cols-2 gap-4 md:[&>*:first-child]:col-span-2';
  if (count <= 4)  return 'grid grid-cols-2 md:grid-cols-2 gap-4';
  if (count <= 6) return 'grid-cols-2 md:grid-cols-3';
  if (count <= 9) return 'grid-cols-3 md:grid-cols-3';
  return 'grid-cols-4 md:grid-cols-4';
};



const VideoCall = () => {
  const {useCallCallingState, useParticipants} = useCallStateHooks()
  const participants = useParticipants()
  const callingState = useCallCallingState();

  useEffect(() => {
    if (callingState === CallingState.JOINED) {
      toast.dismiss()
    }
  }, [callingState])

  if (callingState === CallingState.LEFT) {
    return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-gray-800">Call has ended</h2>
            <p className="mt-2 text-gray-600 ">You can close this window</p>
          </div>
        </div>
    )
  }

  return (
      <div className="mt-14">
        <StreamTheme>
          <div className="stream-container">
            <div className="stream-grid  mt-8 align-top">
              <div className={`grid ${getGridConfig(participants.length)} gap-2 sm:gap-4 h-full w-full mx-auto ${participants.length <= 2? "w-full": "md:w-[55%] lg:mt-1 lg:w-[42%]"}`}>
                {participants.map((p) => (
                    <div key={p.sessionId} className={`participant-card ${participants.length <= 2? "h-[70vh] w-full": "h-full max-h-full"}`}>
                      <ParticipantView
                          participant={p}
                          className="participant-view"
                      />
                    </div>
                ))}
              </div>
            </div>
            <div className="call-controls w-full pt-0">
              <CallControls/>
            </div>
          </div>
        </StreamTheme>
      </div>
  )
}

export default VideoCall

