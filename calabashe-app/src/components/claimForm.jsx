import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Pill from '../assets/icons/pill.svg'
import { accountClaims } from "../api/authApi";
import { useNavigate, useLocation } from "react-router-dom";
import '../stylesheets/claimForm.css'

const AccountClaimForm = () => {
  const [disableForm, setDisableForm] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    specialty: "",
    email: "",
  });
  const go = useNavigate()
  const location = useLocation();
  const prevLocationState = useRef(null);

  useEffect(() => {
    if (location.state?.message && 
        (!prevLocationState.current?.message || 
         prevLocationState.current.message !== location.state.message)) {
      setFormData(prev => ({
        ...prev,
        firstName: location.state.message[0],
        lastName:location.state.message[1]
      }));
      prevLocationState.current = location.state;
    }
  }, [location.state]);
 
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisableForm(true)

    if (formData.phoneNumber.length < 10){
      toast.warning('Phone number must be at least 10 digits long')
      setDisableForm(false)
      return
    }
    
    return toast.promise(
      async () => {
        await accountClaims({first_name:formData.firstName, last_name:formData.lastName, phone:formData.phoneNumber, specialty:formData.specialty, form_email:formData.email});
        return 'Claim sent';
      },
      {
        loading: 'Making claim...',
        success: (message) => {
          setSuccess(message);
          go('/')
          return 'Claim sent successfully';
        },
        error: (error) => {
          console.log(error)
          let errorMessage = "Claim failed";
            if (error.form_email && error.form_email[0].includes('form email already exists')) {
              errorMessage = "An initial form with this email already exists";
            } else if (error.phone && error.phone[0].includes('form with this phone already exists')) {
              errorMessage = "A form with this phone number already exists";
            }
          setError(errorMessage);
          return errorMessage;
        },
        finally: () => {
          setDisableForm(false);
        }
      })
    }

  return (
    <div className=" z-50 overflow-hidden relative w-full min-h-screen flex flex-col gap-6 sm:gap-8 md:gap-16 items-center justify-center">
       <svg
        id="md-yellow"
        className="hidden lg:block absolute z-0 -top-6 xl:-top-[0px] 2xl:top-[150px] size-[300px] 2xl:size-[350px] -right-[40px] xl:right-0 2xl:right-[100px]"
        width="420"
        height="446"
        viewBox="0 0 420 446"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M350.506 81.8066C376.906 116.507 394.206 151.807 407.006 200.007C419.906 248.207 428.306 309.307 401.906 359.307C375.606 409.307 314.506 448.207 256.906 444.807C199.306 441.407 145.106 395.607 95.4061 345.607C45.7061 295.607 0.606066 241.407 0.0060657 186.607C-0.593934 131.807 43.4061 76.4066 93.1061 41.8066C142.706 7.10659 198.106 -6.89342 243.506 3.20658C288.906 13.2066 324.206 47.2066 350.506 81.8066Z"
          fill="#FEE330"
        />
      </svg>

      <section className="lg:hidden w-full max-w-[360px] md:max-w-full md:px-[10vw] md:leading-relaxed lg:max-w-[400px] text-xl md:text-3xl font-bold ">
        <p>The new generation</p>
        <p>of reviews</p>
        <p>for practitioners</p>
      </section>
      <form
        className="relative z-20  bg-white shadow-2xl px-4 pt-8 pb-14 lg:pb-10 w-full flex flex-col gap-6 rounded-lg max-w-[360px] lg:max-w-[400px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold mb-1">Are you a doctor?</h2>
        <section className="space-y-3 relative text-base placeholder:text-[#ABABAB] placeholder:text-xs">
          <div className="flex justify-evenly gap-5 h-12 sm:h-14 2xl:h-16">
            <div id="firstName-field" className="firstName-field z-0 cursor-pointer relative w-1/2 h-full">
              <input
                onChange={handleChange}
                value={formData.firstName}
                name="firstName"
                type="text"
                className="w-full cursor-pointer h-full rounded-md px-4 focus:outline-none"
                placeholder={formData.firstName}
                aria-label="Enter first name"
                spellCheck="false"
                disabled='true'
              />
              <span className="firstNameBubble absolute shadow-xl text-lg font-semibold border-2 rounded-md top-0 w-full">{formData.firstName}</span>
            </div>
            <div className="lastName-field z-0 cursor-pointer relative w-1/2 h-full">
              <input
                id="lastName-field"
                onChange={handleChange}
                value={formData.lastName}
                name="lastName"
                type="text"
                className="w-full relative -z-1 cursor-pointer h-full rounded-md px-4 focus:outline-none"
                placeholder="Last name *"
                aria-label="Enter last name"
                spellCheck="false"
                disabled='true'
              />

<span className="lastNameBubble absolute z-30 shadow-xl border-2 font-semibold  text-lg rounded-md top-0 w-full">{formData.lastName}</span>
            </div>
          </div>
          <input
            onChange={handleChange}
            value={formData.phoneNumber}
            name="phoneNumber"
            type="tel"
            className="w-full rounded-md h-14 px-4 focus:outline-none"
            placeholder="Mobile phone *"
            required
            aria-label="Enter phone number"
            disabled={disableForm}
          />
          <input
            onChange={handleChange}
            value={formData.specialty}
            name="specialty"
            type="text"
            className="w-full rounded-md h-14 px-4 focus:outline-none"
            placeholder="Specialty *"
            required
            aria-label="Enter your specialty"
            spellCheck="false"
            disabled={disableForm}
          />
          <input
            onChange={handleChange}
            value={formData.email}
            name="email"
            type="email"
            className="w-full rounded-md h-14 px-4 focus:outline-none"
            placeholder="Email address *"
            required
            aria-label="Enter your email address"
            autoComplete="off"
            spellCheck="false"
            disabled={disableForm}
          />
        </section>
        <button
          className="text-sm border bg-[#FEE330] w-2/3 max-w-[215px] rounded-lg font-semibold p-2 self-start"
          type="submit"
          disabled={disableForm}
        >
          Submit for validation
        </button>

        {/* sm screen */}
        <svg
          className="lg:hidden absolute -bottom-[40px] -right-1/4"
          width="177"
          height="116"
          viewBox="0 0 177 116"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M166.043 33.7059C180.076 46.4849 179.46 69.8028 167.37 85.047C155.279 100.291 131.715 107.462 110.426 111.664C89.1362 115.867 70.1211 117.101 53.7968 111.941C37.4724 106.781 23.8388 95.2262 13.7963 81.056C3.79079 66.8975 -2.58663 50.135 1.34621 34.4575C5.27906 18.78 19.5222 4.1875 36.7846 1.36461C54.0839 -1.44655 74.3657 7.50018 98.8473 13.0936C123.329 18.6869 152.01 20.927 166.043 33.7059Z"
            fill="#00C67F"
          />
        </svg>

        {/* md screen */}

        <svg
          className="hidden lg:flex absolute z-20 -top-[70px] size-[130px] -right-[25px]"
          width="171"
          height="144"
          viewBox="0 0 171 144"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M166.124 70.3361C175.896 88.2466 168.38 114.213 152.168 128.196C135.957 142.179 111.05 144.178 89.2231 143.434C67.3962 142.691 48.6489 139.204 34.4003 129.243C20.1518 119.281 10.4021 102.845 4.90023 84.3974C-0.569475 65.9727 -1.75918 45.5596 6.69558 29.0024C15.1503 12.4452 33.2496 -0.256207 50.7742 1.00173C68.3311 2.28228 85.2811 17.4995 107.286 30.0354C129.292 42.5712 156.352 52.4257 166.124 70.3361Z"
            fill="#00C67F"
          />
        </svg>
        <div className="hidden lg:inline-block absolute -bottom-[55px] size-[300px] -right-[100px]">
          <img src={Pill}/>
        </div>
      </form>

      <svg
        className="lg:hidden z-[-1] absolute bottom-0 md:-bottom-16 md:size-[600px] -right-1/3 md:-right-[40px]"
        width="442"
        height="368"
        viewBox="0 0 442 368"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M316.768 42.4123C351.173 65.5205 376.936 91.1398 401.652 128.512C426.465 165.863 450.232 214.967 437.516 262.502C424.897 310.015 375.796 355.96 319.246 365.851C262.696 375.742 198.575 349.518 137.728 318.797C76.8812 288.076 19.4055 252.836 4.79228 207.263C-9.82096 161.69 18.525 105.762 57.7074 65.9231C96.7674 26.0227 146.735 2.10552 193.208 0.498219C239.655 -1.19249 282.484 19.3654 316.768 42.4123Z"
          fill="#FEE330"
        />
      </svg>
    </div>
  );
};

export default AccountClaimForm;
