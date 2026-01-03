import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BottomBar from "@/components/common/bottom-bar";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Hero from "@/pages/home/components/hero";
import AboutUs from "./components/about-us";
import Categories from "./components/categories";
import NewProducts from "./components/new-products";
import RecentProducts from "./components/recent-products";
import ValueProps from "./components/value-props";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const element = document.getElementById(id);
    if (!element) return;
    const timeout = window.setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="container px-3 max-w-7xl mx-auto">
        <Header />
      </div>
      <div className="mt-2">
        <Hero />
      </div>

      <div className="container pb-10 px-3 max-w-7xl mx-auto">
        <div className="mt-10 space-y-10">
          <div className="hidden sm:block">
            <ValueProps />
          </div>
          <Categories />
          <NewProducts />
          <RecentProducts />
          <div className="hidden sm:block">
            <AboutUs />
          </div>
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
