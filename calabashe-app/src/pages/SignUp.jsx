import { useState } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/account.css";
import { signUp } from "../api/authApi";
import VerifyUser from "./Verification";
import { AnimateY } from "../components/ComponentAnimations";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [buttonText, setButtonText] = useState('Sign Up');
  const [isHidden, setIsHidden] = useState(true);
  const [disableForm, setDisableForm] = useState(false);
  const [passwdHidden, setPasswdHidden] = useState(true)
 
  const password1 = document.getElementById('passwd');
  const confirm_password = document.getElementById('confirm_passwd');


  const toggleHiddenClass = () => {
    setIsHidden(!isHidden);
  };

  const togglePassword = () => {
    if ((password1.type === 'password') || (confirm_password.type === 'password')) {
      password1.type = 'text';
      confirm_password.type = 'text';
      setPasswdHidden(false)
    } else {
      password1.type = 'password';
      confirm_password.type = 'password';
      setPasswdHidden(true)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setButtonText('Creating Account');

    password1.type = 'password';
    confirm_password.type = 'password';

    const passwordRegex = /^(?=.{8,}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).+$/;

    if (password !== password2) {
      setError('Passwords do not match');
      setButtonText('Sign Up');
      setDisableForm(false)
      return;
    }

    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a digit, and a special character');
      setButtonText('Sign Up');
      setDisableForm(false)
      return;
    }

    setDisableForm(true)

    try {
      await signUp({ email, username, password, password2 });
      setSuccess('Account created successfully');
      toggleHiddenClass();
    } catch (error) {
      console.log(error)
      if (error.email) {
        setError('Account with this email already exists');
      } if (error.username && error.email){
        setError('Account with this email already exists');
      } if (!(error.email) && error.username){
        setError('Username has already been taken')
      } else {
        setError(error.message || "An unexpected error occurred");
      }
    } finally {
      setDisableForm(false)
      setButtonText('Sign Up');
    }
  };


  return (
    <div className=" overflow-y-auto bg-[#04DA8D] h-screen w-screen flex items-center justify-center py-1 ">

        <AnimateY>
        
            {/* <Link to='/home' className=" sticky top-2 hidden md:flex bg-white font-bold text-xl md:text-2xl lg:text-3xl mb-4  md:px-2 shadow-md rounded-md w-[fit-content]" >
              <p> Calabas<span className="text-[#04DA8D]">He</span> </p>
            </Link>      */}
            
              
            <main className="h-screen w-full flex items-center justify-center">
              
              <div className=" bg-white w-[90%] sm:w-[80%] max-w-[300px] sm:max-w-[350px] md:min-w-[40vw] md:max-w-[550px]  flex flex-col  border-black pointer-events-auto rounded-md py-4 lg:py-6 p-4 px-[3%]">
                <section className="mb-2 lg:mb-3 flex flex-col items-center">
                  <h2 className="text-center font-bold text-lg sm:text-xl lg:text-2xl">
                    Create Your Account
                  </h2>
                  <svg className="w-[80%] mt-0 p-0"  width="100" height="42" viewBox="0 0 420 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6312 17.089C14.4676 17.089 18.4867 16.911 22.3231 16.733C23.9673 16.733 25.4288 16.555 27.073 16.555C34.0151 16.199 40.9571 15.8429 47.8992 15.4869C56.3028 15.1309 64.5237 14.5969 72.9272 14.2408C84.8018 13.5288 96.6764 12.9948 108.551 12.2827C111.291 12.1047 114.032 12.1047 116.772 11.9267C123.714 11.5707 130.656 11.2147 137.598 11.0366C144.54 10.6806 151.482 10.3246 158.424 10.1466C161.165 9.96859 163.905 9.79058 166.645 9.79058C177.606 9.43455 188.75 9.07853 199.712 8.72251C206.471 8.5445 213.23 8.36649 220.172 8.01047C222.913 8.01047 225.47 7.83246 228.211 7.83246C238.806 7.65445 249.585 7.47644 260.181 7.29843C270.776 7.12042 281.19 6.94241 291.785 6.7644C294.526 6.7644 297.266 6.7644 300.189 6.7644C307.131 6.7644 313.89 6.7644 320.832 6.7644C331.611 6.7644 342.207 6.7644 352.985 6.58639C356.456 6.58639 359.927 6.58639 363.398 6.58639C370.706 6.58639 378.013 6.58639 385.321 6.58639C385.869 6.58639 386.6 6.58639 387.148 6.58639C370.706 6.7644 354.081 6.94241 337.64 7.29843C330.698 7.47644 323.938 7.47644 316.996 7.65445C314.073 7.65445 310.967 7.65445 308.044 7.83246C297.997 8.01047 288.132 8.36649 278.084 8.5445C266.575 8.90052 255.065 9.07853 243.556 9.43455C241.547 9.43455 239.72 9.61256 237.71 9.61256C231.499 9.96859 225.47 10.1466 219.259 10.5026C206.836 11.0366 194.414 11.5707 181.991 12.1047C180.164 12.1047 178.337 12.2827 176.51 12.4607C170.482 12.8168 164.27 13.3508 158.242 13.7068C147.281 14.4188 136.502 15.1309 125.541 15.8429C122.618 16.0209 119.512 16.377 116.589 16.555C109.647 17.089 102.705 17.623 95.763 18.3351C86.9941 19.0471 78.0424 19.7592 69.2735 20.4712C57.0335 21.5393 44.6109 22.6073 32.3709 23.6754C29.4479 23.8534 26.5249 24.2094 23.4193 24.3874C18.1213 24.9215 12.8234 25.4555 7.52554 25.9895C6.97749 25.9895 6.42943 26.3455 6.42943 27.0576C6.42943 27.5916 6.97749 28.1257 7.52554 28.1257C9.53509 28.1257 11.362 28.3037 13.3715 28.3037C13.0061 29.1937 12.8234 29.7277 12.8234 30.2618C12.8234 32.2199 14.4676 34 16.6599 34C31.8228 33.1099 46.8031 32.0419 61.9661 31.3298C75.1195 30.7958 88.2729 30.0838 101.426 29.5497C115.859 28.8377 130.473 28.1257 144.906 27.5916C149.473 27.4136 154.04 27.2356 158.607 26.8796C159.886 26.8796 161.165 26.7016 162.626 26.7016C186.01 26.1675 209.394 25.4555 232.778 24.9215C245.2 24.5654 257.806 24.2094 270.228 24.0314C274.796 23.8534 279.18 23.8534 283.747 23.6754C307.679 23.3194 331.611 22.9634 355.543 22.6073C365.773 22.4293 376.004 22.2513 386.234 22.0733C395.003 21.8953 403.772 21.8953 412.541 21.5393C419.848 21.3613 426.973 21.0052 434.281 20.8272C437.934 20.6492 441.588 20.6492 445.059 20.4712C453.28 19.9372 461.501 19.4031 469.722 18.8691C469.174 19.5812 469.174 20.6492 469.356 21.3613C469.539 22.2513 470.087 22.9633 471.001 23.3194C471.731 23.6754 472.827 24.0314 473.558 23.6754C475.385 22.9634 477.212 22.2513 478.856 21.5393C478.856 21.5393 478.856 21.5393 478.673 21.5393C478.856 21.5393 478.856 21.3613 479.039 21.3613C479.221 21.3613 479.404 21.1832 479.404 21.1832H479.221C480.135 20.8272 481.048 20.4712 482.144 19.9372C483.058 19.5812 484.154 19.0471 485.067 18.6911C486.164 18.1571 487.077 17.623 488.173 17.089C489.269 16.555 490 15.1309 490 13.8848C490 13.1728 489.817 12.6387 489.452 11.9267C489.087 11.2147 488.173 10.3246 487.26 10.1466C486.346 9.96859 485.433 9.79058 484.519 9.79058C484.337 9.79058 484.154 9.79058 483.971 9.79058C483.423 9.79058 482.693 9.79058 482.144 9.96859C480.683 10.1466 479.404 10.3246 477.943 10.3246C476.847 10.3246 475.75 10.5026 474.472 10.5026C471.366 10.6806 468.443 10.8586 465.337 11.2147C464.607 11.2147 463.693 11.3927 462.962 11.3927C463.328 11.0366 463.51 10.6806 463.51 10.3246C463.693 9.96859 463.693 9.61257 463.693 9.25654C463.693 9.07853 463.693 8.72251 463.876 8.5445C463.876 8.18848 463.876 7.83246 463.693 7.65445C463.693 7.65445 463.876 7.65445 463.876 7.47644C464.424 7.12042 464.972 6.7644 465.337 6.05236C465.703 5.51832 465.885 4.80628 465.885 4.09424C465.885 3.3822 465.703 2.84817 465.337 2.13613C465.155 1.95812 464.972 1.60209 464.789 1.42408C464.241 0.890052 463.693 0.712042 463.145 0.534031C462.049 0.17801 460.77 0 459.491 0C458.395 0 457.482 0 456.386 0C454.924 0 453.463 0 452.001 0C449.992 0 447.799 0 445.79 0C440.309 0 434.829 0 429.348 0C424.233 0 418.935 0 413.82 0C409.07 0 404.503 0 399.753 0C380.936 0 362.302 0.17801 343.486 0.356021C329.419 0.534031 315.352 0.712042 301.285 0.712042C295.074 0.712042 288.68 0.890052 282.468 1.06806C268.402 1.42408 254.335 1.60209 240.268 1.95812C236.249 1.95812 232.23 2.13613 228.211 2.13613C225.836 2.13613 223.643 2.31414 221.268 2.31414C207.384 2.84817 193.5 3.3822 179.616 3.91623C175.414 4.09424 171.212 4.27225 166.828 4.45026C164.453 4.45026 162.078 4.62827 159.703 4.80628C145.819 5.51832 132.118 6.23037 118.233 6.94241C111.109 7.29843 103.984 7.65445 96.8591 8.18848C84.6192 8.90052 72.3792 9.61256 60.3219 10.5026C49.7261 11.2147 39.1303 11.7487 28.5345 12.2827C26.8903 12.4607 25.2461 12.4607 23.4193 12.6387C20.679 12.8168 17.9387 12.8168 15.1984 12.9948C12.8234 13.7068 10.2658 13.7068 7.89092 13.7068C7.70823 12.9948 6.97749 12.4607 6.42943 12.6387C4.78525 12.6387 3.32376 12.8168 1.67958 12.9948C0.948839 13.1728 0.218094 13.5288 0.0354073 14.2408C-0.147279 15.1309 0.40078 16.0209 1.13152 16.199C1.86227 16.377 2.59301 16.555 3.32376 16.733C4.05451 16.911 4.60256 16.911 5.33331 16.911C7.16017 17.089 8.80435 17.089 10.6312 17.089ZM438.117 11.3927C440.309 11.3927 442.684 11.3927 444.876 11.3927C445.059 11.9267 445.425 12.2827 445.79 12.6387C444.876 12.6387 443.963 12.8168 443.232 12.8168C441.588 12.8168 439.944 12.9948 438.3 12.9948C430.992 13.1728 423.868 13.5288 416.56 13.7068C413.272 13.8848 409.983 14.0628 406.695 14.0628C401.58 14.0628 396.282 14.2408 391.167 14.2408C379.292 14.4188 367.6 14.5969 355.726 14.7749C332.707 15.1309 309.871 15.4869 286.853 15.8429C270.411 16.0209 253.969 16.555 237.528 17.089C212.865 17.801 188.02 18.3351 163.357 19.0471C158.424 19.2251 153.492 19.4031 148.559 19.7592C134.493 20.4712 120.426 21.0052 106.359 21.7173C92.6573 22.4293 78.7732 22.9634 65.0717 23.6754C63.7929 23.6754 62.5141 23.8534 61.2353 23.8534C64.889 23.4974 68.7254 23.3194 72.3792 22.9633C85.3499 22.0733 98.3206 21.0052 111.291 20.1152C115.859 19.7592 120.426 19.4031 124.81 19.0471C127.185 18.8691 129.56 18.6911 131.752 18.6911C145.454 17.9791 158.972 17.089 172.491 16.377C175.049 16.199 177.789 16.0209 180.347 15.8429C184.183 15.6649 188.02 15.4869 191.673 15.4869C205.557 14.9529 219.442 14.4188 233.326 13.8848C236.431 13.7068 239.537 13.7068 242.46 13.5288C243.191 13.5288 244.104 13.5288 244.835 13.5288C247.027 13.5288 249.219 13.5288 251.229 13.3508C265.113 12.9948 279.18 12.8168 293.064 12.4607C299.458 12.2827 305.852 12.1047 312.246 12.1047C332.89 11.9267 353.716 11.7487 374.36 11.5707C395.917 11.5707 417.108 11.3927 438.117 11.3927Z" fill="#04DA8D"/>
                    <path d="M38 42C38.5523 42 39 41.5523 39 41C39 40.4477 38.5523 40 38 40C37.4477 40 37 40.4477 37 41C37 41.5523 37.4477 42 38 42Z" fill="white"/>
                  </svg>
                </section>
                
                <form onSubmit={handleSubmit} className='font-semibold space-y-6 cursor-auto'>
                  {/* <p className="font-semibold text-center text-base md:text-lg lg:xl mb-4 tracking-wide">Create Your Account</p> */}
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block  text-sm lg:text-base" htmlFor="email">Email</label>
                      <input className="text-base leading-3 p-1 px-2  rounded-md w-full" 
                        type="email" 
                        id="email"
                        aria-label="enter a valid email address"
                        value={email}
                        onChange={(e => setEmail(e.target.value))}
                        placeholder="example@email.com"
                        disabled = {disableForm}
                        required
                      />
                    </div>
                    <div>
                      <label className="block  text-sm lg:text-base" htmlFor="username">Username</label>
                      <input className="text-base leading-3 p-1 px-2 rounded-md w-full" 
                        type="text" 
                        aria-label="enter preferred username"
                        id="username"
                        value={username}
                        onChange={(e => setUsername(e.target.value))}
                        placeholder="eg: jolly_rater"
                        disabled = {disableForm}
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm lg:text-base" htmlFor="passwd">Password</label>
                      <div className="relative flex h-full">
                        <input className="leading-3 text-base p-1 px-2 rounded-md w-full" 
                          type="password" 
                          id="passwd"
                          aria-label="enter password"
                          value={password}
                          onChange={(e => setPassword(e.target.value))}
                          disabled = {disableForm}
                          required
                        />
                        <button
                            id="togglepasswdvisibility1"
                            className={`${passwdHidden ? 'fill-green-600' : 'fill-red-500'}  cursor-pointer w-8 h-[100%] absolute right-1 flex items-center justify-center`}
                            tabIndex='-1'
                            aria-label="Toggle Password Visibility"
                            onClick={(e) => {
                              e.preventDefault();
                              togglePassword();}}
                          >
                            <svg
                            className="w-6 h-4" 
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>
                          `</svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm lg:text-base" htmlFor="confirm_passwd">Confirm Password</label>
                      <div className="relative flex">
                        <input className="text-base leading-3 p-1 px-2 rounded-md w-full" 
                          type="password" 
                          id="confirm_passwd"
                          aria-label="confirm password"
                          value={password2}
                          onChange={(e => setPassword2(e.target.value))}
                          required
                          disabled = {disableForm}
                          />
                        <button
                            id='togglepasswdvisibility2'
                            className={`${passwdHidden ? 'fill-green-600' : 'fill-red-500'}  cursor-pointer w-8 h-[100%] absolute right-1 flex items-center justify-center`}
                            tabIndex='-1'
                            aria-label="Toggle Password Visibility"
                            onClick={(e) => {
                              e.preventDefault();
                              togglePassword();}}
                          >
                            <svg
                            className="w-6 h-4" 
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>
                          `</svg>
                        </button>
                      </div>
                      {/* Error handling */}
                        {error && <p className="error text-xs md:text-sm text-red-600 pt-2">{error}</p>}
                        {success && <p className="success text-xs md:text-sm text-green-600 pt-2">{success}</p>}
                    </div>
                  </div>
                  {/* buttons */}
                  <div className="flex flex-col gap-y-2" >
                    <button
                      className="bg-[#FEE330] text-center text-base font-bold w-full py-1 rounded-md lg:hover:scale-[1.01] active:scale-[0.90] lg:hover:bg-[#04DA8D] lg:hover:text-white transition ease-in-out"
                      type="submit"
                      id="sign_up"
                      aria-label="User Account sign-up button"
                      disabled = {disableForm}
                    >
                      {buttonText}
                    </button>
                    <p className="relative text-gray-600 w-full text-center" id='or'>or</p>

                    <button
                      className="flex justify-center items-center gap-2 text-base font-bold w-full py-1 rounded-md lg:hover:scale-[1.01] active:scale-[0.90] transition-[1s] ease-in-out"
                      type="submit"
                      id="google_sign-up"
                      aria-label="Google sign-up button"
                      disabled={disableForm}
                    >
                      <svg
                        className="w-5 h-3 md:w-6 md:h-4" 
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google">
                        <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                      </svg>
                      <p className="text-sm md:text-base">Sign up with Google</p>
                    </button>

                    <Link className="text-xs  lg:text-sm text-center mt-2 text-blue-500 hover:underline" to='/sign_in'>Already have an account? Sign In</Link>
                  </div>
                </form>

              </div>
            </main>

          {/* Verification code */}
      </AnimateY>
          <div className={`${isHidden ? "hidden" : ""} z-20 h-[100vh]`}>
            <VerifyUser email={email} duration={900}/>
          </div>
    </div>
   );
}
 
export default SignUp;