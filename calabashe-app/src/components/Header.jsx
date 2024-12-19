import { Link } from 'react-router-dom';
import Menu from './menu_search-sm';
import LgScreenMenu from './menu-md';
import SearchBarMd from './SearchBarMd';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
const Header = () => {
  const {userType} = useAuth();

  return (
    <header className="z-40 subpixel-antialiased select-none fixed top-0 font-poppins w-full 2xl:container max-h-[50px] text-white/100 bg-black flex items-center justify-between p-2 lg:py-8 md:p-4 px-2 md:px-12 lg:pl-16">
      <h1 className="text-xl lg:text-2xl font-bold md:font-black">
          <Link to="/" className="flex items-center justify-center">
              <span className='font-yellow-tail mx-1 text-4xl'>C</span>
              alabas
              <span className="text-[#04DA8D]">he</span>
              <span className='font-semibold ml-2 italic hidden sm:block text-xs sm:text-sm md:text-xl'>{userType && 'for providers'}</span>
          </Link>
      </h1>
      <SearchBarMd/>
      <nav >
        <Menu/>
        <LgScreenMenu/>
      </nav>
        
    </header>
   );
}
 
export default Header;