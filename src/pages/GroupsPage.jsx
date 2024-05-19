import Button from '../components/Button/Button';

const GroupsPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-end my-4">
        <Button text="New Group" action={() => console.log('click on new group')} size="md" />
      </div>
      <div className="flex gap-2 flex-wrap md:flex-none">{/* Cards here */}</div>
    </div>
  );
};

export default GroupsPage;
