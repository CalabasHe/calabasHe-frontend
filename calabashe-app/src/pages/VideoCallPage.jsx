import { useState } from "react";
import { toast } from "sonner";
import { StreamCall, StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
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
  const [call, setCall] = useState();
  const [userId, setUserId] = useState(getUserId());
  const [callId, setCallId] = useState(id);
  const apiKey = "5p5srr7vwkd3";

  let client;
  const access = getCookie("accessToken");
  const userType = localStorage.getItem("userType");
  const email = localStorage.getItem("email");
  const name = userType === "doctor"?"Dr "+ sessionStorage.getItem("userName") : sessionStorage.getItem("userName") ;
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
      const client = new StreamVideoClient({ apiKey, user, token });
      await client.connectUser({ id: userId }, token);

      const newCall = client.call('default', callId);
      await newCall.join({ create: true });
      setCall(newCall);
    } catch (e) {
      // console.log(e);
      toast.error("Failed to join call");
    }
  }
  return (
    <div className="bg-red-50 h-screen flex flex-col min-h-screen">
      <Header />
      <div className="pt-20 md:pt-32 lg:pt-16 flex items-center justify-center md:h-[90vh] w-full">
        {call ?
          (
            <StreamVideo client={client}>
              <StreamCall call={call}>
                <VideoCall />
              </StreamCall>
            </StreamVideo>
          ) :
          (
            <div className="flex flex-col md:flex-row w-[85%]  items-center mx-auto h-max">
              {/* <input
                      type='text'
                      placeholder='Enter User Id'
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                  />
                  <input type='text' placeholder='Enter Call Id' value={callId}
                         onChange={(e) => setCallId(e.target.value)}/> */}
              <div className="w-full md:w-[45%] order-2">
                <img src={callImage} alt="Video call" aria-hidden className="w-full "/>
              </div>
              <div className="w-full md:w-[60%] flex gap-4 flex-col order-1 items-center md:items-start text-center md:text-start">
                <h1 className="text-4xl md:text-5xl font-extrabold">Join instant video consultation</h1>
                <p className="w-full md:w-[80%] leading-tight">Connect Instantly with Doctors for Personalized Video Consultations Anytime, Anywhere</p>

                <div className="w-[55%] flex flex-col">
                  <label htmlFor="Meeting" className="text-gray-500 ml-2">Meeting ID</label>
                  <input type='text' value={callId}
                    onChange={(e) => setCallId(e.target.value)} className="p-2 rounded-xl border-gray-400" placeholder="Eg. Booking-bffc319b-1aec-4d16-b.." />
                </div>

                <button onClick={handleJoinCall} className="w-[45%] bg-custom-yellow font-bold p-2 rounded-lg hover:bg-yellow-400">Join Call</button>
              </div>
            </div>
          )}
      </div>
      <div className="text-center text-lg text-gray-500 mt-5 md:mt-0  flex-grow flex max-h-[200px] mb-2 w-full">
        <p className="mt-auto w-full"> ©2024, CalabasHe All rights reserved. Privacy & Legal Policies</p>
      </div>
    </div>
  )
}

export default VideoCallPage