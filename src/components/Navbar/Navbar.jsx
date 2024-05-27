import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.svg';
import userFilledLogo from '../../assets/user-filled.svg';

import { useAuth } from '../../hooks/useAuth';
import { useEscapeKey } from '../../hooks/useEscapeKey';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { pathname } = location;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="flex justify-between items-center flex-wrap sm:flex-nowrap bg-vaki-primary text-white p-4 lg:px-40 text-2xl">
      <div>
        <Link
          className="lg:outline-none lg:hover:underline lg:focus:underline lg:active:underline"
          to="/"
        >
          <div className="flex items-center gap-2">
            <img src={logo} alt="Vaki Logo" />
            <span>Vaki</span>
          </div>
        </Link>
      </div>
      <div className="flex flex-wrap mt-3 sm:mt-0 order-last sm:order-none justify-between sm:justify-normal w-full sm:w-fit gap-2 xs:gap-8">
        <NavbarLink pathname={pathname} text="Friends" path="/friends" />
        <NavbarLink pathname={pathname} text="Expenses" path="/expenses" />
        <NavbarLink pathname={pathname} text="Groups" path="/groups" />
      </div>
      <DropdownMenu />
    </header>
  );
};

const TriangleUp = ({ visible }) => {
  return (
    <div
      className={`${
        visible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-500 w-0 h-0 absolute bottom-[-16px] sm:bottom-[-19px]
    border-l-[8px] border-l-transparent
    border-b-[8px] border-b-white
    border-r-[8px] border-r-transparent`}
    ></div>
  );
};

TriangleUp.propTypes = {
  hideOnMobile: PropTypes.bool,
  visible: PropTypes.bool,
};

const NavbarLink = ({ pathname, path, text }) => {
  return (
    <Link
      className="lg:outline-none lg:hover:underline lg:focus:underline lg:active:underline relative flex justify-center"
      to={path}
    >
      {text}
      <TriangleUp visible={pathname.includes(path)} />
    </Link>
  );
};

NavbarLink.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string,
};

const DropdownMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const containerRef = React.useRef();

  useEscapeKey({
    isOpen: isDropdownOpen,
    setIsOpen: setIsDropdownOpen,
  });

  // closes the dropdown when clicking outside the element (body)
  React.useEffect(() => {
    const closeDropdown = (e) => {
      if (!containerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.body.addEventListener('click', closeDropdown);

    return () => {
      document.body.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex gap-5 relative">
      <button
        className="rounded-full p-[0.3rem] px-[0.4rem] bg-white"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        id="dropdownDefaultButton"
      >
        <img src={userFilledLogo} alt="Menu logo" />
      </button>
      <div
        id="dropdown"
        className={`z-10 ${
          isDropdownOpen ? '' : 'hidden'
        } bg-white divide-y divide-gray-100 absolute right-0 top-[40px] rounded-lg shadow dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <DropdownElement
            onClick={() => setIsDropdownOpen(false)}
            text="Account"
            path="/my-account"
          />
          <DropdownElement onClick={() => setIsDropdownOpen(false)} text="Logout" path="/logout" />
        </ul>
      </div>
    </div>
  );
};

const DropdownElement = ({ path, text, onClick }) => {
  return (
    <li>
      <Link
        onClick={onClick}
        className="block px-7 py-2 text-vaki-primary hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-2xl"
        to={path}
      >
        {text}
      </Link>
    </li>
  );
};

DropdownElement.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Navbar;
