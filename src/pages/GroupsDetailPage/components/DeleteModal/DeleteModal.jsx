import { useState } from 'react';
import PropTypes from 'prop-types';
import * as groupsService from 'src/services/GroupService';
import Modal from 'src/components/Modal/Modal';
import Button from 'src/components/Button/Button';

const DeleteModal = ({ group, isOpen, setIsOpen, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onDelete = (e) => {
    e.preventDefault();

    setMessage('');
    setIsLoading(true);

    groupsService
      .remove(group.id)
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
    <Modal title="Delete Group" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={onDelete}>
        <div className="flex flex-col gap-4 justify-center">
          <p>Are you sure you want to delete the group? All information will be lost.</p>
          <Button className="w-full" disabled={isLoading} text="Yes, Delete" type="submit" />
        </div>
      </form>
      {message && <p className="text-vaki-red mt-6 text-center">{message}</p>}
    </Modal>
  );
};

DeleteModal.propTypes = {
  group: PropTypes.any,
  setIsOpen: PropTypes.func,
  onSuccess: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default DeleteModal;
