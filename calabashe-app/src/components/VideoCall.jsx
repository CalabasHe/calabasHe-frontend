"use client"

import {
  CallControls,
  CallingState,
  StreamTheme,
  useCallStateHooks,
  SpeakerLayout,
  PaginatedGridLayout
} from "@stream-io/video-react-sdk"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import "../stylesheets/video.css"

const VideoCall = () => {
  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()
  const [theme] = useState("dark")

  useEffect(() => {
    if (callingState === CallingState.JOINED) {
      toast.dismiss()
    }
  }, [callingState])

  if (callingState === CallingState.LEFT) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-200">Call has ended</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">You can close this window</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full mt-14 md:mt-20 lg:mt-24">
      <StreamTheme theme={theme}>
        <div className="str-video__container">
          <div className="relative h-max md:mt-7 lg:mt-2 lg:h-[calc(100vh-180px)]">
            <div className="md:hidden">
              <SpeakerLayout participantsPerPage={2} />
            </div>
            <div className="hidden md:block str-video__grid-layout h-[30vh]">
              <PaginatedGridLayout participantsPerPage={4} />
            </div>
          </div>
          <div className="fixed bottom-0 md:-bottom-8 lg:bottom-4 left-0 right-0 flex justify-center pb-4 lg:pb-0">
            <div className="rounded-full bg-gray-800/80 p-2 backdrop-blur">
              <CallControls />
            </div>
          </div>
        </div>
      </StreamTheme>
    </div>
  )
}

export default VideoCall

