import ProductCard from "@/components/common/product-card";
import { allProducts } from "@/data/products";
import { ArrowRight } from "lucide-react";

const recentProducts = allProducts.slice(5, 11);

const RecentProducts = () => {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Top products</h3>
        </div>
        <button className="flex bg-gray-100 px-3 py-2 cursor-pointer hover:bg-gray-200/80 rounded-lg items-center gap-2 text-sm font-semibold text-emerald-700">
          View all
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {recentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RecentProducts;
