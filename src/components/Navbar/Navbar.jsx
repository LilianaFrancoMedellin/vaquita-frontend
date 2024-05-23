import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="flex justify-between items-center flex-wrap sm:flex-nowrap bg-vaki-primary text-white p-4 lg:px-40 text-2xl">
      <div>
        <Link className="lg:hover:underline" to="/">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Vaki Logo" />
            <span>Vaki</span>
          </div>
        </Link>
      </div>
      <div className="flex mt-3 sm:mt-0 order-last sm:order-none justify-between sm:justify-normal w-full sm:w-fit gap-8">
        <NavbarLink text="Friends" path="/friends" />
        <NavbarLink text="Expenses" path="/expenses" />
        <NavbarLink text="Groups" path="/groups" />
      </div>
      <DropdownMenu />
    </header>
  );
};

const NavbarLink = ({ path, text }) => {
  return (
    <Link className="lg:hover:underline relative flex justify-center" to={path}>
      {text}
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

  const escFunction = React.useCallback(
    (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    },
    [isDropdownOpen]
  );

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

  // closes the dropdown when pressing escape key
  React.useEffect(() => {
    if (!isDropdownOpen) {
      document.removeEventListener('keydown', escFunction, false);
      return;
    }
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction, isDropdownOpen]);

  return (
    <div ref={containerRef} className="flex gap-5 relative">
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        id="dropdownDefaultButton"
      >
        <svg
          data-dropdown-toggle="dropdown"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
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
