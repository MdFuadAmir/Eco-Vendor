

const SliderSkeletonRow = () => {
  return (
    <tr>
      <td>
        <div className="w-24 h-12 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
      </td>
      
      <td>
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
      </td>
      <td>
        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
      </td>
      <td>
        <div className="flex gap-2">
          <div className="h-6 w-12 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
          <div className="h-6 w-12 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
        </div>
      </td>
    </tr>
  );
};

export default SliderSkeletonRow;
