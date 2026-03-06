import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IoMdChatbubbles } from "react-icons/io";
import { FaShop } from "react-icons/fa6";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ProductList from "../../Products/ProductList/ProductList";
const ShopPage = () => {
  const { sellerId } = useParams();
  const axiosPublic = useAxios();

  // seller info
  const { data: shop, isLoading } = useQuery({
    queryKey: ["shop", sellerId],
    enabled: !!sellerId,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/shop/${sellerId}`);
      return data;
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
    <div className="max-w-7xl mx-auto p-6">
      {/* SHOP HEADER */}
      <div className="bg-linear-to-r from-orange-400 via-orange-500 to-red-500 p-6 rounded-xl">
        <div className="bg-slate-100 dark:bg-gray-950/80 w-fit rounded-lg p-4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://i.ibb.co/GvfGBgq5/img1.jpg"
              alt="/shopLogo"
              className="w-16 h-16 rounded-md"
            />
            <div className=" space-y-1">
              <h1 className="text-xl font-bold dark:text-white">
                {shop?.sellerInfo?.shopName}
              </h1>
              <p className="dark:text-gray-200 text-sm">8000 Followers</p>
            </div>
          </div>
          <div className="dark:text-white justify-end flex gap-6">
            <p className="flex items-center gap-1 btn btn-info btn-sm">
              <IoMdChatbubbles /> chat now
            </p>
            <p className="flex items-center gap-1 btn btn-success btn-sm">
              <FaShop />
              Follow
            </p>
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
          {/* tab contents */}
          {/* shop */}
          <TabPanel>
            <div className="space-y-10 mt-6">
              {/* FEATURED PRODUCTS */}
              <div>
                <div>
                  <h2 className="text-xl font-semibold mb-6 dark:text-white">
                    Shop Promotions
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* PROMO 1 */}
                    <div className="bg-linear-to-r from-red-500 to-orange-500 text-white p-6 rounded-xl shadow-md">
                      <h3 className="text-lg font-bold mb-2">Big Sale</h3>
                      <p className="text-sm opacity-90">
                        Up to 50% discount on selected products.
                      </p>
                    </div>

                    {/* PROMO 2 */}
                    <div className="bg-linear-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-xl shadow-md">
                      <h3 className="text-lg font-bold mb-2">New Arrival</h3>
                      <p className="text-sm opacity-90">
                        Check out our newest products added this week.
                      </p>
                    </div>

                    {/* PROMO 3 */}
                    <div className="bg-linear-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl shadow-md">
                      <h3 className="text-lg font-bold mb-2">Limited Offer</h3>
                      <p className="text-sm opacity-90">
                        Special deals available for a limited time.
                      </p>
                    </div>

                    {/* PROMO 4 */}
                    <div className="bg-linear-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-md">
                      <h3 className="text-lg font-bold mb-2">Best Seller</h3>
                      <p className="text-sm opacity-90">
                        Discover our most popular products.
                      </p>
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-semibold my-6 dark:text-white">
                  Featured Products
                </h2>
                <ProductList
                  endpoint={`/shop-products/featured/${sellerId}`}
                  queryKey={["shopProductsFeatured", sellerId]}
                  limit={15}
                  paginated={false}
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
              />
            </div>
          </TabPanel>
          {/* profile */}
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              {/* SELLER INFO */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4 dark:text-white">
                  Seller Information
                </h2>

                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p>
                    <span className="font-semibold">Owner Name:</span>{" "}
                    {shop?.name}
                  </p>

                  <p>
                    <span className="font-semibold">Email:</span> {shop?.email}
                  </p>

                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {shop?.sellerInfo?.phone}
                  </p>

                  <p>
                    <span className="font-semibold">Location:</span>{" "}
                    {shop?.sellerInfo?.district}, {shop?.sellerInfo?.division}
                  </p>

                  <p>
                    <span className="font-semibold">Member Since:</span>{" "}
                    {new Date(shop?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {/* SHOP INFO */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4 dark:text-white">
                  Shop Information
                </h2>

                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p>
                    <span className="font-semibold">Shop Name:</span>{" "}
                    {shop?.sellerInfo?.shopName}
                  </p>
                  <p>
                    <span className="font-semibold">Description:</span>{" "}
                    {shop?.sellerInfo?.shopDescription}
                  </p>
                  <p>
                    <span className="font-semibold">Followers:</span> 8000
                  </p>
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default ShopPage;
