import '../stylesheets/header.css'
import { Link } from 'react-router-dom';
const Header = () => {
  return ( 
    <nav className="subpixel-antialiased select-none fixed top-0 font-helvetica w-full text-white/100 bg-black flex items-center justify-between items-center p-4 px-2 lg:px-40">
      <h1 className="text-xl lg:text-4xl font-black"><Link to="/home">Calabas<span className="text-[#04DA8D]">He</span></Link></h1>
      <ul className="antialiased hover:cursor-pointer font-bold flex gap-2 lg:gap-6 lg:text-xl">
        <li className='hidden md:flex'> <Link to='/hospitals'>Hospital</Link></li>
        <li className="hidden md:flex"> <Link to='/doctors'>Doctors</Link></li>
        <li className="hidden md:flex"> <Link to='/services'>Services</Link></li>
      </ul>
        
    </nav>
   );
}
 
export default Header;