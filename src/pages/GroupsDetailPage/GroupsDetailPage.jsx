import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'src/components/Button/Button';
import Card from 'src/components/Card/Card';
import * as groupsService from 'src/services/GroupService';
import * as expenseService from 'src/services/ExpenseService';
import EditModal from './components/EditModal/EditModal';
import AddFriendModal from './components/AddFriendModal/AddFriendModal';
import DeleteModal from 'src/pages/GroupsDetailPage/components/DeleteModal/DeleteModal';
import AddExpenseModal from './components/AddExpenseModal/AddExpenseModal';
import Message from 'src/components/Message/Message';

const GroupsDetailPage = () => {
  const [group, setGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAddFriend, setIsModalOpenAddFriend] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenAddExpense, setIsModalOpenAddExpense] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(true);

  const navigate = useNavigate();
  const params = useParams();

  const fetchGroup = () => {
    groupsService
      .getById(params.id)
      .then((res) => {
        setGroup(res.data.group);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const fetchExpenses = () => {
    expenseService
      .getAllByGroup(params.id)
      .then((res) => {
        setExpenses(res.data.expenses);
        setIsLoadingExpenses(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingExpenses(false);
      });
  };

  useEffect(() => {
    if (!params.id) {
      return;
    }

    fetchGroup();
    fetchExpenses();
  }, [params]);

  if (!group && !isLoading) {
    return <Message text="Looks like the group you are looking for does not exists" />;
  }

  if (!group) {
    return null;
  }

  const imTheOwner = group.owneruserid === group.userid;

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col xs:flex-row xs:justify-end my-4 gap-2 sm:gap-4">
          <Button text="New Expense" action={() => setIsModalOpenAddExpense(true)} />
          <Button text="New Friend" action={() => setIsModalOpenAddFriend(true)} />
          {imTheOwner && <Button text="Edit Group" action={() => setIsModalOpen(true)} />}
        </div>
        <div>
          <Card className="border-0 shadow-none w-full sm:w-1/2 xl:w-1/3" color={group.color}>
            <h2 className="text-xl">{group.name}</h2>
            <span className="text-base">
              <span>You owe: </span> <span className="text-vaki-green">$12000</span>
            </span>
            <span className="text-base">
              <span>Participants: </span>{' '}
              <span className="text-vaki-red">{group.participants}</span>
            </span>
            {imTheOwner && (
              <div className="flex gap-4">
                <Button text="Delete" action={() => setIsModalOpenDelete(true)} size="sm" />
              </div>
            )}
          </Card>
        </div>
        <div className="mx-2">
          <h2 className="text-vaki-secondary border-b-2">EXPENSES</h2>
        </div>
        <div className="flex gap-2 flex-wrap md:flex-none justify-center">
          {expenses.map((expense, index) => (
            <Card
              hideLogo
              key={index}
              className="w-full sm:w-[calc(50%-4px)] xl:w-[calc(100%/3-8px)]"
            >
              <h2 className="text-xl">{expense.description}</h2>
              <span className="text-base">
                <span className="text-vaki-secondary">{expense.paidBy} </span> paid{' '}
                <span>${expense.total}</span>
              </span>
              <span className="text-base">
                {expense.owe > 0 ? `I owe $${expense.owe}` : 'I did not participate'}
              </span>
              <div className="flex gap-4">
                <Button text="Edit" action={() => console.log('click on edit')} size="sm" />
                <Button text="Delete" action={() => console.log('click on delete')} size="sm" />
              </div>
            </Card>
          ))}
          {!expenses.length && !isLoadingExpenses && (
            <Message text="Looks like the group does not have Expenses yet" />
          )}
        </div>
      </div>
      {isModalOpen && (
        <EditModal
          group={group}
          onSuccess={fetchGroup}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}
      {isModalOpenAddFriend && (
        <AddFriendModal
          group={group}
          onSuccess={fetchGroup}
          isOpen={isModalOpenAddFriend}
          setIsOpen={setIsModalOpenAddFriend}
        />
      )}
      {isModalOpenDelete && (
        <DeleteModal
          group={group}
          onSuccess={() => navigate('/groups')}
          isOpen={isModalOpenDelete}
          setIsOpen={setIsModalOpenDelete}
        />
      )}
      {isModalOpenAddExpense && (
        <AddExpenseModal
          group={group}
          onSuccess={fetchExpenses}
          isOpen={isModalOpenAddExpense}
          setIsOpen={setIsModalOpenAddExpense}
        />
      )}
    </>
  );
};

export default GroupsDetailPage;
