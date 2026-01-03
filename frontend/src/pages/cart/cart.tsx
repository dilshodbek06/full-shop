import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import BottomBar from "@/components/common/bottom-bar";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { cartTotals, useCart } from "@/store/use-cart";

const formatPrice = (value: number) => `${value.toLocaleString("ru-RU")} so'm`;

const CartPage = () => {
  const items = useCart((s) => s.items);
  const setQuantity = useCart((s) => s.setQuantity);
  const clear = useCart((s) => s.clear);
  const { totalCount, totalPrice } = cartTotals(items);
  const hasItems = items.length > 0;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-3">
        <div className="hidden lg:block">
          <Header />
        </div>

        <main
          className={`pt-4 ${hasItems ? "pb-36 md:pb-24 lg:pb-20" : "pb-20"}`}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold">Savat</h1>
            </div>
            <button
              type="button"
              onClick={() => clear()}
              disabled={!hasItems}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-rose-100 hover:bg-rose-50 hover:text-rose-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400"
            >
              <Trash2 className="h-4 w-4" />
              Tozalash
            </button>
          </div>

          {hasItems ? (
            <div className="mt-4 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-6">
              <div className="divide-y divide-slate-200 overflow-hidden">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 py-4 sm:gap-4"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold leading-snug text-slate-900 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                        {item.subtitle}
                      </p>
                      <p className="mt-2 text-sm font-bold text-slate-900">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-slate-200 active:scale-[0.97]"
                        aria-label="Decrease"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-slate-200 active:scale-[0.97]"
                        aria-label="Increase"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Umumiy
                      </p>
                      <p className="mt-1 text-2xl font-bold text-slate-900">
                        {formatPrice(totalPrice)}
                      </p>
                      <p className="text-sm text-slate-500">
                        {totalCount} mahsulotlar
                      </p>
                    </div>
                    <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Yetkazib berish tez
                    </div>
                  </div>
                  <button className="mt-6 w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 active:scale-[0.98]">
                    Rasmiylashtirish
                  </button>
                </div>
              </aside>
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Savat bo'sh
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Yoqtirgan mahsulotlaringizni tanlang va savatga qo'shing, keyin bu yerda ko'rasiz.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 active:scale-[0.98]"
                >
                  Mahsulotlarni ko'rish
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-700 active:scale-[0.98]"
                >
                  Bosh sahifaga
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>

      {hasItems ? (
        <div className="fixed inset-x-0 bottom-16 z-40 border-t border-slate-200 bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.06)] md:bottom-0 lg:hidden">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-xl font-bold text-slate-900">
                {formatPrice(totalPrice)}
              </p>
              <p className="text-sm text-slate-500">{totalCount} mahsulotlar</p>
            </div>
            <button className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 active:scale-[0.98]">
              Rasmiylashtirish
            </button>
          </div>
        </div>
      ) : null}

      <div className="hidden sm:block">
        <Footer />
      </div>
      <BottomBar />
    </div>
  );
};

export default CartPage;
