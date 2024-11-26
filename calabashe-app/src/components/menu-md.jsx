import { Link } from "react-router-dom";
import '../stylesheets/menu-lg.css'
import { useAuth } from "../hooks/useAuth";

const MdScreenMenu = () => {
  const { isLoggedIn, logout } = useAuth();
  return ( 
    <nav>
       <ul className="links antialiased hover:cursor-pointer hidden md:flex font-medium gap-2 md:gap-4 lg:gap-6 xl:gap-8 text-sm">
          <li className="md-link"> <Link to='/facilities'>Facilities</Link></li>
          <li className="md-link"> <Link to='/doctors'>Doctors</Link></li>
          <li className="md-link"><Link to={"/about"}>About Us</Link></li>
          {/* <li className="md-link"> <Link to='/services'>Services</Link></li> */}
          <li className="md-link"> {isLoggedIn ? 
            <span aria-label="logout" onClick={logout}> Logout</span> : <Link to='/sign_in'>Sign In</Link>}
          </li>
        </ul>
    </nav>
   );
}
 
export default MdScreenMenu;