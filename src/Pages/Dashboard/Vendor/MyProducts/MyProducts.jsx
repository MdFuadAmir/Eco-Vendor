import { FaBoxOpen, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import useMongoUser from "../../../../Hooks/useMongoUser";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import Search from "../../../../Components/Search/Search";
import { useState } from "react";

const MyProducts = () => {
  const [search, setSearch] = useState("");
  const axiosPublic = useAxios();
  const { mongoUser } = useMongoUser();
  const navigate = useNavigate();

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myProducts", mongoUser?._id],
    enabled: !!mongoUser?._id,
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/my/${mongoUser._id}`);
      return res.data;
    },
    keepPreviousData: true,
  });
  const handleUpdate = (item) => {
    navigate(`/dashboard/edit-product/${item._id}`);
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div>
          <p className="font-semibold mb-2">
            Are you sure you want to delete this product?
          </p>
          <div className="flex gap-2 justify-end">
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={async () => {
                try {
                  const res = await axiosPublic.delete(`/products/${id}`);

                  if (res.data.success) {
                    toast.success(res.data.message || "Product deleted");
                    refetch();
                  } else {
                    toast.error(res.data.message || "Delete failed");
                  }
                } catch (error) {
                  toast.error(error.message || "Failed to delete product");
                }

                toast.dismiss(t.id);
              }}
            >
              Yes
            </button>

            <button
              className="px-3 py-1 bg-gray-400 dark:bg-gray-200 text-black rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 3000,
        style: {
          background: "#47297b",
          color: "#fff",
          border: "1px solid #374151",
        },
      },
    );
  };

  const filteredProducts = products.filter((p) => {
    const text = search.toLowerCase();

    const matchText =
      p.name?.toLowerCase().includes(text) ||
      p.brand?.toLowerCase().includes(text) ||
      p.category?.toLowerCase().includes(text) ||
      p.subcategory?.toLowerCase().includes(text) ||
      p.tags?.toLowerCase().includes(text) ||
      p.metaKeywords?.toLowerCase().includes(text);

    const matchVariants = p.variants?.some(
      (v) =>
        v.color?.toLowerCase().includes(text) ||
        v.size?.toLowerCase().includes(text),
    );

    return matchText || matchVariants;
  });
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 dark:text-emerald-400">
        <FaBoxOpen /> My Products
      </h2>

      {/* Top Actions */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="w-md">
          <Search
            value={search}
            onChange={setSearch}
            placeholder="Search user by name or email"
          />
        </div>
        <Link to={"/dashboard/add-product"} className="btn btn-primary">
          <FaPlus /> Add New Product
        </Link>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto mx-auto dark:text-white bg-white dark:bg-darkfooter/90 rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-darknav dark:text-white">
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Discount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td>
                    <Skeleton height={40} width={40} />
                  </td>

                  <td>
                    <Skeleton height={18} width={150} />
                    <Skeleton height={14} width={100} />
                  </td>

                  <td>
                    <Skeleton height={30} width={70} />
                  </td>

                  <td>
                    <Skeleton height={30} width={70} />
                  </td>

                  <td>
                    <Skeleton height={30} width={70} />
                  </td>

                  <td>
                    <Skeleton height={30} width={70} />
                  </td>

                  <td className="flex gap-1">
                    <Skeleton height={30} width={70} />
                    <Skeleton height={30} width={70} />
                    <Skeleton height={30} width={70} />
                    <Skeleton height={30} width={70} />
                  </td>
                </tr>
              ))}
            {!isLoading &&
              filteredProducts.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.mainImage}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>

                  <td>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Category: {item.category}
                      </p>
                    </div>
                  </td>

                  <td>৳ {item.price}</td>
                  <td>
                    {item.stock > 0 ? (
                      item.stock
                    ) : (
                      <p className="badge badge-error">Out of Stock</p>
                    )}
                  </td>
                  <td>{item.discountPrice || 0}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "active"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="flex flex-wrap gap-4">
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => handleUpdate(item)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
