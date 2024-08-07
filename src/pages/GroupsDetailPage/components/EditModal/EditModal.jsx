import { useState } from 'react';
import PropTypes from 'prop-types';
import * as groupsService from 'src/services/GroupService';
import Modal from 'src/components/Modal/Modal';
import TextInput from 'src/components/TextInput/TextInput';
import ColorPicker from 'src/components/ColorPicker/ColorPicker';
import Button from 'src/components/Button/Button';
import schema from './Validations';

const EditModal = ({ group, isOpen, setIsOpen, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState(group.name);
  const [color, setColor] = useState(group.color);

  const onCreate = (e) => {
    e.preventDefault();
    const { error, value } = schema.validate(
      {
        name,
        color,
        id: group.id,
      },
      {
        abortEarly: false,
      }
    );

    if (error) {
      setMessage(error.details[0].message);
      return;
    }

    setMessage('');
    setIsLoading(true);

    groupsService
      .edit(value)
      .then(() => {
        setIsOpen(false);
        onSuccess();
      })
      .catch((error) => {
        setIsLoading(false);
        setMessage(error.response.data.message);
      });
  };

  return (
    <Modal title="Edit Group" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={onCreate}>
        <div className="flex flex-col gap-4 justify-center">
          <TextInput
            ariaLabel="Group name"
            type="text"
            placeholder="Group name"
            name="groupName"
            icon="people"
            onChange={(value) => setName(value)}
            value={name}
          />
          <ColorPicker onSelected={setColor} selectedColor={color} />
          <Button className="w-full" disabled={isLoading} text="Edit" type="submit" />
        </div>
      </form>
      {message && <p className="text-vaki-red mt-6 text-center">{message}</p>}
    </Modal>
  );
};

EditModal.propTypes = {
  group: PropTypes.any,
  setIsOpen: PropTypes.func,
  onSuccess: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default EditModal;
