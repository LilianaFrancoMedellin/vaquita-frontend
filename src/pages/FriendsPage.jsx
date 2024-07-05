import { useEffect, useState } from 'react';
import * as userService from 'src/services/UserService';
import Card from 'src/components/Card/Card';

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    userService
      .getAll()
      .then((res) => {
        setFriends(res.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 flex-wrap md:flex-none justify-center">
        {friends.map((user, index) => (
          <Card key={index} className="w-full sm:w-[calc(50%-4px)] xl:w-[calc(100%/3-8px)]">
            <h2 className="text-xl">{user.name}</h2>
            <span className="text-base">{user.email}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
