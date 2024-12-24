import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginDoctor } from "../api/providerLogin";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { validatePassword } from "../utils/validatePassword.jsx";
const ProviderLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Sign In");
  const [, setSuccess] = useState(null);
  const { login, modifyUserType } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [fullState, setFullState] = useState(location.state || {});
  const [hidePassword, setHidePassword] = useState(false);


  useEffect(() => {
    if (location.state) {
      setFullState(location.state);
    }
  }, [location.state]);


  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e) => {
    setIsDisabled(true);
    e.preventDefault();
    if (error && error.length > 0) {
      toast.error(error);
      setIsDisabled(false);
      setError(null);
      return;
    }
    return toast.promise(
      async () => {
        const response = await loginDoctor({ email, password });
        login(response.data.access, response.data.refresh);
        modifyUserType("doctor", response.data.profile_image, response.data.last_name, response.data.email, response.data.reviews);
        localStorage.setItem("userName", `${response.data.last_name}`)
        const destination = fullState?.from || "/";
        navigate(destination, { state: fullState });
        return "Sign in successful";
      },
      {
        loading: "Signing in...",
        success: (message) => {
          setSuccess(message);
          return "Welcome Back!";
        },
        error: (error) => {
          toast.error(error.message)
          modifyUserType(null, "", "");
          setError(error.message);
          return error.message;
        },
        finally: () => {
          setIsDisabled(false);
          setButtonText("Sign In");
          toast.dismiss();
          setError(null);
        },
      }
    );
  }

  return (
    <main className="my-8">
      <div className="-z-10 absolute top-[5%] md:top-[15%] -right-0">
        <svg width="87" height="143" viewBox="0 0 87 143" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M165.836 69.4802C175.608 87.3906 168.092 113.357 151.88 127.34C135.669 141.323 110.762 143.322 88.9353 142.578C67.1083 141.835 48.361 138.348 34.1125 128.387C19.864 118.425 10.1143 101.989 4.61238 83.5414C-0.857316 65.1167 -2.04702 44.7037 6.40774 28.1465C14.8625 11.5892 32.9617 -1.11216 50.4864 0.145775C68.0432 1.42632 84.9933 16.6436 106.999 29.1794C129.004 41.7153 156.064 51.5697 165.836 69.4802Z"
            fill="#00C67F" />
        </svg>
      </div>
      <div className="-z-20 absolute -top-28 md:top-0 -right-12 md:-right-8">
        <svg width="219" height="446" viewBox="0 0 219 446" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M350.506 81.8066C376.906 116.507 394.206 151.807 407.006 200.007C419.906 248.207 428.306 309.307 401.906 359.307C375.606 409.307 314.506 448.207 256.906 444.807C199.306 441.407 145.106 395.607 95.4061 345.607C45.7061 295.607 0.606066 241.407 0.0060657 186.607C-0.593934 131.807 43.4061 76.4066 93.1061 41.8066C142.706 7.10659 198.106 -6.89342 243.506 3.20658C288.906 13.2066 324.206 47.2066 350.506 81.8066Z"
            fill="#FEE330" />
        </svg>

      </div>
      <div className="w-[90%] mx-auto md:w-full max-w-[360px] lg:max-w-[400px]">
        <h2 className="pb-3 text-xl">To Login , enter your credentials</h2>
        <form
          className="relative z-20 pt-4 pr-4 pl-0 pb-14 lg:pb-10 w-full flex flex-col gap-6 rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="space-y-3 text-base">
            <label htmlFor="email">Email Address</label>
            <input
              name="email"
              type="email"
              className="w-full rounded-md h-12 px-2 md:px-4 focus:outline-none"
              required
              aria-label="Enter your email address"
              spellCheck="false"
              value={email}
              onChange={handleEmail}
              disabled={isDisabled}
            />
          </div>

          <div className="space-y-3 relative text-base">
            <label htmlFor="password">Password</label>
            <div className="flex relative">
              <input
                name="password"
                type={`${hidePassword? "text":"password"}`}
                className="w-full rounded-md h-12 px-4 focus:outline-none"
                required
                aria-label="Enter your password"
                spellCheck="false"
                value={password}
                onChange={handlePassword}
                disabled={isDisabled}
              />
              <button
                className={` ${hidePassword? "fill-green-600" : "fill-red-500"
                  } cursor-pointer w-10 h-[100%] absolute right-1 flex items-center justify-center`}
                id="passwordVisibility"
                tabIndex="-1"
                aria-label="Toggle Password Visibility"
                onClick={(e) => {
                  e.preventDefault();
                  setHidePassword(!hidePassword)
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
            className="mt-3 text-base border disabled:bg-yellow-600 bg-[#FEE330] w-full  rounded-lg font-semibold p-3 self-center"
            type="submit"
            disabled={isDisabled}
          >
            {buttonText}
          </button>

          <Link className="text-center" to={"/forgot_password"} state={{ type: "doctor" }}>
            Forgot Password?
          </Link>
        </form>
      </div>
      <div className="-z-10 absolute top-[40%] -left-6">
        <svg width="175" height="365" viewBox="0 0 175 365" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M120.533 26.0184C163.033 56.4114 179.933 126.1 172.533 188.217C165.133 250.333 133.333 304.774 90.833 334.656C48.333 364.537 -4.86694 369.654 -49.1669 360.546C-93.567 351.336 -128.867 327.799 -161.567 298.02C-194.167 268.139 -224.167 232.015 -241.867 177.676C-259.567 123.44 -264.967 51.0901 -232.267 20.6971C-199.567 -9.6959 -128.867 1.9701 -59.4669 3.30043C9.93304 4.63077 78.0331 -4.37456 120.533 26.0184Z"
            fill="#04DA8D" />
        </svg>
      </div>
    </main>
  )
}

export default ProviderLoginForm;