import {useState} from "react";
import {toast} from "sonner";
import {StreamCall, StreamVideo, StreamVideoClient} from "@stream-io/video-react-sdk";
import VideoCall from "../components/VideoCall.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import { getCookie } from "../utils/cookies.jsx";

// const API_URL = 'https://calabashe-api.onrender.com/api/bookings/create-token/';
const API_URL = 'http://localhost:3000/token';
const VideoCallPage = () => {
  const [call, setCall] = useState(null);
  const [userId, setUserId] = useState('');
  const [callId, setCallId] = useState('');
  const apiKey ="sk52bzg3hgfh";
  
  let client;
  const access = getCookie("accessToken");
  const userType = localStorage.getItem("userType");
  const email = localStorage.getItem("email");

  const handleJoinCall = async () => {
    try {
      let response;
      if (userType === "doctor") {
        response = await axios.post(API_URL, 
          { email }
        );  
      } else {
        response = await axios.post(API_URL, 
          { user_id: "b1909b91-826b-4bb8-b392-45a73cb0a78e"},
          {
            headers: {
              Authorization: `Bearer ${access}`
            },
          }
        );  
      } 
      const token = response.data.token;

      const client = new StreamVideoClient({ apiKey, token});
      await client.connectUser({id: "b1909b91-826b-4bb8-b392-45a73cb0a78e"}, token);
      
      const newCall = client.call('default', callId);
      await newCall.join({create: true});
      setCall(newCall);
    } catch (e) {
      console.log(e);
      toast.error("Failed to join call");
    }
  }
  return (
      <div>
        <Header/>
        <div className="h-screen flex items-center justify-center h-screen bg-white rounded-md">
          {call ?
            (
                <StreamVideo client={client}>
                  <StreamCall call={call}>
                    <VideoCall/>
                  </StreamCall>
                </StreamVideo>
            ) :
            (
                <div>
                  <input
                      type='text'
                      placeholder='Enter User Id'
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                  />
                  <input type='text' placeholder='Enter Call Id' value={callId}
                         onChange={(e) => setCallId(e.target.value)}/>
                  <button onClick={handleJoinCall}>Join Call</button>
                </div>
            )}</div>
        <Footer/>
      </div>
  )
}

export default VideoCallPage