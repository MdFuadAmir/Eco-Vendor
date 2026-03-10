import FlashSale from "../../Products/FlashSale";
import JustForYou from "../../Products/JustForYou";
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
      <Categories />
      <FlashSale/>
      <TopSell />
      <AdsBanner />
      <FreeShiping />
      <JustForYou />
      <Features />
    </div>
  );
};

export default Home;
