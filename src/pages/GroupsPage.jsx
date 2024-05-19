import { useEffect, useState } from 'react';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import * as groupsService from '../services/GroupService';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    groupsService
      .getAll()
      .then((res) => setGroups(res.data.groups))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-end my-4">
        <Button text="New Group" action={() => console.log('click on new group')} size="md" />
      </div>
      <div className="flex gap-2 flex-wrap md:flex-none">
        {groups.map((group, index) => (
          <Card
            key={index}
            className="w-full sm:w-[calc(50%-4px)] xl:w-[calc(100%/3-8px)]"
            {...group}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupsPage;
