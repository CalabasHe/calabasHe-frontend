import { Link } from "react-router-dom";
import '../stylesheets/menu-lg.css'
import { useAuth } from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import ResetPassword from "./ResetPassword";

const MdScreenMenu = () => {
  const { isLoggedIn, logout, userType } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showPopUp, setShowPopUp] = useState(false);
  // const popRef = useRef(null);
  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  }
  const handlePopUp = (value) => {
    setShowPopUp(value);
  };
  
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
    // if (popRef.current && !popRef.current.contains(event.target)) {
    //   setShowPopUp(false);
    // }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, []);

  return (
    <nav>
      <ResetPassword showPopUp={showPopUp} handlePopUp={handlePopUp}/>
      <ul className="links antialiased hover:cursor-pointer hidden md:flex font-medium gap-2 md:gap-4 lg:gap-6 xl:gap-8 text-sm">
        <li className="md-link"> <Link to='/facilities'>Facilities</Link></li>
        <li className="md-link"> <Link to='/doctors'>Doctors</Link></li>
        <li className="md-link"><Link to={"/about"}>About Us</Link></li>
        {/* <li className="md-link"> <Link to='/services'>Services</Link></li> */}
        <li className="md-link"> {
          isLoggedIn ?
            <>
              {userType === 'doctor' ?
                <Link to={"/manage_account"}>Profile</Link> :
                <div  ref={dropdownRef}>
                  <button onClick={toggleDropDown}>Profile</button>
                  {isOpen &&
                    <div className="absolute  -right-2 top-6 w-80 h-24 flex flex-col gap-2 bg-white text-md text-zinc-700 px-6 p-6 rounded-lg">
                      <button className='px-4 text-start' onClick={() => setShowPopUp(true)}>Change Password</button>
                      <Link aria-label="logout" className='px-4' onClick={logout}> Logout</Link>
                    </div>}
                </div>}
            </>
            : (
              <div className="relative" ref={dropdownRef}>
                <button onClick={toggleDropDown}>Sign in</button>
                {isOpen &&
                  <div className="absolute  -right-2 top-6 w-80 h-52 flex flex-col gap-2 bg-white text-md text-zinc-700 px-6 p-6 rounded-lg">
                    <Link to={"/sign_in"} className="border-b-2 border-gray-200 px-2 py-1 hover:cursor-pointer decoration-slate-500">
                      <h3 className="text-base mb-2">Patients</h3>
                      <p className="text-sm pt-1 pb-3 hover:underline">Log in</p>
                    </Link>
                    <div className="px-2 py-1 hover:cursor-pointer decoration-slate-500 flex flex-col">
                      <h3 className="text-base mb-2">Providers</h3>
                      <Link className="text-sm pb-2 hover:underline" to={"/providers_login"} state={{ userType: "doctor" }}>Doctors Log in</Link>
                      <Link className="text-sm pb-2 hover:underline" to={"/providers_login"} state={{ userType: "facility" }}>Facilities Log in</Link>
                    </div>
                  </div>}
              </div>
            )
        }
        </li>
      </ul>
    </nav>
  );
}

export default MdScreenMenu;