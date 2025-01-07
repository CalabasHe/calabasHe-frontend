import { useState } from "react";
import Header from "../components/Header";
import { forgotPassword, resetPassword } from "../api/authApi";
import { toast } from "sonner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { doctorsAuth, facilitiesAuth } from "../api/providerLogin";
import { validatePassword } from "../utils/validatePassword.jsx";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [disableForm, setDisableForm] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [token, setToken] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();
  const [codeDigits, setCodeDigits] = useState(Array(6).fill(''));

  const [passwordHidden, setPasswordHidden] = useState({
    new_password: false,
    confirm_password: false
  });

  const location = useLocation();

  const { userType } = location.state || {};

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



  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const errorMessage = validatePassword(value);
    setPasswordError(errorMessage);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleForgotPassword = async (userType, email) => {
    console.log(email);
    switch (userType) {
      case "doctor":
        return await doctorsAuth.forgotPassword({ email });
      case "facility":
        return await facilitiesAuth.forgotPassword({ email });
      default:
        return await forgotPassword({ email })
    }
  };

  const handleResetPassword = async (userType, { token, code, password }) => {
    switch (userType) {
      case "doctor":
        return await doctorsAuth.resetPassword({ token, code, password });
      case "facility":
        return await facilitiesAuth.resetPassword({ token, code, password });
      default:
        return await resetPassword({ token, code, password })
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableForm(true);
    toast.loading("Processing ...")
    
    try {
      const response = await handleForgotPassword(userType, email);
      setToken(response.token);
      setIsHidden(false);
      setDisableForm(false);
      toast.success('A six-digit code has been sent to your email');
    } catch (error) {
      toast.success('A six-digit code has been sent to your email');
      setDisableForm(false);
      toast.dismiss();
    } finally {
      toast.dismiss()
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const code = codeDigits.join('');
    toast.loading("Submitting")
    if (code.length === 6) {
      setDisableForm(true);
      if (!passwordError && !confirmPasswordError && password === confirmPassword) {
        try {
          const response = await handleResetPassword(userType, {token, code, password});
          navigate("/");
          toast.success("Password reset successful!");
        } catch (error) {
          let errorMessage = "An unexpected error occurred";
          if (error && error.data) {
            const errorDetail = error.data;
            if (Array.isArray(errorDetail) && errorDetail.length > 0) {
              errorMessage = errorDetail[0];
            } else if (errorDetail.error) {
              errorMessage = errorDetail.error;
            }
          }
          toast.error(errorMessage);
        } finally {
          setDisableForm(false);
          toast.dismiss()
        }
      } else {
        toast.error("Please correct the errors before submitting.");
        setDisableForm(false);
      }
    } else {
      toast.warning('Invalid Code Length')
    }

  };


  return (
    <>
      <Header />
      <form className={`${isHidden ? '' : 'hidden'} h-screen w-screen flex items-center justify-center`} onSubmit={handleSubmit}>
        <div className="w-[85%] max-w-[500px] flex flex-col rounded-lg gap-7 md:gap-10 p-6 py-8 bg-[#E9E9D8]">
          <h2 className="text-center text-xl md:text-2xl">Reset Password</h2>
          <div className="space-y-7 md:space-y-8">
            <div className=" w-full space-y-1.5">
              <label className="font-normal text-sm md:text-base lg:text-lg" htmlFor="account_email"> Your Email</label>
              <input
                onChange={e => setEmail(e.target.value)}
                className="w-full border rounded px-1 py-2 md:py-3 bg-inherit placeholder:text-sm focus:outline-none"
                value={email}
                type="email"
                autoComplete="off"
                spellCheck="false"
                id="account_email"
                placeholder="Enter calabashe account email"
                required
                disabled={disableForm}
                aria-label="Email"
              />
            </div>
            <button className="bg-[#FEE330] w-full py-2 self-center text-lg font-semibold rounded-md" type="submit" disabled={disableForm}>Request reset code</button>
          </div>
          <Link className="text-center text-lg text-[#205CD4] underline" to={'/sign_in'}>Back to login page</Link>
        </div>
      </form>

      <form onSubmit={handleReset} className={`${isHidden ? 'hidden' : ''} pt-8 h-screen w-screen flex flex-col gap-4 items-center justify-center`}>
        <div className="w-[85%] max-w-[500px] rounded-lg bg-[#E9E9D8] shadow-lg">
          <div className="w-full flex flex-col gap-8 p-6 py-8 bg-white/10">
            <h2 className="text-center text-lg md:text-xl">Reset Password</h2>
            <div className="w-full flex flex-col gap-6">
              <div className=" order-2 flex flex-col gap-1">
                <label htmlFor="new_password" className="text-sm md:text-base">New password</label>
                <div className="relative flex">
                  <input
                    onChange={handlePasswordChange}
                    className=" w-full shadow-md px-2 bg-inherit md:py-2 border-black border-1 py-1 rounded-md focus:outline-none"
                    value={password}
                    type={`${passwordHidden.new_password ? "text" : "password"}`}
                    id="new_password"
                    placeholder="enter new password"
                    required
                  />
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
                {passwordError && <p className="text-red-500">{passwordError}</p>}
              </div>

              <div className="order-3 flex flex-col gap-1">
                <label className="text-sm md:text-base" htmlFor="confirm_password"> Confirm password</label>
                <div className="relative flex">
                  <input
                    onChange={handleConfirmPasswordChange}
                    className="w-full shadow-md px-2 bg-inherit md:py-2 border-black border-1 py-1 rounded-md focus:outline-none"
                    value={confirmPassword}
                    type={`${passwordHidden.confirm_password ? "text" : "password"}`}
                    placeholder="confirm password"
                    required
                    id="confirm_password"
                  />
                  <button
                    className={` ${passwordHidden.confirm_password ? "fill-green-600" : "fill-red-500"
                      } cursor-pointer w-10 h-[100%] absolute right-1 flex items-center justify-center`}
                    id="confirm_passwordVisibility "
                    tabIndex="-1"
                    aria-label="Toggle Confrim Password Visibility"
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
                {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
              </div>


              <div className="flex flex-col gap-1">
                <label className="text-sm md:text-base" htmlFor="reset-code"> Enter password reset code</label>
                <div className="w-full flex justify-between gap-2">
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

              </div>
              <button className="bg-[#FEE330] order-5 w-full mt-5 py-2 self-center text-lg font-semibold rounded-md" type="submit" disabled={disableForm} > Reset password </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
