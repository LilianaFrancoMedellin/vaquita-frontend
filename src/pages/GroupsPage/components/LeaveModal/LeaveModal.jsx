import { useState } from 'react';
import PropTypes from 'prop-types';
import * as userGroupService from 'src/services/UserGroupService';
import Modal from 'src/components/Modal/Modal';
import Button from 'src/components/Button/Button';

const LeaveModal = ({ group, isOpen, setIsOpen, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onLeave = (e) => {
    e.preventDefault();

    setMessage('');
    setIsLoading(true);

    userGroupService
      .leaveGroup(group.usergroupid)
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
    <Modal title="Leave Group" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={onLeave}>
        <div className="flex flex-col gap-4 justify-center">
          <p>Are you sure you want to leave the group?</p>
          <Button className="w-full" disabled={isLoading} text="Yes, Leave" type="submit" />
        </div>
      </form>
      {message && <p className="text-vaki-red mt-6 text-center">{message}</p>}
    </Modal>
  );
};

LeaveModal.propTypes = {
  group: PropTypes.any,
  setIsOpen: PropTypes.func,
  onSuccess: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default LeaveModal;
