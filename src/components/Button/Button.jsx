const Button = (props) => {
  const { children } = props;
  return (
    <button className="bg-blue-500 rounded-lg px-4 py-2 text-3xl">
      {children}
    </button>
  );
};

export { Button };
