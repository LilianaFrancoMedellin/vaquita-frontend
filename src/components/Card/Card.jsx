import PropTypes from 'prop-types';
import logo from '../../assets/logo.svg';
import Button from '../Button/Button';

function Card({ color, className, name }) {
  return (
    <div
      className={`${
        className ?? ''
      } flex justify-start gap-8 p-4 font-base shadow-lg rounded border`}
    >
      <div
        style={{ backgroundColor: color }}
        className="flex items-center justify-between px-6 rounded"
      >
        <img src={logo} alt="Card logo" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-xl">{name}</h2>
        <span className="text-base">
          <span>You owe: </span> <span className="text-vaki-green">$12000</span>
        </span>
        <div className="flex gap-4">
          <Button text="Edit" action={() => console.log('click on edit')} size="sm" />
          <Button text="Delete" action={() => console.log('click on delete')} size="sm" />
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
};

export default Card;
