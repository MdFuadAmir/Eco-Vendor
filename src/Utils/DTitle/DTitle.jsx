// eslint-disable-next-line no-unused-vars
const DTitle = ({icon : Icon,label}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex gap-2 items-center dark:text-green-400">
        <Icon/> {label}
      </h2>
    </div>
  );
};

export default DTitle;
