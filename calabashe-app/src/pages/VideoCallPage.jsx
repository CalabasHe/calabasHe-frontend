import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { StreamCall, StreamTheme, StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import VideoCall from "../components/VideoCall.jsx";
import Header from "../components/Header.jsx";
import axios from "axios";
import { getCookie } from "../utils/cookies.jsx";
import { getUserId } from "../utils/getUserId.jsx";
import callImage from '../assets/images/vidoe_call.png'
import { useParams } from "react-router-dom";

const API_URL = 'https://calabashe-api.onrender.com/api/bookings/create-token/';

const VideoCallPage = () => {
  const { id } = useParams();
  const access = getCookie("accessToken");
  const userType = localStorage.getItem("userType");

  const email = localStorage.getItem("email");

  const [call, setCall] = useState(null);
  const [userId, setUserId] = useState(getUserId());
  const [callId, setCallId] = useState(id);
  const apiKey = import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY;
  const clientRef = useRef();


  const name = userType === "doctor" ? ("Dr " + localStorage.getItem("userName")) : localStorage.getItem("userName");
  const user = {
    id: userId,
    name: name,
  }


  const handleJoinCall = async () => {
    try {
      toast.loading("Entering call");
      let response;
      if (userType === "doctor") {
        response = await axios.post(API_URL,
          { email }
        );
      } else {
        response = await axios.post(API_URL,
          { user_id: userId },
          {
            headers: {
              Authorization: `Bearer ${access}`
            },
          }
        );
      }
      const token = response.data.token;
      if (!clientRef.current) {
        clientRef.current = StreamVideoClient.getOrCreateInstance({ apiKey, user, token });
        await clientRef.current.connectUser({ id: userId }, token);
      }

      const newCall = clientRef.current.call('default', callId);


      // const role = userType === "doctor" ? "admin" : "user"; //Role switches otherwise
      await newCall.getOrCreate({ members: [{ user_id: userId}], });
      setCall(newCall);
      await newCall.join();
    } catch (e) {
      
      toast.error("Failed to join call");
    } finally {
      toast.dismiss();
    }
  }


  return (
    <div className={`relative overflow-x-hidden md:overflow-hidden  h-screen flex flex-col min-h-screen ${call? "bg-gray-500": "bg-red-50"} `}>
      {<Header />}
      <div className={`${call ? 'h-[90vh]' : 'pt-20 md:pt-32 lg:pt-16'} flex items-center justify-center ${!call && 'md:h-[90vh]'} w-full`}>
        {call ? (
          <div className="h-screen w-full mt-24">
            <StreamVideo client={clientRef.current}>
              <StreamCall call={call}>
                <VideoCall />
              </StreamCall>
            </StreamVideo>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row w-[85%] items-center mx-auto h-max">
            <div className="z-30 absolute top-[5%] md:top-[30%] -right-0">
              <svg width="87" height="143" viewBox="0 0 87 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M165.836 69.4802C175.608 87.3906 168.092 113.357 151.88 127.34C135.669 141.323 110.762 143.322 88.9353 142.578C67.1083 141.835 48.361 138.348 34.1125 128.387C19.864 118.425 10.1143 101.989 4.61238 83.5414C-0.857316 65.1167 -2.04702 44.7037 6.40774 28.1465C14.8625 11.5892 32.9617 -1.11216 50.4864 0.145775C68.0432 1.42632 84.9933 16.6436 106.999 29.1794C129.004 41.7153 156.064 51.5697 165.836 69.4802Z"
                  fill="#00C67F"
                />
              </svg>
            </div>
            <div className="z-20 absolute -top-32 md:top-0 -right-20 md:-right-8">
              <svg width="219" height="446" viewBox="0 0 219 446" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M350.506 81.8066C376.906 116.507 394.206 151.807 407.006 200.007C419.906 248.207 428.306 309.307 401.906 359.307C375.606 409.307 314.506 448.207 256.906 444.807C199.306 441.407 145.106 395.607 95.4061 345.607C45.7061 295.607 0.606066 241.407 0.0060657 186.607C-0.593934 131.807 43.4061 76.4066 93.1061 41.8066C142.706 7.10659 198.106 -6.89342 243.506 3.20658C288.906 13.2066 324.206 47.2066 350.506 81.8066Z"
                  fill="#FEE330"
                />
              </svg>
            </div>
            <div className="w-full md:w-[45%] order-2 z-30">
              <img src={callImage} alt="Video call" aria-hidden className="w-full" />
            </div>
            <div className="z-30 w-full md:w-[60%] flex gap-4 flex-col order-1 items-center md:items-start text-center md:text-start">
              <h1 className="text-4xl md:text-5xl font-extrabold">Join instant video consultation</h1>
              <p className="w-full md:w-[80%] leading-tight">
                Connect Instantly with Doctors for Personalized Video Consultations Anytime, Anywhere
              </p>
              <div className="w-[55%] flex flex-col">
                <label htmlFor="Meeting" className="text-gray-500 ml-2">Meeting ID</label>
                <input
                  type="text"
                  value={callId}
                  onChange={(e) => setCallId(e.target.value)}
                  className="p-2 rounded-xl border-gray-400"
                  placeholder="Eg. Booking-bffc319b-1aec-4d16-b.."
                />
              </div>
              <button onClick={handleJoinCall} className="w-[45%] bg-custom-yellow font-bold p-2 rounded-lg hover:bg-yellow-400">
                Join Call
              </button>
            </div>
          </div>
        )}
      </div>
      {!call && (
        <>
          <div className="z-30 absolute md:top-[60%] -left-20 md:-left-16 hidden md:block">
            <svg width="175" height="365" viewBox="0 0 175 365" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M120.533 26.0184C163.033 56.4114 179.933 126.1 172.533 188.217C165.133 250.333 133.333 304.774 90.833 334.656C48.333 364.537 -4.86694 369.654 -49.1669 360.546C-93.567 351.336 -128.867 327.799 -161.567 298.02C-194.167 268.139 -224.167 232.015 -241.867 177.676C-259.567 123.44 -264.967 51.0901 -232.267 20.6971C-199.567 -9.6959 -128.867 1.9701 -59.4669 3.30043C9.93304 4.63077 78.0331 -4.37456 120.533 26.0184Z"
                fill="#04DA8D"
              />
            </svg>
          </div>
          <div className="z-30 text-center text-lg text-gray-500 mt-5 md:mt-0 flex-grow flex max-h-[200px] mb-2 w-full">
            <p className="mt-auto w-full">©2024, CalabasHe All rights reserved. Privacy & Legal Policies</p>
          </div>
        </>
      )}
    </div>
  );
}

export default VideoCallPage