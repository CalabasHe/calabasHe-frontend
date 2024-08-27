import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/menu.css';

const Menu = () => {
  const [isChecked, setIsChecked] = useState(false);
  const menuRef = useRef(null);
  const checkboxRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      
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
    e.stopPropagation(); 
    setIsChecked(e.target.checked);
  };

  const handleLinkClick = () => {
    setIsChecked(false);
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
      <aside className="navmenu antialiased font-semibold text-sm rounded-bl-md">
        <ul>
          <li id="sign-in link">
            <div className='flex gap-2'>
              <Link to="/sign_in" onClick={handleLinkClick}>Sign In</Link>
            </div>
          </li>
          <li id="hospital-link">
            <Link to="/hospitals" onClick={handleLinkClick}>Hospitals</Link>
          </li>
          <li id="doctors-link">
            <Link to="/doctors" onClick={handleLinkClick}>Doctors</Link>
          </li>
          <li id="services-link">
            <Link to="/services" onClick={handleLinkClick}>Services</Link>
          </li>
        </ul>
      </aside>
    </nav>
  );
};

export default Menu;
