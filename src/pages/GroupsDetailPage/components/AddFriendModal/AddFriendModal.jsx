import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as userGroupService from 'src/services/UserGroupService';
import Modal from 'src/components/Modal/Modal';
import Button from 'src/components/Button/Button';
import schema from './Validations';

const AddFriendModal = ({ group, isOpen, setIsOpen, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsersId, setSelectedUsersId] = useState([]);

  useEffect(() => {
    userGroupService
      .getAvailableUsersByGroupId(group.id)
      .then((res) => setUsers(res.data.users))
      .catch((error) => console.log(error));
  }, []);

  const onCreate = (e) => {
    e.preventDefault();
    const { error, value } = schema.validate(
      {
        usersId: selectedUsersId.map((selectedUser) => selectedUser.id),
        groupId: group.id,
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

    userGroupService
      .create(value)
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
    <Modal title={`Add friend - Group ${group.name}`} isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={onCreate}>
        <div className="flex flex-col gap-4 justify-center">
          <p>Select at least one friend to continue</p>
          <div className="overflow-scroll max-h-60">
            {users.map((user, index) => (
              <div key={index} className="border-b-2 p-2 flex gap-8">
                <input
                  type="checkbox"
                  id={`user_${user.id}`}
                  name={`user_${user.id}`}
                  value={user.name}
                  onChange={() => {
                    const existingUser = selectedUsersId.find(
                      (selectedUser) => selectedUser.id === user.id
                    );

                    if (existingUser) {
                      setSelectedUsersId(
                        selectedUsersId.filter((selectedUser) => selectedUser.id !== user.id)
                      );
                    } else {
                      setSelectedUsersId([...selectedUsersId, user]);
                    }
                  }}
                />
                <label className="w-full cursor-pointer" htmlFor={`user_${user.id}`}>
                  {' '}
                  {user.name}
                </label>
              </div>
            ))}
          </div>
          <Button
            className="w-full"
            disabled={isLoading || !selectedUsersId.length}
            text="Add"
            type="submit"
          />
        </div>
      </form>
      {message && <p className="text-vaki-red mt-6 text-center">{message}</p>}
    </Modal>
  );
};

AddFriendModal.propTypes = {
  group: PropTypes.any,
  setIsOpen: PropTypes.func,
  onSuccess: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddFriendModal;
