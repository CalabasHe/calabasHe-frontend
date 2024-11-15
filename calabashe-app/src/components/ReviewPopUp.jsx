import { CgClose } from "react-icons/cg";
import Stars from "./Star";
import { useState } from "react";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import { verifyGuestIdentity } from "../api/anonReviews";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ReviewPopUp = ({ showPopUp, hidePopUp, submitGuestReview }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);
    const [codeDigits, setCodeDigits] = useState(Array(6).fill(''));
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(false);
    const go = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        submitGuestReview(username, email);
        setIsLoading(true);
        setSubmitStatus(true);
        // setTimeout(() => {
        //     setIsLoading(false);
        //     setSubmitStatus(true);
        //     console.log("here")
        // }, 1000);
    };

    const verifyCode = async (e) => {
        e.preventDefault();
        setDisabled(true);
        const verification_code = codeDigits.join('');
        let message;
        let status;

        if (verification_code.length !== 6) {
            setError("Invalid verification code");
            return;
        }

        try {

            const response = await verifyGuestIdentity({ email, verification_code });

            if (response && response.status === 200) {
                toast.success("Review was successful");
                go("/");
            } else {
                setError("Invalid verification code");
            }
        } catch (error) {
            setError(error?.message || "An error occurred during verification");
            setDisabled(false);
        }
    };


    const handleCodeChange = (e, index) => {
        const value = e.target.value;
        if (e.key === 'Backspace') {
            const newCodeDigits = [...codeDigits];
            newCodeDigits[index] = '';
            setCodeDigits(newCodeDigits);

            if (index > 0) {
                document.getElementById(`reset-code-${index - 1}`).focus();
            }
        } else if (/^\d$/.test(value)) {
            const newCodeDigits = [...codeDigits];
            newCodeDigits[index] = value;
            setCodeDigits(newCodeDigits);

            if (index < 5) {
                document.getElementById(`reset-code-${index + 1}`).focus();
            }
        }
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleName = (e) => {
        setUsername(e.target.value);
    }

    if (!showPopUp) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-20 flex items-center justify-center">
            {submitStatus ? (
                <form className="bg-white w-[92%] md:w-[50%] shadow-md rounded-md z-30 py-3 relative flex flex-col" onSubmit={verifyCode}>
                    <div className="p-2 flex items-center justify-between w-full">
                        <h1 className="text-lg flex-grow text-center ml-10">Verify Email</h1>
                        <button className="hover:bg-green-400 p-2 ml-auto" onClick={hidePopUp}>
                            <CgClose size={23} className="mx-auto" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-1 text-center mb-6">

                        <label className="text-sm md:text-base mb-2" htmlFor="reset-code">Enter the code sent to your mail</label>
                        <div className="w-full flex items-center justify-center gap-3">
                            {codeDigits.map((_, index) => (
                                <input
                                    key={index}
                                    onChange={(e) => handleCodeChange(e, index)}
                                    onKeyDown={(e) => handleCodeChange(e, index)}
                                    value={codeDigits[index]}
                                    className="w-10 md:size-14 h-10 border-black bg-inherit border-1 rounded-md text-center text-lg font-medium focus:outline-none"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    id={`reset-code-${index}`}
                                />
                            ))}
                        </div>
                        <div className="text-red-600">{error && "Invalid verification code"}</div>
                    </div>
                    <button className="bg-[#FEE330] w-[65%] py-2 self-center text-lg font-semibold rounded-md" type="submit" disabled={disabled}>Submit review</button>
                </form>
            ) : (
                showPopUp && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white w-[92%] md:w-[50%] shadow-md rounded-md z-30 py-3 relative"
                    >
                        <div className="flex justify-between items-center px-3">
                            <h2 className="text-2xl m-2 font-semibold">Confirm Identity</h2>
                            <button className="hover:bg-green-400" onClick={hidePopUp}>
                                <CgClose size={23} className="mx-auto" />
                            </button>
                        </div>
                        {isLoading ? (
                            <div className="flex justify-center py-3">
                                <ClipLoader color="#35e81f" size={50} />
                            </div>
                        ) : (
                            <form
                                className="w-full h-full flex items-center justify-center"
                                onSubmit={handleSubmit}
                            >
                                <div className="w-full flex flex-col p-6 py-3 space-y-4 md:space-y-8">
                                    <div className="w-full flex gap-1 flex-col">
                                        <label className="font-normal text-md" htmlFor="name">
                                            Name
                                        </label>
                                        <input
                                            className="w-full border rounded px-1 py-2 bg-inherit placeholder:text-sm focus:outline-none"
                                            type="text"
                                            id="name"
                                            placeholder="Enter Name"
                                            required
                                            value={username}
                                            onChange={handleName}
                                        />
                                    </div>
                                    <div className="w-full flex gap-1 flex-col">
                                        <label className="font-normal text-md" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            className="w-full border rounded px-1 py-2 bg-inherit placeholder:text-sm focus:outline-none"
                                            type="email"
                                            id="email"
                                            placeholder="Enter Email"
                                            required
                                            value={email}
                                            onChange={handleEmail}
                                        />
                                    </div>
                                    <button
                                        className="bg-[#FEE330] w-full py-2 text-lg font-semibold rounded-md"
                                        type="submit"
                                    >
                                        Confirm Email
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                )
            )}
        </div>
    )
};

export default ReviewPopUp;
