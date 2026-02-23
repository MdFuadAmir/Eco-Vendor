import Product from "./Product";

const products = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    name: "Smartphone Pro Max",
    rating: 5,
    disc: "id,image,ame,ratig,price,discprice .ei koita field dia amaka 10 ta jso data baia du",
    price: 55000,
    discprice: 49999,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    name: "Wireless Headphones",
    disc: "id,image,ame,ratig,price,discprice .ei koita field dia amaka 10 ta jso data baia du",
    rating: 5,
    price: 8000,
    discprice: 6499,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    name: "Gaming Laptop",
    disc: "id,image,ame,ratig,price,discprice .ei koita field dia amaka 10 ta jso data baia du",
    rating: 4.5,
    price: 120000,
    discprice: 109999,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657",
    name: "Smart Watch",
    disc: "id,image,ame,ratig,price,discprice .ei koita field dia amaka 10 ta jso data baia du",
    rating: 4,
    price: 12000,
    discprice: 9999,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    name: "Bluetooth Speaker",
    disc: "id,image,ame,ratig,price,discprice .ei koita field dia amaka 10 ta jso data baia du",
    rating: 3.5,
    price: 6000,
    discprice: 4799,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    name: "DSLR Camera",
    disc: "id,image,ame,ratig,price,discprice .ei koita field dia amaka 10 ta jso data baia du",
    rating: 3,
    price: 85000,
    discprice: 79999,
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    name: "Tablet Device",
    disc: "id,image,ame,ratig,price,discprice .ei koita field dia amaka 10 ta jso data baia du",
    rating: 2.5,
    price: 30000,
    discprice: 26999,
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    name: "Running Shoes",
    disc: "id,image,ame,ratig,price,discprice .ei koita field dia amaka 10 ta jso data baia du",
    rating: 2,
    price: 4500,
    discprice: 3799,
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    name: "Gaming Mouse",
    disc: "id,image,ame,ratig,price,discprice .ei koita field dia amaka 10 ta jso data baia du",
    rating: 1.5,
    price: 2500,
    discprice: 1999,
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",
    name: "Mechanical Keyboard",
    disc: "id,image,ame,ratig,price,discprice .ei koita field dia amaka 10 ta jso data baia du",
    rating: 1,
    price: 7000,
    discprice: 5999,
  },
];

const TopSell = () => {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Top Rated Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-6 gap-4  ">
        {products.map((prod) => (
          <Product key={prod.id} prod={prod}></Product>
        ))}
      </div>
    </div>
  );
};

export default TopSell;
