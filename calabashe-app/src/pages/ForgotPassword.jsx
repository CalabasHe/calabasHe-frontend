import { useState } from "react";
import Header from "../components/Header";
import { forgotPassword, resetPassword } from "../api/authApi";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

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

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const symbol = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(password)) {
      return "Password must be at least 8 characters long.";
    }
    if (!uppercase.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!lowercase.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!symbol.test(password)) {
      return "Password must contain at least one symbol.";
    }

    return "";
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableForm(true);

    try {
      const response = await forgotPassword({ email });
      setToken(response.token);
      setIsHidden(false);
      setDisableForm(false);
      toast.success('A six-digit code has been sent to your email');
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (error.response && error.response.data) {
        const errorDetail = error.response.data;
        if (Array.isArray(errorDetail) && errorDetail.length > 0) {
          errorMessage = errorDetail[0];
        } else if (errorDetail.error) {
          errorMessage = errorDetail.error;
        }
      }
      toast.error(errorMessage);
      setDisableForm(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const code = codeDigits.join('');

    if (code.length === 6) {
      setDisableForm(true);
      if (!passwordError && !confirmPasswordError && password === confirmPassword) {
        try {
          const response = await resetPassword({ token, code, password });
          navigate("/");
          toast.success("Password reset successful!");
        } catch (error) {
          console.log(error)
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
                <input
                  onChange={handlePasswordChange}
                  className="shadow-md px-2 bg-inherit md:py-2 border-black border-1 py-1 rounded-md focus:outline-none"
                  value={password}
                  type="password"
                  id="new_password"
                  placeholder="enter new password"
                  required
                />
                {passwordError && <p className="text-red-500">{passwordError}</p>}
              </div>

              <div className="order-3 flex flex-col gap-1">
                <label className="text-sm md:text-base" htmlFor="confirm_password"> Confirm password</label>
                <input
                  onChange={handleConfirmPasswordChange}
                  className="shadow-md px-2 bg-inherit md:py-2 border-black border-1 py-1 rounded-md focus:outline-none"
                  value={confirmPassword}
                  type="password"
                  placeholder="confirm password"
                  required
                  id="confirm_password"
                />
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
