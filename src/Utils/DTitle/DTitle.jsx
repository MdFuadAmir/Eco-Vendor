// eslint-disable-next-line no-unused-vars
const DTitle = ({icon : Icon,label}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold flex gap-2 items-center text-gray-600 dark:text-white">
        <Icon/> {label}
      </h2>
    </div>
  );
};

export default DTitle;
