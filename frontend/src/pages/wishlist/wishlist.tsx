import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BottomBar from "@/components/common/bottom-bar";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductCard from "@/components/common/product-card";
import type { WishlistItem } from "@/data/wishlist";
import type { ProductItem } from "@/data/products";
import { useWishlist } from "@/store/use-wishlist";

const formatPrice = (value: number) => `${value.toLocaleString("ru-RU")} so'm`;

const WishlistPage = () => {
  const navigate = useNavigate();

  const items = useWishlist((s) => s.items);
  const clear = useWishlist((s) => s.clear);

  const hasItems = items.length > 0;

  const toProductCard = (item: WishlistItem): ProductItem => ({
    id: item.id,
    name: item.title,
    price: formatPrice(item.price),
    priceValue: item.price,
    pieces: item.note ? `${item.subtitle} · ${item.note}` : item.subtitle,
    badge: item.badge,
    category: "wishlist",
    stock:
      item.availability === "out"
        ? "out"
        : item.availability === "low"
        ? "low"
        : "in-stock",
    image: item.image,
    releasedAt: "2024-01-01",
  });

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-3">
        <div className="hidden lg:block pt-4">
          <Header />
        </div>

        <main className="pt-4 pb-20">
          <div className="flex items-center justify-between gap-4 ">
            {/* LEFT SIDE */}
            <div className="flex items-center gap-2">
              <div
                onClick={() => navigate(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 active:scale-95"
              >
                <ArrowLeft className="h-5 w-5" />
              </div>

              <div>
                <h1 className="text-xl font-semibold text-slate-900">
                  Saqlangan mahsulotlar
                </h1>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <button
              type="button"
              onClick={() => clear()}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm font-semibold hover:text-rose-600 transition hover:bg-rose-100 active:scale-95"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:block">Tozalash</span>
            </button>
          </div>

          {!hasItems ? (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Hali mahsulot qo'shilmadi
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Yoqtirgan mahsulotlaringizni saqlab qo'ying va bu yerda ko'ring.
              </p>
              <Link
                to="/products"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 active:scale-[0.98]"
              >
                Katalogga o'tish
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {items.map((item) => (
                <ProductCard key={item.id} product={toProductCard(item)} />
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

export default WishlistPage;
