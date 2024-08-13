import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/menu.css';

const Menu = () => {
  const [isChecked, setIsChecked] = useState(false);
  const menuRef = useRef(null);
  const checkboxRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // If the click is outside the menu and the checkbox
      if (menuRef.current && !menuRef.current.contains(event.target) &&
          checkboxRef.current && !checkboxRef.current.contains(event.target)) {
        setIsChecked(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCheckboxClick = (e) => {
    e.stopPropagation(); // Prevent click event from bubbling up
    setIsChecked(e.target.checked);
  };

  return (
    <nav className="md:hidden font-poppins text-lg" ref={menuRef}>
      <label className="hamburger-menu" htmlFor='button'>
        <input 
          type="checkbox"
          id='button'
          ref={checkboxRef}
          checked={isChecked}
          onChange={handleCheckboxClick}
        />
      </label>
      <aside className=" navmenu antialiased font-semibold text-sm rounded-bl-md">
        <ul>
          <li id="sign-in link">
            <div className='flex gap-2'>
              {/* <svg
                className='w-5 h-5 order-2'
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 512 512">
                <path fill="#003e6b" d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
              </svg> */}
              <Link to="/sign_in">Sign In</Link>
            </div>
          </li>
          <li id="hospital-link"><Link to="/hospitals">Hospitals</Link></li>
          <li id="doctors-link"><Link to="/doctors">Doctors</Link></li>
          <li id="services-link"><Link to="/services">Services</Link></li>
        </ul>
      </aside>
    </nav>
  );
};

export default Menu;
