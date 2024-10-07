import { useState } from "react";
import Header from "../components/Header";
import { forgotPassword, resetPassword } from "../api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

  // Password validation function
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

  const handleCodeChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) { // Allow only up to 6 digits
      setCode(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableForm(true);

    toast.promise(
      async () => {
        try {
          const response = await forgotPassword({ email });
          setToken(response.token);
          setIsHidden(false);
          return 'A six-digit code has been sent to your email';
        } catch (error) {
          setDisableForm(false);
          let errorMessage = "An unexpected error occurred";
          if (error.response && error.response.data) {
            const errorDetail = error.response.data;
            if (Array.isArray(errorDetail) && errorDetail.length > 0) {
              errorMessage = errorDetail[0];
            } else if (errorDetail.error) {
              errorMessage = errorDetail.error;
            }
          }
          throw new Error(errorMessage);
        }
      },
      {
        loading: 'Authenticating email...',
        success: (message) => {
          return message;
        },
        error: (error) => {
          return error.message || "An unexpected error occurred";
        }
      }
    );
  };

  const handleReset = async (e) => {
    e.preventDefault();

    if (!passwordError && !confirmPasswordError && password === confirmPassword) {
      await resetPassword({ token, code, password });
      // console.log(response);
      navigate("/success");
    } else {
      toast.error("Please correct the errors before submitting.");
    }
  };

  return (
    <>
      <Header />
      <form className={`${isHidden ? '' : 'hidden'} h-screen w-screen flex items-center justify-center`} onSubmit={handleSubmit}>
        <div className="bg-gradient-to-r p-1 rounded-md from-[#04DA8D] to-yellow-300 shadow-lg">
          <div className="w-fit flex flex-col gap-6 p-6 py-8 bg-white">
            <input
              onChange={e => setEmail(e.target.value)}
              className="border rounded px-1 placeholder:text-sm focus:outline-none"
              value={email}
              type="email"
              autoComplete="off"
              spellCheck="false"
              placeholder="test@example.com"
              required
              disabled={disableForm}
              aria-label="Email"
            />
            <button className="bg-[#04DA8D] w-fit px-2 py-1 self-center text-white font-medium rounded-md" type="submit" disabled={disableForm}>Submit</button>
          </div>
        </div>
      </form>

      <form onSubmit={handleReset} className={`${isHidden ? 'hidden' : ''} h-screen w-screen flex flex-col gap-4 items-center justify-center`}>
        <div className="bg-gradient-to-r p-1 rounded-md from-[#04DA8D] to-yellow-300 shadow-lg">
          <div className="w-fit flex flex-col gap-6 p-6 py-8 bg-white/10">
            <input
              onChange={handlePasswordChange}
              className="border-none shadow-md order-2 px-2 py-1 rounded-md focus:outline-none"
              value={password}
              type="password"
              placeholder="New Password"
              required
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}

            <input
              onChange={handleConfirmPasswordChange}
              className="border-none shadow-md order-2 px-2 py-1 rounded-md focus:outline-none"
              value={confirmPassword}
              type="password"
              placeholder="Confirm Password"
              required
            />
            {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}

            <input
              onChange={handleCodeChange}
              className="border-none w-full shadow-md px-1 py-1 rounded-md focus:outline-none text-center"
              value={code}
              type="text"
              inputMode="numeric"
              maxLength="6"
              placeholder="Enter 6-digit code"
              required
            />

            <button className="order-3 text-white font-medium bg-slate-600 rounded-md py-1 px-4 w-fit self-center" type="submit">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
