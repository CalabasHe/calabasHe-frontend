import { Link } from "react-router-dom";
import '../stylesheets/menu-lg.css'

const LgScreenMenu = () => {
  return ( 
    <nav>
       <ul className="antialiased hover:cursor-pointer hidden md:flex font-semibold gap-2 lg:gap-6 text-base lg:text-lg">
          <li className="md-link"> <Link to='/hospitals'>Hospitals</Link></li>
          <li className="md-link"> <Link to='/doctors'>Doctors</Link></li>
          <li className="md-link"> <Link to='/services'>Services</Link></li>
        </ul>
    </nav>
   );
}
 
export default LgScreenMenu;