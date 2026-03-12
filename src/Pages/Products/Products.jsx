// import { useParams, useOutletContext } from "react-router";
// import { HiOutlineDotsVertical } from "react-icons/hi";
// import ProductList from "./ProductList/ProductList";

// const Products = () => {
//   const { setOpen } = useOutletContext() || {};

//   const { slug } = useParams();
//   let endpoint = "/products";
//   let queryKey = ["all-products"];

//   if (slug && window.location.pathname.includes("/sub/")) {
//     endpoint = `/products/by-sub/${slug}`;
//     queryKey = ["products-by-sub", slug];
//   } else if (slug && window.location.pathname.includes("/cat/")) {
//     endpoint = `/products/by-cat/${slug}`;
//     queryKey = ["products-by-cat", slug];
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold dark:text-white">
//           {slug ? slug.replace("-", " ") : "All Products"}
//         </h1>

//         <button
//           onClick={() => setOpen?.(true)}
//           className="lg:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
//         >
//           <HiOutlineDotsVertical className="text-xl text-black dark:text-white" />
//         </button>
//       </div>

//       <ProductList
//         endpoint={endpoint}
//         queryKey={queryKey}
//         limit={20}
//         paginated={!slug}
//         gridClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
//       />
//     </div>
//   );
// };

// export default Products;


import { useParams, useOutletContext } from "react-router";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ProductList from "./ProductList/ProductList";

const Products = () => {
  const { setOpen } = useOutletContext() || {};

  const { slug } = useParams();

  // Default: All Products
  let endpoint = "/products";
  let queryKey = ["all-products"];

  // Subcategory filter
  if (slug && window.location.pathname.includes("/sub/")) {
    endpoint = `/products/by-sub/${slug}`;
    queryKey = ["products-by-sub", slug];
  } 
  // Category filter
  else if (slug && window.location.pathname.includes("/category/")) {
    endpoint = `/products/by-category/${slug}`;
    queryKey = ["products-by-category", slug];
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold dark:text-white uppercase">
          {slug ? slug.replace(/-/g, " ") : "All Products"}
        </h1>

        <button
          onClick={() => setOpen?.(true)}
          className="lg:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <HiOutlineDotsVertical className="text-xl text-black dark:text-white" />
        </button>
      </div>

      {/* Product List */}
      <ProductList
        endpoint={endpoint}
        queryKey={queryKey}
        limit={20}
        paginated={!slug} // only paginate for all products
        gridClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      />
    </div>
  );
};

export default Products;