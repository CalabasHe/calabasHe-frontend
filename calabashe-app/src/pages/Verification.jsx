import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyCode } from "../api/authApi";
import Countdown from "../components/verificationtimer";
import { useAuth } from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
const VerifyUser = ({ email, duration }) => {
  const [verificationCode, setVerificationCode] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);

  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { login } = useAuth()

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const { value } = e.target;
  
    // checks if the user is entering a number
    // concatenates the number inputs into one code
    if (/^\d$/.test(value)) {  
      setVerificationCode((prevCode) => {
        const newCode = [...prevCode];
        newCode[index] = value;
        const updatedCode = newCode.join("");
  
        // Automatically verify if all 6 digits are entered
        if (updatedCode.length === 6) {
          handleVerify(updatedCode);
        }
        return newCode;
      });
  
      // Moves focus to the next input if the box in focus not at the last one
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } 
    // If the user is clearing the input (backspace)
    else if (value === "") {
      setVerificationCode((prevCode) => {
        const newCode = [...prevCode];
        newCode[index] = value;
        return newCode;
      });
  
      // Move focus to the previous input
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  

  const handleVerify = async (code) => {
    try {
      const response = await verifyCode({ email, verification_code: code });
      setSuccess("Verification successful! Your account is now active.");
      setError("");
      setVerificationCode(new Array(6).fill(""));
      setIsModalOpen(false);
      login(response.access, response.refresh);
      navigate('/home');
    } catch (error) {
      // console.error(error);
      setError(error.message || "Failed to verify code");
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
        <form className="flex flex-col gap-4 items-center" onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">Enter verification code</h2>
          <div className="flex gap-x-3" data-hs-pin-input="">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="tel"
                maxLength={1}
                className="block w-[30px] h-[30px] sm:w-[38px] sm:h-[38px] text-center border-gray-400 rounded-md text-base focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="⚬"
                ref={(ref) => (inputRefs.current[index] = ref)}
                onChange={(e) => handleChange(e, index)}
                value={verificationCode[index]}
              />
            ))}
          </div>
          <Countdown duration={duration} />
          {error && <p className="text-xs text-red-500">{error}</p>}
          {success && <p className="text-xs text-green-700">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default VerifyUser;
