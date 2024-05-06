import PropTypes from 'prop-types';

const Button = ({ disabled, text, action, size }) => {
  return (
    <button
      disabled={!!disabled}
      onClick={action}
      type="button"
      className={`bg-vaki-primary text-white rounded cursor-pointer ${
        size === 'md' ? 'px-3 py-2' : 'px-2 py-1'
      } ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
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
