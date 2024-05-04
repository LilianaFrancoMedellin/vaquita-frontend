import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../assets/logo.svg";

const Navbar = () => {
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
      <NavbarLink text="My Account" path="/my-account" />
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

export default Navbar;
