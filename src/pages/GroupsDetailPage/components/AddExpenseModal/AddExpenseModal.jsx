import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as expenseService from 'src/services/ExpenseService';
import * as userGroupService from 'src/services/UserGroupService';
import Modal from 'src/components/Modal/Modal';
import TextInput from 'src/components/TextInput/TextInput';
import Button from 'src/components/Button/Button';
import schema from './Validations';
import Dropdown from 'src/components/Dropdown/Dropdown';

const AddExpenseModal = ({ group, isOpen, setIsOpen, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [total, setTotal] = useState(null);
  const [description, setDescription] = useState('');
  const [paidBy, setPaidBy] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userGroupService
      .getAllByGroupId(group.id)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => console.log(error));
  }, []);

  const onCreate = (e) => {
    e.preventDefault();
    const { error, value } = schema.validate(
      {
        total,
        description,
        ownerUserId: paidBy,
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

    expenseService
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
    <Modal title="New Expense" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={onCreate}>
        <div className="flex flex-col gap-4 justify-center">
          <TextInput
            ariaLabel="Total"
            type="number"
            placeholder="Total"
            name="Total"
            icon="dollar"
            onChange={(value) => setTotal(value)}
          />
          <TextInput
            ariaLabel="Description"
            type="text"
            placeholder="Description"
            name="description"
            icon="wallet"
            onChange={(value) => setDescription(value)}
          />
          <Dropdown
            options={users.map((user) => ({
              value: user.id,
              label: `${user.name} - ${user.email}`,
            }))}
            icon="arrowDown"
            placeholder="Paid by"
            id="paid-by-id"
            name="paid-by-name"
            onChange={(value) => setPaidBy(value || 0)}
          />
          <Button className="w-full" disabled={isLoading} text="Save" type="submit" />
        </div>
      </form>
      {message && <p className="text-vaki-red mt-6 text-center">{message}</p>}
    </Modal>
  );
};

AddExpenseModal.propTypes = {
  group: PropTypes.any,
  setIsOpen: PropTypes.func,
  onSuccess: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddExpenseModal;
