import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IoMdChatbubbles } from "react-icons/io";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ProductList from "../../Products/ProductList/ProductList";
import useMongoUser from "../../../Hooks/useMongoUser";
import FollowButton from "./FollowButton";
import ShopAds from "./ShopAds";
const ShopPage = () => {
  const { sellerId } = useParams();
  const axiosPublic = useAxios();
  const { mongoUser } = useMongoUser();

  // seller info
  const { data: shop, isLoading } = useQuery({
    queryKey: ["shop", sellerId],
    enabled: !!sellerId,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/shop/${sellerId}`);
      return data;
    },
  });
  const { data: totalProductsData, isLoading: totalLoading } = useQuery({
    queryKey: ["totalProducts", sellerId],
    enabled: !!sellerId,
    queryFn: async () => {
      const res = await axiosPublic.get(`/shop-products/count/${sellerId}`);
      return res.data;
    },
  });
  const { data: followers, refetch } = useQuery({
    queryKey: ["followers", sellerId],
    queryFn: async () => {
      const res = await axiosPublic.get(`/followers-count/${sellerId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="px-4 md:px-10 lg:px-20 mx-auto ">
        {/* SHOP HEADER SKELETON */}
        <div className="bg-slate-100 dark:bg-gray-800  rounded-xl space-y-4">
          <Skeleton height={40} width={300} />
          <Skeleton height={20} count={2} />
          <Skeleton height={15} width={200} />
          <Skeleton height={15} width={220} />
          <Skeleton height={15} width={180} />
        </div>

        {/* PRODUCTS SKELETON */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="p-4 border rounded-xl dark:border-gray-700"
              >
                <Skeleton height={180} />
                <Skeleton height={20} className="mt-3" />
                <Skeleton height={20} width={120} />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      {/* SHOP HEADER */}
      <div
        className="p-4 md:p-6 rounded-xl bg-cover bg-center  h-fit"
        style={{ backgroundImage: `url(${shop?.sellerInfo?.cover})` }}
      >
        <div className="bg-slate-100 dark:bg-gray-950/80 w-fit rounded-lg p-4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img
              src={shop?.sellerInfo?.logo}
              alt="/shopLogo"
              className="w-16 h-16 rounded-md"
            />
            <div className=" space-y-1">
              <h1 className="text-xl font-bold dark:text-white">
                {shop?.sellerInfo?.shopName}
              </h1>

              <p className="dark:text-gray-300 text-sm">
                {followers?.count || 0} Followers
              </p>
            </div>
          </div>
          <div className="dark:text-white justify-end flex gap-6">
            <p className="flex items-center gap-1 btn btn-info btn-sm">
              <IoMdChatbubbles /> chat now
            </p>
            <FollowButton
              sellerId={sellerId}
              currentUserId={mongoUser?._id}
              refetch={refetch}
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Tabs>
          {/* tabl name */}
          <TabList className="flex gap-6 border-b  dark:border-gray-700 mb-6">
            <Tab
              className="px-4 py-2 cursor-pointer text-gray-500 dark:text-gray-300"
              selectedClassName="!text-blue-600 font-semibold !border-b-2"
            >
              Store
            </Tab>

            <Tab
              className="px-4 py-2 cursor-pointer text-gray-500 dark:text-gray-300"
              selectedClassName="!text-blue-600  font-semibold !border-b-2"
            >
              Products
            </Tab>

            <Tab
              className="px-4 py-2 cursor-pointer text-gray-500 dark:text-gray-300"
              selectedClassName="!text-blue-600 font-semibold !border-b-2"
            >
              Profile
            </Tab>
          </TabList>
          {/* shop */}
          <TabPanel>
            <div className="space-y-10 mt-6">
              {/* FEATURED PRODUCTS */}
              <div>
                <ShopAds sellerId={sellerId} />
                <h2 className="text-xl font-semibold my-6 dark:text-white">
                  Featured Products
                </h2>
                <ProductList
                  endpoint={`/shop-products/featured/${sellerId}`}
                  queryKey={["shopProductsFeatured", sellerId]}
                  limit={20}
                  paginated={false}
                  gridClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
                />
              </div>
            </div>
          </TabPanel>
          {/* PRODUCTS */}
          <TabPanel>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-6 dark:text-white">
                Shop Products
              </h2>
              <ProductList
                endpoint={`/shop-products/${sellerId}`}
                queryKey={["shopProducts", sellerId]}
                limit={20}
                paginated={true}
                gridClass="grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
              />
            </div>
          </TabPanel>
          {/* profile */}
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md dark:shadow-gray-800 p-6 border border-gray-100 dark:border-gray-700 transition hover:scale-[1.02] duration-300">
                <h2 className="text-xl font-bold mb-5 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  Seller Information
                </h2>

                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li className="flex justify-between">
                    <span className="font-semibold">Owner Name:</span>
                    <span>{shop?.name}</span>
                  </li>

                  <li className="flex justify-between">
                    <span className="font-semibold">Email:</span>
                    <span>{shop?.email}</span>
                  </li>

                  <li className="flex justify-between">
                    <span className="font-semibold">Phone:</span>
                    <span>{shop?.sellerInfo?.phone}</span>
                  </li>

                  <li className="flex justify-between">
                    <span className="font-semibold">Location:</span>
                    <span>
                      {shop?.sellerInfo?.district}, {shop?.sellerInfo?.division}
                    </span>
                  </li>

                  <li className="flex justify-between">
                    <span className="font-semibold">Member Since:</span>
                    <span>
                      {new Date(shop?.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md dark:shadow-gray-800 p-6 border border-gray-100 dark:border-gray-700 transition hover:scale-[1.02] duration-300">
                <h2 className="text-xl font-bold mb-5 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  Shop Information
                </h2>

                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li className="flex justify-between">
                    <span className="font-semibold">Shop Name:</span>
                    <span>{shop?.sellerInfo?.shopName}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold">Total Products:</span>
                    <span>
                      {totalLoading ? (
                        <span className="animate-pulse">...</span>
                      ) : (
                        totalProductsData?.totalProducts || 0
                      )}
                    </span>
                  </li>

                  <li className="flex justify-between">
                    <span className="font-semibold">Followers:</span>
                    <span>{followers?.count || 0}</span>
                  </li>
                  <li className="flex justify-between gap-1">
                    <span className="font-semibold">Description:</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {shop?.sellerInfo?.shopDescription}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default ShopPage;
