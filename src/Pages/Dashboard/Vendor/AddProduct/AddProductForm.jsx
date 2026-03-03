import ImageUploader from "./ImageUploader";

const AddProductForm = ({
  register,
  handleSubmit,
  setValue,
  errors,
  fields,
  append,
  remove,
  categorieLoading,
  subcategories,
  subLoading,
  onSubmit,
  categorie,
  resetImages,
  setUploading,
  isUploading,
  getValues,
}) => {
  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-darknav/80 p-6 rounded-xl shadow border border-gray-200 dark:border-slate-800"
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
            options={
              categorieLoading
                ? ["Loading..."]
                : categorie.map((cat) => cat.name)
            }
          />

          <Select
            label="Subcategory"
            {...register("subcategory")}
            options={
              subLoading ? ["Loading..."] : subcategories.map((sub) => sub.name)
            }
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
        <div className="space-y-4">
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-2 md:grid-cols-6 gap-3 border p-3 rounded-lg dark:bg-indigo-900 dark:border-indigo-600"
            >
              <Input
                {...register(`variants.${index}.color`)}
                placeholder="Color (Red)"
              />

              <Input
                {...register(`variants.${index}.size`)}
                placeholder="Size (M)"
              />

              <Input
                type="number"
                {...register(`variants.${index}.price`)}
                placeholder="Price"
              />
              <Input
                type="number"
                {...register(`variants.${index}.stock`)}
                placeholder="Stock"
              />
              <Input
                type="number"
                {...register(`variants.${index}.waight`)}
                placeholder="Waight"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 rounded"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({ color: "", size: "", price: "", stock: "" })
            }
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Variant
          </button>
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
        <div className="space-y-4">
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
        <ImageUploader
          setValue={setValue}
          getValues={getValues}
          resetImages={resetImages}
          setUploading={setUploading}
        />

        {/* ---------------- FEATURED ---------------- */}
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
          disabled={isUploading}
          className={`w-full py-2 rounded font-semibold mt-4 mb-8
    ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}
        >
          {isUploading ? "Uploading Image..." : "Submit Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;

/* ---------------- HELPER COMPONENTS ---------------- */

const SectionTitle = ({ title }) => (
  <h3 className="text-lg py-4 w-fit underline font-semibold text-green-400">
    {title}
  </h3>
);

const Input = ({ label, type = "text", placeholder, ...rest }) => (
  <div>
    <label className="block text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:text-gray-200 rounded"
      {...rest}
    />
  </div>
);

const Select = ({ label, options = [], ...rest }) => (
  <div>
    <label className="block text-gray-700 dark:text-gray-300">{label}</label>
    <select
      className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:text-gray-200 rounded"
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
  <div>
    <label className="block text-gray-700 dark:text-gray-300">{label}</label>
    <textarea
      placeholder={placeholder}
      rows="4"
      className="w-full px-4 py-2 bg-gray-200 dark:bg-darkbody dark:text-gray-200 rounded"
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
