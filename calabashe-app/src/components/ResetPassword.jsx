import {CgClose} from "react-icons/cg";
import {useState} from "react";
import {changeDoctorPassword} from "../api/providerLogin.js";
import {toast} from "sonner";
import {useAuth} from "../hooks/useAuth.jsx";
import {validatePassword} from "../utils/validatePassword.jsx";
// eslint-disable-next-line react/prop-types
const ResetPassword = ({showPopUp, handlePopUp}) => {
  const [Newpassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [disabledForm, setDisabledForm] = useState(false);
  const {modifyUserType} = useAuth();

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    const err = validatePassword(e.target.value);
    setError(err);
  }
  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
    const err= validatePassword(oldPassword);
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
          const  email = localStorage.getItem('email');
          await changeDoctorPassword({email, old_password: oldPassword, new_password:Newpassword, confirm_password:confirmPassword});
          toast.success("Password reset successful!");
          handlePopUp(false);
          setOldPassword("");
          setConfirmPassword("");
          setNewPassword("");
        } catch (error) {
          const errorMessage = error.error[0];
          setError(errorMessage);
          toast.error(errorMessage);
          return errorMessage;
        } finally {
          setDisabledForm(false);
        }
      } else {
        toast.error("Passwords must Match");
        setDisabledForm(false);
      }
  };

  return (
      showPopUp &&
      <div className="w-full fixed inset-0 bg-black bg-opacity-30 z-20 flex items-center justify-center">
        <div className="h-[70%] md:h-max  w-[90%] md:w-[40%] border flex flex-col gap-3 p-3 bg-white rounded-md">

          <div className="flex items-center justify-between justify-self-start w-full h-[10%] pt-3 pb-2">
            <h1 className=" text-xl">Reset Password</h1>
            <button onClick={closeModal}><CgClose/></button>
          </div>
          <form className="w-[80%] mx-auto flex-col flex items-center justify-between gap-3" onSubmit={handleReset}>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="oldpassword" className="self-start cursor-auto ">Old Password</label>
              <input
                  className="w-full border rounded px-1 py-2 bg-inherit placeholder:text-sm focus:outline-none"
                  type="password"
                  id="oldpassword"
                  placeholder="Enter Old Password"
                  required
                  value={oldPassword}
                  onChange={handleOldPassword}
                  disabled={disabledForm}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="Newpassword" className="self-start cursor-auto">New Password</label>
              <input
                  className="w-full border rounded px-1 py-2 bg-inherit placeholder:text-sm focus:outline-none"
                  type="password"
                  id="newPassword"
                  placeholder="Enter New Password"
                  onChange={handleNewPasswordChange}
                  required
                  disabled={disabledForm}
                  value={Newpassword}/>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="self-start cursor-auto ">Confirm Password</label>
              <input
                  className="w-full border rounded px-1 py-2 bg-inherit placeholder:text-sm focus:outline-none"
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleConfirmPasswordChange}
                  required
                  disabled={disabledForm}
                  value={confirmPassword}/>
            </div>
            <button
                className="bg-[#FEE330] disabled:bg-yellow-500 w-full py-2 text-lg font-semibold rounded-md"
                type="submit"
                disabled={disabledForm}
            >
              Change Password
            </button>
          </form>
        </div>
      </div>

  )
}
export default ResetPassword;