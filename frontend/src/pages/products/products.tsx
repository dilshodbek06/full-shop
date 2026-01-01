import { ChevronDown, Search } from "lucide-react";
import Footer from "@/components/common/footer";
import BottomBar from "@/components/common/bottom-bar";
import ProductCard from "@/components/common/product-card";
import { allProducts } from "@/data/products";
import Header from "@/components/common/header";

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-3">
        <div className="hidden lg:block">
          <Header />
        </div>
        <main className="pt-4 pb-20">
          {/* Title */}
          <h2 className="mb-4 text-xl font-semibold">Barcha mahsulotlar</h2>

          {/* Search */}
          <div className="relative mb-5 flex items-center rounded-xl border border-slate-200 bg-white">
            <Search className="ml-3 h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Mahsulot qidirish..."
              className="h-12 w-full bg-transparent px-3 text-sm placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="mb-5 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold">
              Saralash
              <ChevronDown className="h-4 w-4 text-emerald-700" />
            </button>
            <button className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold">
              Narx
            </button>
          </div>

          {/* Products */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>

      <div className="hidden sm:block">
        <Footer />
      </div>
      <BottomBar />
    </div>
  );
};

export default ProductsPage;
