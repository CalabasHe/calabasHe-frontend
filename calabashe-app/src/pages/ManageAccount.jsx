import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import banner_image from '../assets/icons/Lady-With-Laptop.svg'
import { useNavigate } from "react-router-dom";
import ResetPassword from "../components/ResetPassword.jsx";
import { useState } from "react";

const ManageAccount = () => {
    const { logout, userProfile} = useAuth();
    const [showPopUp, setShowPopUp] = useState(false);
    const lastName = localStorage.getItem("lastName");
    const handlePopUp = (value) => {
        setShowPopUp(value);
    };
    const reviews = localStorage.getItem("myReviewsCount");

    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <div className="z-50 bg-red-50  overflow-hidden relative w-full max-h-none min-h-screen flex flex-col flex-1 items-center justify-center pt-16">
            <Header />
            <div className="w-full flex flex-1 items-center justify-center">
                <ResetPassword showPopUp={showPopUp} handlePopUp={handlePopUp}/>
                <main className="flex items-center md:items-start flex-col md:flex-row w-[80%]  my-8  container  max-h-[500px] rounded-lg border border-black p-5 pl-8">
                    <div className="w-full md:w-1/3 md:ml-16">
                        <div className="max-h-[300px] w-[85%] md:w-[95%] mx-auto aspect-square">
                            <img
                                src={userProfile || banner_image}
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="mx-auto w-[85%] md:w-[90%] mt-4">
                            <h2 className="text-2xl md:text-4xl font-bold mb-1">Dr {lastName}</h2>
                            <p>Reviews {reviews}</p>
                        </div>
                    </div>
                    <div className=" w-[85%] md:w-[45%] md:mx-auto md:px-10 py-2">
                        <div className="flex  flex-row items-center md:items-start md:flex-col border-b-2 border-gray-300 md:pb-3 gap-3 text-start" >
                            <p className="text-base md:text-xl font-semibold mb-1 ">Password</p>
                            <button onClick={() => setShowPopUp(true)} className=" text-xs md:text-sm text-gray-500 cursor-pointer"> Change Password</button>
                        </div>
                        <button onClick={handleLogout} className="mt-3 text-base md:text-xl">Sign Out</button>
                    </div>
                </main>
            </div>
            <Footer />

        </div>
    );
}

export default ManageAccount;