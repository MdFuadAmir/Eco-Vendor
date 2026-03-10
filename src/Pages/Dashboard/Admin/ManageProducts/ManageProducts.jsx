import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import { FaBox } from "react-icons/fa6";
import DTitle from "../../../../Utils/DTitle/DTitle";
import { useState } from "react";
import toast from "react-hot-toast";

const ManageProducts = () => {
  const axiosPublic = useAxios();
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pendingProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products/pending");
      return res.data;
    },
  });

  const approveProduct = async (id) => {
    await axiosPublic.patch(`/products/approve/${id}`);
    toast.success("Product Approved");
    queryClient.invalidateQueries(["pendingProducts"]);
    setSelectedProduct(null);
  };

  const rejectProduct = async (id) => {
    const reason = prompt("Enter reject reason");
    if (!reason) return;
    await axiosPublic.patch(`/products/reject/${id}`, {
      reason: reason,
    });
    toast.error("Product Rejected");
    refetch();
    setSelectedProduct(null);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <DTitle label={"Product Management"} icon={FaBox} />

        <div className="mt-6 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-14 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <DTitle label={"Product Management"} icon={FaBox} />

      <div className="overflow-x-auto mx-auto dark:text-gray-100 bg-white dark:bg-darkfooter/90 rounded-xl shadow mt-6">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-darknav dark:text-white">
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-gray-500">SKU: {p.sku}</p>
                  </div>
                </td>

                <td>{p.category}</td>
                <td>{p.brand}</td>

                <td>
                  <span className="badge badge-warning">{p.status}</span>
                </td>

                <td className="space-x-1">
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="btn btn-xs btn-accent"
                  >
                    View
                  </button>

                  <button
                    onClick={() => approveProduct(p._id)}
                    className="btn btn-xs btn-success"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectProduct(p._id)}
                    className="btn btn-xs btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Modal */}

      {selectedProduct && (
        <div className="fixed dark:text-gray-200 inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-darknav p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>

            {selectedProduct.mainImage && (
              <img
                src={selectedProduct.mainImage}
                className="w-full h-52 object-contain rounded"
              />
            )}

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              {selectedProduct.category && (
                <p>
                  <strong>Category:</strong> {selectedProduct.category}
                </p>
              )}

              {selectedProduct.subcategory && (
                <p>
                  <strong>Subcategory:</strong> {selectedProduct.subcategory}
                </p>
              )}

              {selectedProduct.brand && (
                <p>
                  <strong>Brand:</strong> {selectedProduct.brand}
                </p>
              )}

              {selectedProduct.sku && (
                <p>
                  <strong>SKU:</strong> {selectedProduct.sku}
                </p>
              )}

              {selectedProduct.condition && (
                <p>
                  <strong>Condition:</strong> {selectedProduct.condition}
                </p>
              )}

              {selectedProduct.price && (
                <p>
                  <strong>Price:</strong> ${selectedProduct.price}
                </p>
              )}

              {selectedProduct.discountPrice && (
                <p>
                  <strong>Discount Price:</strong> $
                  {selectedProduct.discountPrice}
                </p>
              )}

              {selectedProduct.stock && (
                <p>
                  <strong>Stock:</strong> {selectedProduct.stock}
                </p>
              )}

              {selectedProduct.shippingFee && (
                <p>
                  <strong>Shipping Fee:</strong> ${selectedProduct.shippingFee}
                </p>
              )}

              {selectedProduct.warranty && (
                <p>
                  <strong>Warranty:</strong> {selectedProduct.warranty}
                </p>
              )}

              {selectedProduct.returnPolicy && (
                <p>
                  <strong>Return Policy:</strong> {selectedProduct.returnPolicy}
                </p>
              )}

              {selectedProduct.status && (
                <p>
                  <strong>Status:</strong> {selectedProduct.status}
                </p>
              )}
            </div>

            {selectedProduct.tags && (
              <p className="mt-3">
                <strong>Tags:</strong> {selectedProduct.tags}
              </p>
            )}

            {selectedProduct.metaKeywords && (
              <p className="mt-2">
                <strong>Meta Keywords:</strong> {selectedProduct.metaKeywords}
              </p>
            )}

            {selectedProduct.notes && (
              <p className="mt-2">
                <strong>Notes:</strong> {selectedProduct.notes}
              </p>
            )}

            {selectedProduct.galleryImages?.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Gallery</p>

                <div className="flex gap-2 flex-wrap">
                  {selectedProduct.galleryImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => approveProduct(selectedProduct._id)}
                className="btn btn-xs btn-success"
              >
                Approve
              </button>
              <button
                onClick={() => rejectProduct(selectedProduct._id)}
                className="btn btn-xs btn-error"
              >
                Reject
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                className="btn btn-xs btn-error"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
