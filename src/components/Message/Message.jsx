import PropTypes from 'prop-types';

const Message = ({ text }) => {
  return <h2 className="text-center text-vaki-secondary text-2xl mt-8">{text}</h2>;
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Message;
