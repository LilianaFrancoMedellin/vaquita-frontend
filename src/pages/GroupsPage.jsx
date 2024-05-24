import { useEffect, useState } from 'react';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import * as groupsService from '../services/GroupService';
import { useNavigate } from 'react-router-dom';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    groupsService
      .getAll()
      .then((res) => setGroups(res.data.groups))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-end my-4">
        <Button text="New Group" action={() => console.log('click on new group')} />
      </div>
      <div className="flex gap-2 flex-wrap md:flex-none justify-center">
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
              <Button text="Delete" action={() => console.log('click on delete')} size="sm" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GroupsPage;
