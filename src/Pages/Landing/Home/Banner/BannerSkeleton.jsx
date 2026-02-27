const BannerSkeleton = () => {
  return (
    <div className="container pt-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* slider skeleton */}
        <div className="flex-4">
          <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-xl"></div>
        </div>

        {/* ads skeleton */}
        <div className="flex-1 hidden lg:flex flex-col h-96">
          <div className="h-1/2 pb-2">
            <div className="w-full h-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-xl"></div>
          </div>
          <div className="h-1/2 pt-2">
            <div className="w-full h-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BannerSkeleton;