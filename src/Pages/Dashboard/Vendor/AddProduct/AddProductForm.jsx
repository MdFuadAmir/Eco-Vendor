import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import ImageUploader from "./ImageUploader";

const AddProductsForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Product Data:", data);
    reset();
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-emerald-500 flex gap-2 items-center">
        <FaPlus /> Add New Product
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-white dark:bg-slate-900 p-6 rounded-xl shadow border border-gray-200 dark:border-slate-800"
      >
        {/* ---------------- BASIC INFO ---------------- */}
        <SectionTitle title="Basic Info" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Product Name *"
            placeholder="Product title"
            {...register("name", { required: true })}
          />
          <Select
            label="Category *"
            {...register("category", { required: true })}
            options={[
              "Electronics",
              "Fashion",
              "Beauty",
              "Home & Kitchen",
              "Sports & Outdoors",
              "Toys & Baby Products",
              "Automotive & Tools",
              "Books, Music & Stationery",
              "Groceries & Gourmet",
            ]}
          />
          <Input
            label="Subcategory"
            placeholder="Subcategory"
            {...register("subcategory")}
          />
          <Input
            label="Brand"
            placeholder="Brand name"
            {...register("brand")}
          />
          <Input
            label="SKU / Product Code"
            placeholder="SKU"
            {...register("sku")}
          />
          <Select
            label="Condition"
            {...register("condition")}
            options={["New", "Used", "Refurbished"]}
          />
        </div>

        {/* ---------------- PRICING & STOCK ---------------- */}
        <SectionTitle title="Pricing & Stock" />
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Regular Price *"
            type="number"
            placeholder="৳ Regular price"
            {...register("price", { required: true })}
          />
          <Input
            label="Discount Price"
            type="number"
            placeholder="৳ Discount price"
            {...register("discountPrice")}
          />
          <Input
            label="Stock Quantity *"
            type="number"
            placeholder="Available stock"
            {...register("stock", { required: true })}
          />
        </div>

        {/* ---------------- VARIANTS ---------------- */}
        <SectionTitle title="Variants" />
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Size" placeholder="S,M,L,XL" {...register("size")} />
          <Input
            label="Color"
            placeholder="Red,Blue,Black"
            {...register("color")}
          />
          <Input
            label="Material / Ingredients"
            placeholder="Cotton / Plastic"
            {...register("material")}
          />
        </div>

        {/* ---------------- SHIPPING & WARRANTY ---------------- */}
        <SectionTitle title="Shipping & Warranty" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Shipping Fee"
            type="number"
            placeholder="৳ Shipping fee"
            {...register("shippingFee")}
          />
          <Input
            label="Weight / Dimensions"
            placeholder="1kg / 10x5x5 cm"
            {...register("weight")}
          />
          <Input
            label="Warranty"
            placeholder="6 months / 1 year"
            {...register("warranty")}
          />
          <Select
            label="Return Policy"
            {...register("returnPolicy")}
            options={["7 days", "15 days", "30 days", "No return"]}
          />
        </div>

        {/* ---------------- SEO & TAGS ---------------- */}
        <SectionTitle title="SEO & Tags" />
        <div className=" space-y-4">
          <Input
            label="Product Tags"
            placeholder="lowprice, bestPrice,"
            {...register("tags")}
          />
          <Input
            label="Meta Keywords"
            placeholder="keywords for search"
            {...register("metaKeywords")}
          />
        </div>

        {/* ---------------- OPTIONAL ---------------- */}
        <SectionTitle title="Admin / Seller Notes" />
        <Textarea
          label="Seller Notes"
          placeholder="Internal notes"
          {...register("notes")}
        />

        {/* ---------------- IMAGES ---------------- */}
        <SectionTitle title="Images" />
        <ImageUploader setValue={setValue} />
        {/* ---------------- featured -------------- */}
        <Checkbox
          label="Featured Product"
          {...register("featured", { required: true })}
        />
        {errors.featured && (
          <span className="text-red-400 text-xs">This field is required</span>
        )}

        {/* ---------------- SUBMIT ---------------- */}
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded font-semibold mt-4 mb-8"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProductsForm;

/* ---------------- HELPER COMPONENTS ---------------- */

const SectionTitle = ({ title }) => (
  <h3 className="text-lg py-4 w-fit underline font-semibold text-green-400">
    {title}
  </h3>
);

const Input = ({ label, type = "text", placeholder, ...rest }) => (
  <div className="">
    <label className="block  text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-2 rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white"
      {...rest}
    />
  </div>
);

const Select = ({ label, options = [], ...rest }) => (
  <div className="">
    <label className="block text-gray-700 dark:text-gray-300">{label}</label>
    <select
      className="w-full p-2 rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white"
      {...rest}
    >
      <option value="">Select {label}</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const Textarea = ({ label, placeholder, ...rest }) => (
  <div className="">
    <label className="block  text-gray-700 dark:text-gray-300">{label}</label>
    <textarea
      placeholder={placeholder}
      rows="4"
      className="w-full p-2 rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white"
      {...rest}
    />
  </div>
);

const Checkbox = ({ label, ...rest }) => (
  <div className="mt-4 flex items-center gap-2">
    <input type="checkbox" className="accent-emerald-500" {...rest} />
    <span className="text-gray-700 dark:text-gray-300">{label}</span>
  </div>
);
