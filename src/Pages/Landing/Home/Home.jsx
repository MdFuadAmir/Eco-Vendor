import AdsBanner from "./AdsBanner/AdsBanner";
import Banner from "./Banner/Banner";
import Categories from "./Categories/Categories";
import Features from "./Features/Features";
import FreeShiping from "./FreeShiping/FreeShiping";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <p className="dark:text-white">Featurs produce sectoon</p>
      <FreeShiping />
      <AdsBanner />
      <p className="dark:text-white">Featurs produce </p>
      <Features />
    </div>
  );
};

export default Home;
