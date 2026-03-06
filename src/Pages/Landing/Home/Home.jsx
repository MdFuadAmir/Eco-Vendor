import TopSell from "../../Products/TopSell";
import AdsBanner from "./AdsBanner/AdsBanner";
import Banner from "./Banner/Banner";
import Categories from "./Categories/Categories";
import Features from "./Features/Features";
import FreeShiping from "./FreeShiping/FreeShiping";

const Home = () => {
  return (
    <div>
      <Banner />
      <TopSell />
      <Categories />
      <FreeShiping />
      <AdsBanner />
      <TopSell />
      <Features />
    </div>
  );
};

export default Home;
