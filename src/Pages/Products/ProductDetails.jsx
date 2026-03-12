import { Link, useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import StarRating from "../../Components/StarRating/StarRating";
import ProductReview from "./ProductReview";
import { FaShop } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import WishlistButton from "../../Components/WishlistButton/WishlistButton";
import AddToCartButton from "../Cart/AddToCartButton";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxios();
  const [mainImage, setMainImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const { data: product, isLoading } = useQuery({
    queryKey: ["products", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/products/${id}`);
      return data;
    },
  });
  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (!product) return <p className="text-center py-10">Product not found</p>;
  const images = product?.mainImage
    ? [product.mainImage, ...(product.galleryImages || [])]
    : product?.galleryImages || [];
  // 🔥 only valid variants
  const variants = Array.isArray(product?.variants)
    ? product.variants.filter((v) => v.color && v.size && v.price)
    : [];
  // const hasVariants = variants.length > 0;
  const colors = [...new Set(variants.map((v) => v.color))];
  const sizes = selectedColor
    ? variants.filter((v) => v.color === selectedColor).map((v) => v.size)
    : [];
  const selectedVariant = variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize,
  );
  const basePrice = selectedVariant?.price || product.price;
  const discountPrice = selectedVariant?.discountPrice || product.discountPrice;
  const flashSalePrice = product.flashSalePrice;
  // conditions
  const hasFlashSale = flashSalePrice;
  const hasDiscount = discountPrice && discountPrice < basePrice;

  const discountPercent = hasDiscount
    ? Math.round(((basePrice - discountPrice) / basePrice) * 100)
    : 0;
  // const handleAddToCart = () => {
  //   let cartItem;
  //   // ✅ NO VARIANT PRODUCT
  //   if (!hasVariants) {
  //     cartItem = {
  //       productId: product._id,
  //       name: product.name,
  //       price: product.price,
  //       image: product.mainImage,
  //       quantity: 1,
  //     };
  //     console.log("ADD TO CART (NO VARIANT)", cartItem);
  //     alert("Product added to cart");
  //     return;
  //   }
  //   // ❌ VARIANT BUT NOT SELECTED
  //   if (!selectedColor || !selectedSize) {
  //     alert("Please select color & size");
  //     return;
  //   }
  //   cartItem = {
  //     productId: product._id,
  //     name: product.name,
  //     price: selectedVariant.price,
  //     color: selectedVariant.color,
  //     size: selectedVariant.size,
  //     stock: selectedVariant.stock,
  //     image: product.mainImage,
  //     quantity: 1,
  //   };
  //   console.log("ADD TO CART (WITH VARIANT)", cartItem);
  //   alert("Variant added to cart");
  // };

  return (
    <div className="md:px-10 lg:px-20 mx-auto">
      {/* basic info */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-100 dark:bg-gray-800 py-6">
        {/* IMAGE SECTION */}
        <div className="flex md:flex-row-reverse flex-col gap-4 p-4">
          <div className="w-full h-96 rounded-xl overflow-hidden">
            <img
              src={images[mainImage]}
              alt={product?.name}
              className="w-full h-full object-contain rounded-xl hover:scale-110 transition duration-300"
            />
          </div>
          <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto space-x-2 space-y-2 ">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setMainImage(index)}
                className={`w-16 shrink-0 h-16 flex rounded cursor-pointer overflow-hidden ${
                  mainImage === index
                    ? "border-2 border-blue-500"
                    : "border-2 border-gray-400"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>
            ))}
          </div>
        </div>
        {/* DETAILS SECTION */}
        <div className="p-4">
          <h1 className="text-xl font-bold dark:text-white mb-2">
            {product?.name}
          </h1>
          <div className="flex justify-between items-center">
            {product.rating !== undefined && (
              <StarRating rating={product.rating} />
            )}
            <div className="flex gap-4 items-center text-xl dark:text-white">
              <button>
                <IoShareSocialOutline />
              </button>
              <WishlistButton productId={product._id} />
            </div>
          </div>

          {/* PRICE */}
          <div className="mt-4">
            <div className="mt-4">
              {hasFlashSale ? (
                // 🔥 FLASH SALE PRICE
                <span className="text-red-600 text-xl font-bold">
                  ${flashSalePrice}
                </span>
              ) : hasDiscount ? (
                // 🔥 DISCOUNT PRICE
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 text-xl font-semibold">
                    ${discountPrice}
                  </span>

                  <span className="text-gray-400 line-through text-sm">
                    ${basePrice}
                  </span>

                  <span className="text-red-600 text-xs font-semibold px-2 py-0.5 rounded">
                    {discountPercent}% OFF
                  </span>
                </div>
              ) : (
                // 🔥 NORMAL PRICE
                <span className="text-emerald-600 text-xl font-semibold">
                  ${basePrice}
                </span>
              )}
            </div>
          </div>

          {/* BRAND / WARRANTY / RETURN */}
          <div className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            {product.brand && (
              <p>
                <b>Brand:</b> {product.brand}
              </p>
            )}
            {product.warranty && (
              <p>
                <b>Warranty:</b> {product.warranty}
              </p>
            )}
            {product.returnPolicy && (
              <p>
                <b>Return:</b> {product.returnPolicy}
              </p>
            )}
            {product.flashSaleEnd && (
              <p>
                <b>flashSaleEnd:</b> {product.flashSaleEnd}
              </p>
            )}
          </div>

          {/* VARIANTS */}
          {variants.length > 0 && (
            <div className="mt-4 space-y-4">
              <h3 className="font-semibold dark:text-white">Variants</h3>

              {/* COLORS */}
              {colors.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-1 dark:text-white">
                    Color:
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedColor(color);
                          setSelectedSize(null);
                        }}
                        className={`px-3 py-1 border rounded dark:text-white ${
                          selectedColor === color
                            ? "bg-indigo-500"
                            : "border-gray-300"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* SIZES */}
              {selectedColor && sizes.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-1 dark:text-white">
                    Size:
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 border rounded dark:text-white ${
                          selectedSize === size
                            ? "bg-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex items-center justify-between gap-4 mt-6">
            <AddToCartButton
              product={product}
              variant="button"
              className="btn btn-accent"
            />
            <Link
              to={`/shop/${product?.sellerId}`}
              className="px-4 py-2 flex gap-2 items-center bg-linear-to-r from-orange-300 via-orange-500 to-orange-500 text-white rounded-md text-sm"
            >
              <FaShop size={15} /> Visit Shop
            </Link>
          </div>
        </div>
      </div>
      {/* products details */}
      <div className="mt-2 p-4 bg-slate-100 dark:bg-gray-800">
        <p className="dark:text-white font-bold text-xl mb-2">
          Product Details:
        </p>
        <p className=" whitespace-pre-line dark:text-gray-200">
          {product.details}
        </p>
      </div>
      {/* reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <ProductReview />
      </div>
    </div>
  );
};

export default ProductDetails;
