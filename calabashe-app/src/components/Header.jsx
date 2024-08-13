import { Link } from 'react-router-dom';
import Menu from './menuButton';
import LgScreenMenu from './menu-lg';
const Header = () => {
  return ( 
    <header className="z-10 subpixel-antialiased select-none fixed top-0 font-poppins w-full max-h-[50px] text-white/100 bg-black flex items-center justify-between items-center p-2 md:p-4 px-2 lg:px-[4%]">
      <h1 className="text-xl lg:text-3xl font-bold"><Link to="/home">Calabas<span className="text-[#04DA8D]">He</span></Link></h1>
      <nav >
        <Menu/>
        <LgScreenMenu/>
      </nav>
        
    </header>
   );
}
 
export default Header;