import { CgClose } from "react-icons/cg";
import { useState} from "react";
import { doctorsAuth, facilitiesAuth } from "../api/providerLogin.js";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth.jsx";
import { validatePassword } from "../utils/validatePassword.jsx";
import { changePassword } from "../api/authApi.js";
// eslint-disable-next-line react/prop-types
const ResetPassword = ({ showPopUp, handlePopUp }) => {
  const [Newpassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [disabledForm, setDisabledForm] = useState(false);
  // const {modifyUserType} = useAuth();
  const [passwordHidden, setPasswordHidden] = useState({
    new_password: false,
    old_password: false,
    confirm_password: false
  });




  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    const err = validatePassword(e.target.value);
    setError(err);
  }
  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
    const err = validatePassword(oldPassword);
    setError(err);
  }
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    const err = validatePassword(e.target.value);
    setError(err);
  }
  const closeModal = () => {
    setNewPassword("");
    setOldPassword("");
    setConfirmPassword("");
    handlePopUp(false);
  }




  const handleReset = async (e) => {
    e.preventDefault();
    setDisabledForm(true);
    if (error.length > 0) {
      toast.error(error);
      setDisabledForm(false);
      return;
    }
    if (Newpassword === confirmPassword) {
      try {
        const email = localStorage.getItem('email');
        const userType = localStorage.getItem('userType');
        if (userType === 'doctor') {
          await doctorsAuth.changePassword({ email, old_password: oldPassword, new_password: Newpassword, confirm_password: confirmPassword });
        } else if (userType === 'facility') {
          await facilitiesAuth.changePassword({ email, old_password: oldPassword, new_password: Newpassword, confirm_password: confirmPassword })
        } else {
          await changePassword(oldPassword, Newpassword)
          
        }
        toast.success("Password reset successful!");
        handlePopUp(false);
        setOldPassword("");
        setConfirmPassword("");
        setNewPassword("");
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
        return error.message;
      } finally {
        setDisabledForm(false);
        toast.dismiss();
      }
    } else {
      toast.error("Passwords must Match");
      setDisabledForm(false);
      setTimeout(() => {
        toast.dismiss()
      }, 1000)
    }
  };


  return (
    showPopUp &&
    <div className="w-full fixed inset-0 bg-black bg-opacity-30 z-20 flex items-center justify-center">
      <div className="h-[70%] md:h-max  w-[90%] md:w-[40%] border flex flex-col gap-3 p-3 bg-white rounded-md">

        <div className="flex items-center justify-between justify-self-start w-full h-[10%] pt-3 pb-2">
          <h1 className="text-xl text-black">Reset Password</h1>
          <button className="text-black" onClick={closeModal}><CgClose /></button>
        </div>
        <form className="w-[80%] mx-auto flex-col flex items-center justify-between gap-3" onSubmit={handleReset}>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="oldpassword" className="self-start cursor-auto text-black">Old Password</label>
            <div className="relative flex">
            <input
              className="w-full border rounded px-1 py-2 bg-inherit placeholder:text-sm focus:outline-none text-black"
              type={`${passwordHidden.old_password ? "text" : "password"}`}
              id="oldpassword"
              placeholder="Enter Old Password"
              required
              autoComplete="off"
              value={oldPassword}
              onChange={handleOldPassword}
              disabled={disabledForm}
            />
               <button
                className={` ${passwordHidden.old_password ? "fill-green-600" : "fill-red-500"
                  } cursor-pointer w-10 h-[100%] absolute right-1 flex items-center justify-center`}
                id="oldpasswordVisibility"
                tabIndex="-1"
                aria-label="Toggle Old Password Visibility"
                onClick={(e) => {
                  e.preventDefault();
                  setPasswordHidden({ ...passwordHidden, old_password: !passwordHidden.old_password })
                }}
              >
                <svg
                  id="showpassword-icon"
                  className="w-6 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                  `
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="Newpassword" className="self-start cursor-auto text-black">New Password</label>
            <div className="relative flex">
              <input
                className="w-full border rounded px-1 py-2 bg-inherit placeholder:text-sm focus:outline-none text-black"
                type={`${passwordHidden.new_password ? "text" : "password"}`}
                id="newPassword"
                placeholder="Enter New Password"
                onChange={handleNewPasswordChange}
                required
                autoComplete="off"
                disabled={disabledForm}
                value={Newpassword} />
              <button
                className={` ${passwordHidden.new_password ? "fill-green-600" : "fill-red-500"
                  } cursor-pointer w-10 h-[100%] absolute right-1 flex items-center justify-center`}
                id="newpasswordVisibility"
                tabIndex="-1"
                aria-label="Toggle New Password Visibility"
                onClick={(e) => {
                  e.preventDefault();
                  setPasswordHidden({ ...passwordHidden, new_password: !passwordHidden.new_password })
                }}
              >
                <svg
                  id="showpassword-icon"
                  className="w-6 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                  `
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 relative">
            <label htmlFor="confirmPassword" className="self-start cursor-auto text-black">Confirm Password</label>
            <div className="relative flex">
              <input
                className="w-full border rounded px-1 py-2 bg-inherit placeholder:text-sm focus:outline-none text-black"
                type={`${passwordHidden.confirm_password ? "text" : "password"}`}
                id="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleConfirmPasswordChange}
                required
                disabled={disabledForm}
                autoComplete="off"
                value={confirmPassword} />
              <button
                className={` ${passwordHidden.confirm_password ? "fill-green-600" : "fill-red-500"
                  } cursor-pointer w-10 h-[100%] absolute right-1 flex items-center justify-center`}
                id="ComfirmpasswordVisibility"
                tabIndex="-1"
                aria-label="Toggle Confirm Password Visibility"
                onClick={(e) => {
                  e.preventDefault();
                  setPasswordHidden({ ...passwordHidden, confirm_password: !passwordHidden.confirm_password })
                }}
              >
                <svg
                  id="showpassword-icon"
                  className="w-6 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                  `
                </svg>
              </button>
            </div>
          </div>
          <button
            className="bg-[#FEE330] disabled:bg-yellow-500 w-full py-2 text-lg font-semibold rounded-md"
            type="submit"
            disabled={disabledForm}
          >
            {disabledForm ? "Resetting" : "Reset Password"}
          </button>

        </form>
      </div>
    </div>

  )
}
export default ResetPassword;