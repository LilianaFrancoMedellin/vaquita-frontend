import { useEffect, useState } from 'react';
import Button from 'src/components/Button/Button';
import Card from 'src/components/Card/Card';
import * as groupsService from 'src/services/GroupService';
import { useNavigate } from 'react-router-dom';
import CreateModal from './components/CreateModal/CreateModal';
import LeaveModal from './components/LeaveModal/LeaveModal';
import Message from 'src/components/Message/Message';

const GroupsPage = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenLeave, setIsModalOpenLeave] = useState(false);

  const fetchGroups = () => {
    groupsService
      .getAll()
      .then((res) => {
        setGroups(res.data.groups);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-end my-4">
          <Button text="New Group" action={() => setIsModalOpen(true)} />
        </div>
        <div className="flex gap-2 flex-wrap md:flex-none justify-center">
          {!groups.length && !isLoading && (
            <Message text="Looks like there are not groups associated with you" />
          )}
          {groups.map((group, index) => (
            <Card
              key={index}
              className="w-full sm:w-[calc(50%-4px)] xl:w-[calc(100%/3-8px)]"
              color={group.color}
            >
              <h2 className="text-xl">{group.name}</h2>
              <span className="text-base">
                <span>You owe: </span> <span className="text-vaki-green">$12000</span>
              </span>
              <div className="flex gap-4">
                <Button text="View" action={() => navigate(`/groups/${group.id}`)} size="sm" />
                {group.owneruserid !== group.userid && (
                  <Button
                    text="Leave"
                    action={() => {
                      setIsModalOpenLeave(true);
                      setSelectedGroup(group);
                    }}
                    size="sm"
                  />
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <CreateModal
          onSuccess={fetchGroups}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {isModalOpenLeave && (
        <LeaveModal
          group={selectedGroup}
          onSuccess={fetchGroups}
          isOpen={isModalOpenLeave}
          setIsOpen={setIsModalOpenLeave}
        />
      )}
    </>
  );
};

export default GroupsPage;
