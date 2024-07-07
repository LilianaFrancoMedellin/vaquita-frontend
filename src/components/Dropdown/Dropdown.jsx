import arrowDownIcon from 'src/assets/arrow-down.svg';
import PropTypes from 'prop-types';

const availableIcons = {
  arrowDown: arrowDownIcon,
};

const Dropdown = ({ icon, ariaLabel, id, placeholder, name, onChange, options }) => {
  const showIcon = !!availableIcons[icon];

  return (
    <div className="relative">
      <select
        aria-label={ariaLabel}
        id={id}
        name={name}
        className="w-full border border-vaki-black rounded py-[5px] pl-2 pr-8 text-vaki-black placeholder:bg-vaki-black appearance-none"
        onChange={(e) => onChange(e.target.value !== '-1' ? e.target.value : '')}
        defaultValue="-1"
      >
        {placeholder && <option value="-1">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {showIcon && (
        <img className="absolute top-[14px] right-[8px]" src={availableIcons[icon]} alt="icon" />
      )}
    </div>
  );
};

Dropdown.propTypes = {
  ariaLabel: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  options: PropTypes.array,
};

export default Dropdown;
