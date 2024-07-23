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
      <label className="hamburger-menu">
        <input 
          type="checkbox" 
          ref={checkboxRef}
          checked={isChecked}
          onChange={handleCheckboxClick} // Handle checkbox state change
        />
      </label>
      <aside className="navmenu antialiased font-bold rounded-bl-md">
        <ul>
          <li id="hospital-link"><Link to="/hospitals">Hospital</Link></li>
          <li id="doctors-link"><Link to="/doctors">Doctors</Link></li>
          <li id="services-link"><Link to="/services">Services</Link></li>
        </ul>
      </aside>
    </nav>
  );
};

export default Menu;
