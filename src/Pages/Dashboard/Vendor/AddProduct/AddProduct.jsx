import AddProductForm from "./AddProductForm";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import { useState } from "react";
import useMongoUser from "../../../../Hooks/useMongoUser";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import DTitle from "../../../../Utils/DTitle/DTitle";

const AddProduct = () => {
  const axiosPublic = useAxios();
  const { mongoUser } = useMongoUser();
  const [isUploading, setUploading] = useState(false);
  const [resetImages, setResetImages] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      variants: [{ color: "", size: "", price: "", stock: "", waight: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });
  // 👇 watch category value
  const selectedCategoryName = useWatch({
    control,
    name: "category",
  });

  // ================== GET CATEGORIES ==================
  const { data: categorie = [], isLoading: categorieLoading } = useQuery({
    queryKey: ["categorie"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories/active");
      return res.data;
    },
  });

  // ================== GET SUBCATEGORIES ==================
  const { data: subcategories = [], isLoading: subLoading } = useQuery({
    queryKey: ["subcategories", selectedCategoryName],
    enabled: !!selectedCategoryName,
    queryFn: async () => {
      const selected = categorie.find((c) => c.name === selectedCategoryName);
      if (!selected?._id) return [];

      const res = await axiosPublic.get(
        `/subcategories/by-category/${selected._id}`,
      );
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    if (!data.mainImage) {
      alert("Please upload main image!");
      return;
    }
    const productData = {
      ...data,
      price: Number(data.price),
      discountPrice: data.discountPrice ? Number(data.discountPrice) : 0,
      stock: Number(data.stock),
      shippingFee: data.shippingFee ? Number(data.shippingFee) : 0,
      // ======= VARIANTS NUMBERS =======
      variants: data.variants.map((v) => ({
        ...v,
        price: v.price ? Number(v.price) : 0,
        stock: v.stock ? Number(v.stock) : 0,
        waight: v.waight ? Number(v.waight) : 0,
      })),
      sellerId: mongoUser._id,
      createdAt: new Date(),
      status: "pending",
    };
    try {
      const res = await axiosPublic.post("/products", productData);
      if (res.data.success) {
        toast.success(res.data.message || "Product added successfully");
        reset();
        setResetImages(true);
        setTimeout(() => setResetImages(false), 0);
      } else {
        toast.error(res.data.message || "Failed to add product");
      }
    } catch (error) {
      toast.error(error.message || "Failed to add this product");
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <DTitle label={"Add New Product"} icon={FaPlus} />
          <p className="-mt-4 mb-4 dark:text-gray-300">
            Fill in the product details below to list your item in the marketplace.
          </p>
      <AddProductForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        errors={errors}
        fields={fields}
        append={append}
        remove={remove}
        categorieLoading={categorieLoading}
        subcategories={subcategories}
        subLoading={subLoading}
        onSubmit={onSubmit}
        categorie={categorie}
        resetImages={resetImages}
        setUploading={setUploading}
        isUploading={isUploading}
        getValues={getValues}
      />
    </div>
  );
};

export default AddProduct;
