import { useForm } from "react-hook-form";

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Product Data:", data);
    // এখানে পরে API call করবে
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6">➕ Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="label">Product Name</label>
          <input
            className="input input-bordered w-full"
            placeholder="Enter product name"
            {...register("name", { required: "Product name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Product description"
            {...register("description", { required: "Description is required" })}
          ></textarea>
        </div>

        {/* Category & Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Category</label>
            <select
              className="select select-bordered w-full"
              {...register("category", { required: true })}
            >
              <option value="">Select category</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Grocery</option>
            </select>
          </div>

          <div>
            <label className="label">Brand</label>
            <input
              className="input input-bordered w-full"
              placeholder="Brand name"
              {...register("brand")}
            />
          </div>
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Price</label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Price"
              {...register("price", { required: true })}
            />
          </div>

          <div>
            <label className="label">Stock</label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Stock quantity"
              {...register("stock", { required: true })}
            />
          </div>

          <div>
            <label className="label">Discount (%)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Discount"
              {...register("discount")}
            />
          </div>
        </div>

        {/* Variant */}
        <div>
          <label className="label">Variants (Size / Color)</label>
          <input
            className="input input-bordered w-full"
            placeholder="e.g. Size: M,L | Color: Red,Blue"
            {...register("variant")}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="label">Product Images</label>
          <input
            type="file"
            multiple
            className="file-input file-input-bordered w-full"
            {...register("images", { required: true })}
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button className="btn btn-primary w-full">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;