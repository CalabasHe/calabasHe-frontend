import '../stylesheets/header.css'
import { Link } from 'react-router-dom';
import Menu from './menuButton';
const Header = () => {
  return ( 
    <header className="z-10 subpixel-antialiased select-none fixed top-0 font-poppins w-full max-h-[50px] text-white/100 bg-black flex items-center justify-between items-center p-2 md:p-4 px-2 lg:px-[5%]">
      <h1 className="text-xl lg:text-3xl font-bold"><Link to="/home">Calabas<span className="text-[#04DA8D]">He</span></Link></h1>
      <nav>
        <Menu/>
        <ul className="antialiased hover:cursor-pointer hidden md:flex font-bold gap-2 lg:gap-6 text-base lg:text-lg">
          <li className=""> <Link to='/hospitals'>Hospital</Link></li>
          <li className=""> <Link to='/doctors'>Doctors</Link></li>
          <li className=""> <Link to='/services'>Services</Link></li>
        </ul>
      </nav>
        
    </header>
   );
}
 
export default Header;