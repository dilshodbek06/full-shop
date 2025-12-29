import BottomBar from "@/components/common/bottom-bar";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Hero from "@/pages/home/components/hero";
import Categories from "./components/categories";
import NewProducts from "./components/new-products";
import RecentProducts from "./components/recent-products";
import ValueProps from "./components/value-props";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="container px-3 max-w-7xl mx-auto">
        <Header />
      </div>
      <div className="mt-2">
        <Hero />
      </div>

      <div className="container pb-20 px-3 max-w-7xl mx-auto">
        <div className="mt-10 space-y-10">
          <div className="hidden sm:block">
            <ValueProps />
          </div>
          <Categories />
          <NewProducts />
          <RecentProducts />
        </div>
      </div>
      <div className="hidden sm:block">
        <Footer />
      </div>
      <BottomBar />
    </div>
  );
};

export default Home;
