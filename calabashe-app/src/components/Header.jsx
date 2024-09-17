import { Link } from 'react-router-dom';
import Menu from './menu_search-sm';
import LgScreenMenu from './menu-md';
import SearchBarMd from './SearchBarMd';
const Header = () => {
  return ( 
    <header className="z-40 subpixel-antialiased select-none fixed top-0 font-poppins w-full max-h-[50px] text-white/100 bg-black flex items-center justify-between items-center p-2 lg:py-8 md:p-4 px-2 md:px-12 lg:pl-16">
      <h1 className="text-xl lg:text-2xl font-bold md:font-black"><Link to="/home">Calabas<span className="text-[#04DA8D]">he</span></Link></h1>
      <SearchBarMd/>
      <nav >
        <Menu/>
        <LgScreenMenu/>
      </nav>
        
    </header>
   );
}
 
export default Header;