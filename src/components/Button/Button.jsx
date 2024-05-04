import PropTypes from 'prop-types';

const Button = ({ text, action, size }) => {
  return (
    <button
      onClick={action}
      type="button"
      className={`bg-vaki-primary text-white rounded cursor-pointer ${
        size === 'md' ? 'px-3 py-2' : 'px-2 py-1'
      }`}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  action: PropTypes.func,
  text: PropTypes.string,
  size: PropTypes.string,
};

export default Button;
