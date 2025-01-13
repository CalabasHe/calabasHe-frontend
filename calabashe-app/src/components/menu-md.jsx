import { Link } from "react-router-dom";
import '../stylesheets/menu-lg.css'
import { useAuth } from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";

const MdScreenMenu = () => {
  const { isLoggedIn, logout, userType } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  }

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, []);

  return (
    <nav>
      <ul className="links antialiased hover:cursor-pointer hidden md:flex font-medium gap-2 md:gap-4 lg:gap-6 xl:gap-8 text-sm">
        <li className="md-link"> <Link to='/facilities'>Facilities</Link></li>
        <li className="md-link"> <Link to='/doctors'>Doctors</Link></li>
        <li className="md-link"><Link to={"/about"}>About Us</Link></li>
        {/* <li className="md-link"> <Link to='/services'>Services</Link></li> */}
        <li className="md-link"> {
          isLoggedIn ?
            <>
              {(userType === 'doctor' || userType==='facility')?
                <Link to={"/manage_account"} className='pr-4'>Profile</Link> :
                <>
                  <span aria-label="logout" className='px-4' onClick={logout}> Logout</span>
                </>}
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