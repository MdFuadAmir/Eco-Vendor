import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxios from "../../../../Hooks/useAxios";

import AddProductForm from "./AddProductForm";
import DTitle from "../../../../Utils/DTitle/DTitle";
import { FaGear } from "react-icons/fa6";

const EditProduct = () => {
  const { id } = useParams();
  const axiosPublic = useAxios();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isUploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      variants: [{ color: "", size: "", price: "", stock: "", waight: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  // 1️⃣ Fetch single product
  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/${id}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  // 2️⃣ Categories (for select options)
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories/active");
      return res.data;
    },
  });

  // 3️⃣ Subcategories (watch selected category)
  const selectedCategoryName = useWatch({ control, name: "category" });
  const { data: subcategories = [] } = useQuery({
    queryKey: ["subcategories", selectedCategoryName],
    enabled: !!selectedCategoryName,
    queryFn: async () => {
      const selected = categories.find((c) => c.name === selectedCategoryName);
      if (!selected?._id) return [];
      const res = await axiosPublic.get(
        `/subcategories/by-category/${selected._id}`,
      );
      return res.data;
    },
  });

  // 4️⃣ Reset form with fetched product
  useEffect(() => {
    if (product?._id) {
      reset({
        ...product,
        variants:
          product.variants?.length > 0
            ? product.variants
            : [{ color: "", size: "", price: "", stock: "", waight: "" }],
      });
    }
  }, [product, reset]);

  // 5️⃣ Mutation to update product
  const updateProductMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosPublic.put(`/products/${id}`, updatedData); // PUT method
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries(["singleProduct", id]);
      queryClient.invalidateQueries(["myProducts"]);
      navigate("/dashboard/my-products");
    },
    onError: (error) => {
      toast.error(error?.message || "Update failed");
    },
  });

  // 6️⃣ Submit handler
  const onSubmit = (data) => {
    const productData = {
      ...data,
      price: Number(data.price),
      discountPrice: data.discountPrice ? Number(data.discountPrice) : 0,
      stock: Number(data.stock),
      shippingFee: data.shippingFee ? Number(data.shippingFee) : 0,
      variants: data.variants.map((v) => ({
        ...v,
        price: Number(v.price || 0),
        stock: Number(v.stock || 0),
        waight: Number(v.waight || 0),
      })),
    };
    updateProductMutation.mutate(productData);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <DTitle label="Update this Product" icon={FaGear} />
      <AddProductForm
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        errors={errors}
        fields={fields}
        append={append}
        remove={remove}
        categorieLoading={false}
        subcategories={subcategories}
        subLoading={false}
        onSubmit={onSubmit}
        categorie={categories}
        setUploading={setUploading}
        isUploading={isUploading}
        getValues={getValues}
        resetImages={false}
      />
    </div>
  );
};

export default EditProduct;

