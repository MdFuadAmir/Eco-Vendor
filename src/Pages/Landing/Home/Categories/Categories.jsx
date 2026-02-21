import { Link } from "react-router";
import image1 from "../../../../assets/categorys/electronic.jpg";
import image2 from "../../../../assets/categorys/fashion.jpg";
import image3 from "../../../../assets/categorys/mobile.jpg";
import image4 from "../../../../assets/categorys/laptops.jpg";
import image5 from "../../../../assets/categorys/furnish.jpg";
import image6 from "../../../../assets/categorys/grocarry.jpg";
import image7 from "../../../../assets/categorys/beauty.jpg";
import image8 from "../../../../assets/categorys/books.jpg";
import image9 from "../../../../assets/categorys/toys.jpg";
import image10 from "../../../../assets/categorys/spors.jpg";
import image11 from "../../../../assets/categorys/furniture.jpg";
import image12 from "../../../../assets/categorys/kitchenw.jpg";
import image13 from "../../../../assets/categorys/automotion.jpg";
import image14 from "../../../../assets/categorys/pets.jpg";
import image15 from "../../../../assets/categorys/baby.jpg";
import image16 from "../../../../assets/categorys/watch.jpg";
import image17 from "../../../../assets/categorys/jualary.jpg";
import image18 from "../../../../assets/categorys/gaming.jpg";
import image19 from "../../../../assets/categorys/instrument.jpg";
import image20 from "../../../../assets/categorys/office.jpg";

const categories = [
  {
    id: 1,
    name: "Electronics",
    path: "/categories/electronics",
    image: image1,
  },
  {
    id: 2,
    name: "Fashion",
    path: "/categories/fashion",
    image: image2,
  },
  {
    id: 3,
    name: "Mobile Phones",
    path: "/categories/mobiles",
    image: image3,
  },
  {
    id: 4,
    name: "Laptops",
    path: "/categories/laptops",
    image: image4,
  },
  {
    id: 5,
    name: "Home Appliances",
    path: "/categories/home-appliances",
    image: image11,
  },
  {
    id: 6,
    name: "Grocery",
    path: "/categories/grocery",
    image: image6,
  },
  {
    id: 7,
    name: "Beauty & Health",
    path: "/categories/beauty-health",
    image: image7,
  },
  {
    id: 8,
    name: "Books",
    path: "/categories/books",
    image: image8,
  },
  {
    id: 9,
    name: "Toys & Games",
    path: "/categories/toys-games",
    image: image9,
  },
  {
    id: 10,
    name: "Sports & Fitness",
    path: "/categories/sports-fitness",
    image: image10,
  },
  {
    id: 11,
    name: "Furniture",
    path: "/categories/furniture",
    image: image5,
  },
  {
    id: 12,
    name: "Kitchen & Dining",
    path: "/categories/kitchen-dining",
    image: image12,
  },
  {
    id: 13,
    name: "Automobile",
    path: "/categories/automobile",
    image: image13,
  },
  {
    id: 14,
    name: "Pet Supplies",
    path: "/categories/pet-supplies",
    image: image14,
  },
  {
    id: 15,
    name: "Baby Products",
    path: "/categories/baby-products",
    image: image15,
  },
  {
    id: 16,
    name: "Watches",
    path: "/categories/watches",
    image: image16,
  },
  {
    id: 17,
    name: "Jewelry",
    path: "/categories/jewelry",
    image: image17,
  },
  {
    id: 18,
    name: "Gaming",
    path: "/categories/gaming",
    image: image18,
  },
  {
    id: 19,
    name: "Music Instruments",
    path: "/categories/music-instruments",
    image: image19,
  },
  {
    id: 20,
    name: "Office Supplies",
    path: "/categories/office-supplies",
    image: image20,
  },
];

const Categories = () => {
  return (
    <div className="flex container pt-12">
      <div
        className="grid grid-rows-2 grid-flow-col 
          auto-cols-[150px]
          gap-4
         overflow-x-auto
         scroll-smooth
         snap-x snap-mandatory
   py-2"
      >
        {categories.map((cat) => (
          <Link
            className="rounded bg-white dark:bg-gray-800 p-2 text-center shadow hover:shadow-lg transition dark:text-white"
            to={cat.path}
            key={cat.id}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-14 w-full object-contain mx-auto"
            />
            <p className="mt-2 text-sm font-medium">{cat.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
