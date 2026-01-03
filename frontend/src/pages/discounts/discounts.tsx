import { Link, useNavigate } from "react-router-dom";
import BottomBar from "@/components/common/bottom-bar";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductCard from "@/components/common/product-card";
import { allProducts } from "@/data/products";
import { ArrowLeft } from "lucide-react";

const discountedProducts = allProducts.filter(
  (product) =>
    Boolean(product.oldPrice) || Boolean(product.badge?.includes("%"))
);

const DiscountsPage = () => {
  const hasDiscounts = discountedProducts.length > 0;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-3">
        <div className="hidden lg:block">
          <Header />
        </div>

        <main className="pt-4 pb-20">
          <div className="flex items-center gap-2">
            <div
              onClick={() => navigate(-1)}
              className="flex sm:hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100  hover:text-slate-700 active:scale-95"
            >
              <ArrowLeft className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-semibold text-slate-900">
              Chegirmadagi mahsulotlar
            </h1>
          </div>

          {!hasDiscounts ? (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Hozircha chegirmalar yo'q
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Yangiliklarni ko'rish uchun mahsulotlar bo'limiga o'ting.
              </p>
              <Link
                to="/products"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 active:scale-[0.98]"
              >
                Mahsulotlarga o'tish
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {discountedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      <div className="hidden sm:block">
        <Footer />
      </div>
      <BottomBar />
    </div>
  );
};

export default DiscountsPage;
